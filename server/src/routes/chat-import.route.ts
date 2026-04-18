/**
 * POST /import/chat — Upload a chat export file and import into the system.
 *
 * Accepts: multipart/form-data with a single file field "file".
 * Optional form field "ownerName" — the user's display name in the chat,
 * used to determine inbound vs outbound direction.
 *
 * Requires: Bearer token (JWT auth).
 *
 * Returns: { signalsCreated, messagesCreated, platform, participants }
 */

import { Router } from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import { Signal }      from "../models/Signal.model";
import { ChatMessage } from "../models/ChatMessage.model";
import { parseFile }   from "../services/chat-parsers";
import { encryptText, isEncryptionEnabled } from "../services/encryption.service";
import { emitToUser }  from "../services/sse.service";
import { env }         from "../config/env";
import { log, logError } from "../utils/logger";

/** Strip HTML tags and limit string length to prevent stored XSS and oversized fields */
function sanitize(text: string, maxLen = 10_000): string {
  return text
    .replace(/<[^>]*>/g, "")   // strip HTML tags
    .replace(/javascript:/gi, "") // strip JS protocol
    .slice(0, maxLen);
}

const router: import("express").Router = Router();

// Accept files up to 25 MB, stored in memory (chat exports are text-based, small)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = [".txt", ".json", ".csv"];
    const ext = file.originalname.toLowerCase().slice(file.originalname.lastIndexOf("."));
    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error(`Unsupported file type: ${ext}. Allowed: ${allowed.join(", ")}`));
    }
  },
});

/** Extract userId from Bearer token */
function getUserId(authHeader?: string): string | null {
  if (!authHeader?.startsWith("Bearer ")) return null;
  try {
    const payload = jwt.verify(authHeader.slice(7), env.jwtSecret) as { userId?: string };
    return payload.userId ?? null;
  } catch {
    return null;
  }
}

router.post("/chat", upload.single("file"), async (req, res) => {
  try {
    // Auth check
    const userId = getUserId(req.headers.authorization);
    if (!userId) {
      return res.status(401).json({ error: "Authentication required" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const ownerName = (req.body.ownerName as string)?.trim() ?? "";
    const filename  = req.file.originalname;
    const content   = req.file.buffer.toString("utf-8");

    log(`📥 Chat import: ${filename} (${(req.file.size / 1024).toFixed(1)} KB) by user ${userId}`);

    // Parse the file
    let parsed;
    try {
      parsed = parseFile(filename, content);
    } catch (err) {
      return res.status(400).json({
        error: err instanceof Error ? err.message : "Failed to parse file",
      });
    }

    if (parsed.messages.length === 0) {
      return res.status(400).json({ error: "No messages found in the file" });
    }

    log(`   Parsed: ${parsed.messages.length} messages, ${parsed.participants.length} participants, platform=${parsed.platform}`);

    // Group messages by sender to create one Signal per conversation partner
    const bySender = new Map<string, typeof parsed.messages>();
    for (const msg of parsed.messages) {
      // If ownerName matches this sender, this is an outbound message
      if (ownerName && msg.sender.toLowerCase() === ownerName.toLowerCase()) {
        msg.direction = "outbound";
        continue; // Skip creating a signal for the owner
      }
      msg.direction = "inbound";

      const key = msg.sender;
      if (!bySender.has(key)) bySender.set(key, []);
      bySender.get(key)!.push(msg);
    }

    // If ownerName was provided, also collect outbound messages under their recipient's signal
    // For simplicity in a 1:1 chat, assign outbound messages to the single other participant
    const outboundMsgs = parsed.messages.filter((m) => m.direction === "outbound");
    if (outboundMsgs.length > 0 && bySender.size === 1) {
      const [senderKey] = bySender.keys();
      // These messages go under the same signal but as outbound
      for (const msg of outboundMsgs) {
        bySender.get(senderKey)!.push(msg);
      }
    }

    const encrypt = isEncryptionEnabled();
    let signalsCreated  = 0;
    let messagesCreated = 0;
    const importBatchId = uuidv4();

    for (const [senderName, msgs] of bySender) {
      // Sort messages by timestamp
      msgs.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

      const latestMsg = msgs[msgs.length - 1];
      const preview   = latestMsg.text.slice(0, 100);

      // Upsert Signal for this sender
      let signal = await Signal.findOne({
        agencyId: userId,
        sender:   senderName,
        platform: parsed.platform,
        source:   "import",
      });

      if (!signal) {
        signal = await Signal.create({
          agencyId:      userId,
          platform:      parsed.platform,
          source:        "import",
          sender:        senderName,
          senderName,
          preview,
          isOnDashboard: false,
          status:        "new",
          importedAt:    new Date(),
        });
        signalsCreated++;
        log(`   New signal: ${signal._id} from "${senderName}"`);
      } else {
        await Signal.findByIdAndUpdate(signal._id, { preview, status: "new" });
      }

      // Insert messages (deduplicated by externalId)
      for (const msg of msgs) {
        const importId = `import-${importBatchId}-${uuidv4()}`;

        let textToStore = msg.text;
        let encryptionFields: { encrypted?: boolean; iv?: string; encryptionKeyId?: string } = {};

        // Encrypt if master key is configured
        if (encrypt && msg.text) {
          const { ciphertext, iv, encryptionKeyId } = encryptText(msg.text, userId);
          textToStore      = ciphertext;
          encryptionFields = { encrypted: true, iv, encryptionKeyId };
        }

        try {
          await ChatMessage.create({
            agencyId:     userId,
            signalId:     signal._id,
            platform:     parsed.platform,
            direction:    msg.direction,
            senderName:   sanitize(msg.sender, 200),
            senderHandle: sanitize(msg.sender, 200),
            text:         encrypt ? textToStore : sanitize(textToStore), // encrypted text must not be sanitized
            messageType:  "text",
            externalId:   importId,
            timestamp:    msg.timestamp,
            ...encryptionFields,
          });
          messagesCreated++;
        } catch (err: unknown) {
          // Duplicate externalId — shouldn't happen with UUIDs, but just in case
          if (err instanceof Error && err.message.includes("duplicate key")) continue;
          throw err;
        }
      }

      // Emit SSE event for real-time dashboard update
      emitToUser(userId, "signal:message", {
        signalId:   signal._id.toString(),
        platform:   parsed.platform,
        senderName,
        sender:     senderName,
        text:       `Imported ${msgs.length} messages`,
        timestamp:  new Date().toISOString(),
        isNew:      true,
        isImport:   true,
      });
    }

    log(`   Done: ${signalsCreated} signals, ${messagesCreated} messages created (encrypted: ${encrypt})`);

    return res.json({
      success:         true,
      signalsCreated,
      messagesCreated,
      platform:        parsed.platform,
      participants:    parsed.participants,
      encrypted:       encrypt,
    });
  } catch (err) {
    logError("Chat import failed", err);
    return res.status(500).json({
      error: "Import failed — please try again or contact support",
    });
  }
});

export default router;
