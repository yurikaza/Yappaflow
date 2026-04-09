import express from "express";
import { env } from "../config/env";
import { handleWhatsAppWebhook, handleInstagramWebhook } from "../services/meta-webhook.service";
import { log } from "../utils/logger";

const router: express.Router = express.Router();

// ── Webhook verification (GET) ────────────────────────────────────────────────
// Meta calls this once when you register the webhook in the Developer Console.
router.get("/", (req, res): void => {
  const mode      = req.query["hub.mode"];
  const token     = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === env.metaWebhookVerifyToken) {
    log("Meta webhook verified");
    res.status(200).send(challenge);
  } else {
    res.status(403).send("Forbidden");
  }
});

// ── Incoming events (POST) ────────────────────────────────────────────────────
router.post("/", async (req, res): Promise<void> => {
  const body = req.body as { object?: string; entry?: unknown[] };

  try {
    if (body.object === "whatsapp_business_account") {
      await handleWhatsAppWebhook(body.entry ?? []);
    } else if (body.object === "instagram") {
      await handleInstagramWebhook(body.entry ?? []);
    }
    // Always return 200 quickly so Meta doesn't retry
    res.status(200).send("EVENT_RECEIVED");
  } catch (err) {
    log(`Webhook error: ${String(err)}`);
    res.status(200).send("EVENT_RECEIVED"); // still 200 to avoid Meta retries
  }
});

export default router;
