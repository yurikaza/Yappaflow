import express from "express";
import { verifyToken } from "../services/jwt.service";
import { addSSEClient } from "../services/sse.service";

const router: express.Router = express.Router();

/**
 * GET /events
 * Server-Sent Events stream for real-time dashboard updates.
 * Auth: Bearer token via Authorization header OR ?token= query param.
 */
router.get("/", (req, res): void => {
  // Accept token from header or query (SSE can't set headers from browser EventSource)
  const authHeader = req.headers.authorization;
  const queryToken = req.query.token as string | undefined;
  const raw = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : queryToken;

  if (!raw) { res.status(401).json({ error: "Unauthorized" }); return; }

  let userId: string;
  try {
    userId = verifyToken(raw).userId;
  } catch {
    res.status(401).json({ error: "Invalid token" }); return;
  }

  // SSE headers
  res.setHeader("Content-Type",  "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection",    "keep-alive");
  res.setHeader("X-Accel-Buffering", "no"); // disable nginx buffering
  res.flushHeaders();

  // Send a heartbeat every 25 s to keep the connection alive
  const heartbeat = setInterval(() => {
    try { res.write(`: heartbeat\n\n`); }
    catch { /* disconnected */ }
  }, 25_000);

  // Initial connected event
  res.write(`event: connected\ndata: ${JSON.stringify({ userId })}\n\n`);

  const cleanup = addSSEClient(userId, res);

  req.on("close", () => {
    clearInterval(heartbeat);
    cleanup();
  });
});

export default router;
