/**
 * AES-256-GCM encryption at rest for chat messages.
 *
 * Key derivation: HKDF from a master secret + per-user salt.
 * Each message gets a unique random IV (96 bits for GCM).
 *
 * The master key is stored in the ENCRYPTION_MASTER_KEY env var.
 * Per-user keys are derived via HKDF(masterKey, userId) so that
 * rotating the master key only requires re-encrypting, not re-keying per user.
 */

import crypto from "crypto";
import { env } from "../config/env";

const ALGORITHM   = "aes-256-gcm";
const IV_LENGTH   = 12;   // 96 bits — recommended for GCM
const TAG_LENGTH  = 16;   // 128-bit auth tag
const KEY_VERSION = "v1"; // bump when rotating master key

/**
 * Derive a per-user 256-bit key from the master secret.
 */
function deriveKey(userId: string): Buffer {
  const masterKey = env.encryptionMasterKey;
  if (!masterKey) {
    throw new Error("ENCRYPTION_MASTER_KEY is not set — cannot encrypt messages");
  }

  return Buffer.from(crypto.hkdfSync(
    "sha256",
    Buffer.from(masterKey, "hex"),
    Buffer.from(userId, "utf8"),       // salt = userId
    Buffer.from("yappaflow-chat-v1"),   // info string
    32                                  // 256 bits
  ));
}

export interface EncryptedPayload {
  ciphertext:     string;  // hex-encoded
  iv:             string;  // hex-encoded
  encryptionKeyId: string;
}

/**
 * Encrypt a plaintext string for a given user.
 */
export function encryptText(plaintext: string, userId: string): EncryptedPayload {
  const key = deriveKey(userId);
  const iv  = crypto.randomBytes(IV_LENGTH);

  const cipher = crypto.createCipheriv(ALGORITHM, key, iv, { authTagLength: TAG_LENGTH });
  const encrypted = Buffer.concat([
    cipher.update(plaintext, "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();

  // Store ciphertext + tag together (tag appended)
  const combined = Buffer.concat([encrypted, tag]);

  return {
    ciphertext:      combined.toString("hex"),
    iv:              iv.toString("hex"),
    encryptionKeyId: KEY_VERSION,
  };
}

/**
 * Decrypt a ciphertext back to plaintext.
 */
export function decryptText(
  ciphertextHex: string,
  ivHex: string,
  userId: string
): string {
  const key = deriveKey(userId);
  const iv  = Buffer.from(ivHex, "hex");
  const combined = Buffer.from(ciphertextHex, "hex");

  // Split ciphertext and auth tag
  const ciphertext = combined.subarray(0, combined.length - TAG_LENGTH);
  const tag        = combined.subarray(combined.length - TAG_LENGTH);

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv, { authTagLength: TAG_LENGTH });
  decipher.setAuthTag(tag);

  return decipher.update(ciphertext, undefined, "utf8") + decipher.final("utf8");
}

/**
 * Check whether encryption is available (master key is configured).
 */
export function isEncryptionEnabled(): boolean {
  return !!env.encryptionMasterKey;
}

// ── Access token helpers (for PlatformConnection) ─────────────────────────────

/** Encrypt an access token before storing. Falls back to plaintext if no master key. */
export function encryptAccessToken(
  token: string,
  userId: string
): { accessToken: string; accessTokenIv?: string; accessTokenKeyId?: string } {
  if (!isEncryptionEnabled()) {
    return { accessToken: token };
  }
  const { ciphertext, iv, encryptionKeyId } = encryptText(token, userId);
  return { accessToken: ciphertext, accessTokenIv: iv, accessTokenKeyId: encryptionKeyId };
}

/** Decrypt an access token read from DB. Handles both encrypted and legacy plaintext. */
export function decryptAccessToken(conn: {
  accessToken: string;
  accessTokenIv?: string;
  accessTokenKeyId?: string;
  userId: { toString(): string };
}): string {
  // If no IV, it's stored as plaintext (legacy or encryption disabled)
  if (!conn.accessTokenIv) return conn.accessToken;
  if (!isEncryptionEnabled()) return conn.accessToken; // can't decrypt without key
  return decryptText(conn.accessToken, conn.accessTokenIv, conn.userId.toString());
}
