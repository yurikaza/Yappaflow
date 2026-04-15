"use client";

import { useEffect, useRef, useCallback } from "react";

// SSE must connect directly to the API server (not via Next.js rewrite proxy)
// because Netlify/Vercel serverless functions have timeouts that kill long-lived connections.
let _apiBase: string | null = null;
function getApiBase(): string {
  if (_apiBase !== null) return _apiBase;
  const direct = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  _apiBase = direct;
  return _apiBase;
}

export interface RealtimeSignalEvent {
  signalId:   string;
  platform:   "whatsapp" | "instagram";
  senderName: string;
  sender:     string;
  text:       string;
  timestamp:  string;
  isNew:      boolean;
}

interface Options {
  onMessage: (event: RealtimeSignalEvent) => void;
  onConnected?: () => void;
}

export function useRealtimeSignals({ onMessage, onConnected }: Options) {
  const esRef     = useRef<EventSource | null>(null);
  const retryRef  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mounted   = useRef(true);

  const connect = useCallback(() => {
    const token = localStorage.getItem("yappaflow_token");
    if (!token) return;

    const es = new EventSource(`${getApiBase()}/events?token=${encodeURIComponent(token)}`);
    esRef.current = es;

    es.addEventListener("connected", () => {
      onConnected?.();
    });

    es.addEventListener("signal:message", (e) => {
      try {
        const data = JSON.parse(e.data) as RealtimeSignalEvent;
        onMessage(data);
      } catch { /* malformed */ }
    });

    es.onerror = () => {
      es.close();
      if (!mounted.current) return;
      // Reconnect after 5 s
      retryRef.current = setTimeout(connect, 5_000);
    };
  }, [onMessage, onConnected]);

  useEffect(() => {
    mounted.current = true;
    connect();
    return () => {
      mounted.current = false;
      esRef.current?.close();
      if (retryRef.current) clearTimeout(retryRef.current);
    };
  }, [connect]);
}
