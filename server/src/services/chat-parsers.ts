/**
 * Chat file parsers for importing exported conversations from various platforms.
 *
 * Supported formats:
 *  - WhatsApp: .txt export (Android/iOS variants)
 *  - Instagram: JSON export (from "Download Your Information")
 *  - Telegram: JSON export (from Desktop "Export Chat History")
 *  - CSV: generic fallback (columns: timestamp, sender, message)
 */

export interface ParsedMessage {
  timestamp:    Date;
  sender:       string;     // display name or phone
  text:         string;
  direction:    "inbound" | "outbound";  // resolved later based on owner identity
  rawDirection: "unknown";               // parsers can't know who "you" are — resolved at import time
}

export interface ParsedChat {
  platform:  "whatsapp" | "instagram" | "telegram" | "csv" | "other";
  chatTitle: string;        // group/contact name extracted from file
  participants: string[];   // unique sender names found
  messages:  ParsedMessage[];
}

// ── WhatsApp .txt ─────────────────────────────────────────────────────────────

/**
 * WhatsApp export format (varies by OS/locale):
 *   [1/15/24, 2:30:45 PM] John Doe: Hello there
 *   1/15/24, 2:30:45 PM - John Doe: Hello there
 *   15/01/2024, 14:30:45 - John Doe: Hello there
 *   [15.01.2024, 14:30:45] John Doe: Hello there
 *   15.04.2024 14:30 - John Doe: Merhaba         (Turkish Android, no comma)
 *
 * iOS exports embed invisible bidi / narrow-space characters (U+200E, U+202F)
 * around timestamps — `normalizeWhatsAppContent()` strips them first.
 *
 * Multi-line messages: continuation lines don't start with a date pattern.
 */

// Matches various WhatsApp date formats at line start.
// Date and time may be separated by optional comma + any whitespace.
const WA_LINE_RE =
  /^\[?(\d{1,4}[\/.\-]\d{1,2}[\/.\-]\d{2,4},?\s+\d{1,2}[:.]\d{2}(?:[:.]\d{2})?\s*(?:AM|PM|am|pm)?)\]?\s*[-–—:]?\s*(.+?):\s([\s\S]*)/;

// System messages (encryption notices, group changes, etc.)
const WA_SYSTEM_RE =
  /^\[?(\d{1,4}[\/.\-]\d{1,2}[\/.\-]\d{2,4},?\s+\d{1,2}[:.]\d{2}(?:[:.]\d{2})?\s*(?:AM|PM|am|pm)?)\]?\s*[-–—:]?\s*(.+)/;

/**
 * WhatsApp exports (especially iOS) contain invisible Unicode characters
 * that break naive regex matching:
 *   - U+FEFF  BOM at file start
 *   - U+200E  Left-to-Right Mark (LRM)
 *   - U+200F  Right-to-Left Mark (RLM)
 *   - U+202A-U+202E  LRE/RLE/PDF/LRO/RLO
 *   - U+2066-U+2069  LRI/RLI/FSI/PDI (isolates)
 *   - U+00A0  Non-breaking space (used between time and sender)
 *   - U+202F  Narrow no-break space (French/iOS, used before AM/PM)
 */
function normalizeWhatsAppContent(content: string): string {
  return content
    .replace(/^\uFEFF/, "")                                       // strip BOM
    .replace(/[\u200E\u200F\u202A-\u202E\u2066-\u2069]/g, "")    // strip bidi controls
    .replace(/[\u00A0\u202F]/g, " ");                            // normalize non-breaking spaces
}

export function parseWhatsApp(content: string): ParsedChat {
  content = normalizeWhatsAppContent(content);
  const lines = content.split(/\r?\n/);
  const messages: ParsedMessage[] = [];
  const participants = new Set<string>();
  let current: ParsedMessage | null = null;

  for (const line of lines) {
    const match = WA_LINE_RE.exec(line);
    if (match) {
      // Save previous message
      if (current) messages.push(current);

      const dateStr = match[1];
      const sender  = match[2].trim();
      const text    = match[3].trim();

      participants.add(sender);
      current = {
        timestamp:    parseFlexDate(dateStr),
        sender,
        text,
        direction:    "inbound",
        rawDirection: "unknown",
      };
    } else if (current) {
      // Continuation of multi-line message
      current.text += `\n${line}`;
    }
    // else: preamble or empty line before first message — skip
  }
  if (current) messages.push(current);

  return {
    platform:     "whatsapp",
    chatTitle:    participants.size <= 2 ? [...participants].join(" & ") : "Group Chat",
    participants: [...participants],
    messages,
  };
}

// ── Instagram JSON ────────────────────────────────────────────────────────────

/**
 * Instagram "Download Your Information" JSON structure:
 * {
 *   "participants": [{ "name": "..." }],
 *   "messages": [
 *     { "sender_name": "...", "timestamp_ms": 1234567890000, "content": "..." },
 *     ...
 *   ]
 * }
 */
interface IGExportMessage {
  sender_name:  string;
  timestamp_ms: number;
  content?:     string;
  photos?:      unknown[];
  videos?:      unknown[];
  share?:       unknown;
}

interface IGExport {
  participants: Array<{ name: string }>;
  messages:     IGExportMessage[];
  title?:       string;
}

export function parseInstagramJSON(content: string): ParsedChat {
  const data: IGExport = JSON.parse(content);
  const participants = (data.participants ?? []).map((p) => decodeIGName(p.name));
  const messages: ParsedMessage[] = (data.messages ?? [])
    .sort((a, b) => a.timestamp_ms - b.timestamp_ms)
    .map((m) => ({
      timestamp:    new Date(m.timestamp_ms),
      sender:       decodeIGName(m.sender_name),
      text:         m.content
        ? decodeIGName(m.content)
        : m.photos ? "[photo]"
        : m.videos ? "[video]"
        : m.share  ? "[shared post]"
        : "[media]",
      direction:    "inbound" as const,
      rawDirection: "unknown" as const,
    }));

  return {
    platform:     "instagram",
    chatTitle:    data.title ? decodeIGName(data.title) : participants.join(" & "),
    participants,
    messages,
  };
}

/** Instagram exports encode non-ASCII as escaped UTF-8 byte sequences like \u00c3\u00a9 */
function decodeIGName(raw: string): string {
  try {
    // Convert \u00xx escape sequences back to bytes, then decode as UTF-8
    const bytes = raw.replace(/\\u00([0-9a-fA-F]{2})/g, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16))
    );
    return new TextDecoder("utf-8").decode(
      new Uint8Array([...bytes].map((c) => c.charCodeAt(0)))
    );
  } catch {
    return raw;
  }
}

// ── Telegram JSON ─────────────────────────────────────────────────────────────

/**
 * Telegram Desktop "Export chat history" → JSON:
 * {
 *   "name": "Chat Name",
 *   "messages": [
 *     { "id": 123, "type": "message", "date": "2024-01-15T14:30:45",
 *       "from": "John Doe", "text": "Hello" },
 *     ...
 *   ]
 * }
 *
 * `text` can be a string or array of mixed text/entities.
 */
interface TGMessage {
  id:        number;
  type:      string;
  date:      string;
  from?:     string;
  from_id?:  string;
  text:      string | Array<string | { type: string; text: string }>;
  photo?:    string;
  file?:     string;
  media_type?: string;
}

interface TGExport {
  name:     string;
  type:     string;
  id:       number;
  messages: TGMessage[];
}

export function parseTelegramJSON(content: string): ParsedChat {
  const data: TGExport = JSON.parse(content);
  const participants = new Set<string>();

  const messages: ParsedMessage[] = data.messages
    .filter((m) => m.type === "message" && m.from)
    .map((m) => {
      const sender = m.from ?? "Unknown";
      participants.add(sender);

      let text: string;
      if (typeof m.text === "string") {
        text = m.text;
      } else if (Array.isArray(m.text)) {
        text = m.text
          .map((part) => (typeof part === "string" ? part : part.text ?? ""))
          .join("");
      } else {
        text = "[message]";
      }

      if (!text && m.photo) text = "[photo]";
      if (!text && m.file)  text = `[file: ${m.file}]`;
      if (!text && m.media_type) text = `[${m.media_type}]`;
      if (!text) text = "[message]";

      return {
        timestamp:    new Date(m.date),
        sender,
        text,
        direction:    "inbound" as const,
        rawDirection: "unknown" as const,
      };
    });

  return {
    platform:     "telegram",
    chatTitle:    data.name ?? "Telegram Chat",
    participants: [...participants],
    messages,
  };
}

// ── CSV ───────────────────────────────────────────────────────────────────────

/**
 * Generic CSV format. Expected columns (case-insensitive):
 *   timestamp (or date/time), sender (or from/name), message (or text/content)
 *
 * Auto-detects delimiter (comma, semicolon, tab).
 */
export function parseCSV(content: string): ParsedChat {
  const lines = content.split(/\r?\n/).filter((l) => l.trim());
  if (lines.length < 2) {
    return { platform: "csv", chatTitle: "Import", participants: [], messages: [] };
  }

  // Detect delimiter
  const delim = detectDelimiter(lines[0]);
  const headers = parseCSVLine(lines[0], delim).map((h) => h.toLowerCase().trim());

  // Find column indices
  const tsIdx   = headers.findIndex((h) => /^(timestamp|date|time|datetime|date.?time)$/i.test(h));
  const nameIdx = headers.findIndex((h) => /^(sender|from|name|author|user)$/i.test(h));
  const msgIdx  = headers.findIndex((h) => /^(message|text|content|body|msg)$/i.test(h));

  if (tsIdx === -1 || nameIdx === -1 || msgIdx === -1) {
    throw new Error(
      `CSV must have columns: timestamp/date, sender/from, message/text. Found: ${headers.join(", ")}`
    );
  }

  const participants = new Set<string>();
  const messages: ParsedMessage[] = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = parseCSVLine(lines[i], delim);
    if (cols.length <= Math.max(tsIdx, nameIdx, msgIdx)) continue;

    const sender = cols[nameIdx].trim();
    if (!sender) continue;
    participants.add(sender);

    messages.push({
      timestamp:    new Date(cols[tsIdx].trim()),
      sender,
      text:         cols[msgIdx].trim(),
      direction:    "inbound",
      rawDirection: "unknown",
    });
  }

  return {
    platform:     "csv",
    chatTitle:    "CSV Import",
    participants: [...participants],
    messages,
  };
}

// ── Auto-detect which parser to use ───────────────────────────────────────────

export function detectPlatform(
  filename: string,
  content: string
): "whatsapp" | "instagram" | "telegram" | "csv" | "other" {
  const lower = filename.toLowerCase();

  // File extension hints
  if (lower.endsWith(".csv")) return "csv";

  // JSON files — peek at structure
  if (lower.endsWith(".json")) {
    try {
      const data = JSON.parse(content);
      if (data.participants && data.messages && data.messages[0]?.timestamp_ms !== undefined) {
        return "instagram";
      }
      if (data.messages && (data.messages[0]?.from_id !== undefined || (data.name && data.type && data.messages[0]?.from))) {
        return "telegram";
      }
    } catch { /* not valid JSON */ }
    return "other";
  }

  // WhatsApp .txt export — scan first N lines (normalized) for a date pattern
  if (lower.endsWith(".txt")) {
    const normalized = normalizeWhatsAppContent(content);
    const firstLines = normalized.split(/\r?\n/, 30);
    for (const line of firstLines) {
      if (!line.trim()) continue;
      if (WA_LINE_RE.test(line) || WA_SYSTEM_RE.test(line)) {
        return "whatsapp";
      }
    }
  }

  return "other";
}

export function parseFile(filename: string, content: string): ParsedChat {
  const platform = detectPlatform(filename, content);

  switch (platform) {
    case "whatsapp":  return parseWhatsApp(content);
    case "instagram": return parseInstagramJSON(content);
    case "telegram":  return parseTelegramJSON(content);
    case "csv":       return parseCSV(content);
    default: {
      // Try WhatsApp format as fallback for unknown .txt (parser will normalize)
      if (filename.toLowerCase().endsWith(".txt")) {
        const result = parseWhatsApp(content);
        if (result.messages.length > 0) return result;
      }

      // Build a diagnostic peek at the file so failures are debuggable.
      // First non-empty line with any bidi/BOM chars made visible.
      const peekLine = content
        .split(/\r?\n/)
        .find((l) => l.trim())
        ?.slice(0, 120) ?? "";
      const hex = peekLine
        .slice(0, 40)
        .split("")
        .map((c) => {
          const code = c.charCodeAt(0);
          return code < 32 || code > 126 ? `\\u${code.toString(16).padStart(4, "0")}` : c;
        })
        .join("");
      console.warn(`[chat-parsers] parseFile: unable to detect format for "${filename}". First line: ${JSON.stringify(peekLine)} (escaped: ${hex})`);

      throw new Error(
        `Unsupported file format. We couldn't detect a WhatsApp, Instagram, Telegram, or CSV pattern in "${filename}". ` +
        `Make sure you exported "Without Media" from WhatsApp, or check the format matches one of the supported types.`
      );
    }
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Parse flexible date strings from WhatsApp exports */
function parseFlexDate(raw: string): Date {
  // Normalize separators
  let normalized = raw
    .replace(/\./g, "/")       // dots → slashes
    .replace(/,/g, "")         // remove commas
    .replace(/\s+/g, " ")     // normalize whitespace
    .trim();

  // Try native parser first
  const d = new Date(normalized);
  if (!isNaN(d.getTime())) return d;

  // Manual parse: extract date and time parts
  const parts = normalized.split(/\s+/);
  if (parts.length >= 2) {
    const dateParts = parts[0].split("/");
    const timeParts = parts.slice(1).join(" ");

    if (dateParts.length === 3) {
      let [a, b, c] = dateParts.map(Number);
      // Heuristic: if first number > 12, it's DD/MM/YYYY
      // If third number < 100, add 2000
      if (c < 100) c += 2000;
      const month = a > 12 ? b : a;
      const day   = a > 12 ? a : b;

      const dateStr = `${c}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")} ${timeParts}`;
      const parsed = new Date(dateStr);
      if (!isNaN(parsed.getTime())) return parsed;
    }
  }

  // Last resort: log warning and return current time so import doesn't abort
  console.warn(`[chat-parsers] parseFlexDate: unable to parse date "${raw}" — using current time as fallback`);
  return new Date();
}

function detectDelimiter(headerLine: string): string {
  const counts: Record<string, number> = { ",": 0, ";": 0, "\t": 0 };
  for (const ch of headerLine) {
    if (ch in counts) counts[ch]++;
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

/** Simple CSV line parser that handles quoted fields */
function parseCSVLine(line: string, delim: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === delim && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}
