"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Zap, ChevronRight, X, Clock } from "lucide-react";
import type { DashboardView } from "./DashboardShell";

const TRANSCRIPT = [
  { role: "client", text: "Merhaba, bir e-ticaret sitesi istiyorum." },
  { role: "agent",  text: "Hangi ürünleri satıyorsunuz?" },
  { role: "client", text: "Kadın giyim. Shopify üzerinden gitmek istiyoruz." },
  { role: "agent",  text: "Kaç ürün var yaklaşık olarak?" },
  { role: "client", text: "Şu an 80 ürün, ama büyüyecek." },
  { role: "agent",  text: "Tema tercihiniz var mı?" },
  { role: "client", text: "Minimalist, beyaz ağırlıklı bir şey olsun." },
  { role: "agent",  text: "Harika. Renk paleti ve logo var mı?" },
  { role: "client", text: "Evet, logo PNG olarak gönderebilirim." },
];

const CODE_LINES = [
  { text: "// Generating Shopify theme scaffold...", type: "comment" },
  { text: "theme.json → { name: 'butikmode', version: '1.0' }", type: "code" },
  { text: "sections/header.liquid → created", type: "code" },
  { text: "sections/hero-banner.liquid → created", type: "code" },
  { text: "sections/product-grid.liquid → created", type: "code" },
  { text: "snippets/product-card.liquid → created", type: "code" },
  { text: "assets/style.css → injecting brand tokens...", type: "code" },
  { text: "config/settings_schema.json → 42 fields mapped", type: "code" },
  { text: "layout/theme.liquid → SEO meta injected", type: "code" },
  { text: "// Running Shopify CLI validation...", type: "comment" },
  { text: "✓ Theme validated — 0 errors, 0 warnings", type: "success" },
  { text: "// Pushing to Shopify store...", type: "comment" },
  { text: "✓ Deployed → https://butikmode.myshopify.com/", type: "success" },
];

function AudioBars({ active }: { active: boolean }) {
  return (
    <div className="flex items-center gap-0.5 h-3.5">
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-0.5 rounded-full bg-white"
          animate={active ? {
            scaleY: [0.3, 1, 0.4, 0.9, 0.3],
            transition: { duration: 0.8 + i * 0.1, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 },
          } : { scaleY: 0.2 }}
          style={{ height: 14, originY: "center" }}
        />
      ))}
    </div>
  );
}

interface Props { setView: (v: DashboardView) => void; }

export function EngineRoom({ setView }: Props) {
  const [micOn, setMicOn] = useState(true);
  const [visibleLines, setVisibleLines] = useState(0);
  const [visibleTranscript, setVisibleTranscript] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const codeRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const iv = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    if (visibleTranscript >= TRANSCRIPT.length) return;
    const t = setTimeout(() => setVisibleTranscript((v) => v + 1), 950);
    return () => clearTimeout(t);
  }, [visibleTranscript]);

  useEffect(() => {
    if (visibleLines >= CODE_LINES.length) return;
    const t = setTimeout(() => setVisibleLines((v) => v + 1), 680);
    return () => clearTimeout(t);
  }, [visibleLines]);

  useEffect(() => { codeRef.current?.scrollTo({ top: 9999, behavior: "smooth" }); }, [visibleLines]);
  useEffect(() => { chatRef.current?.scrollTo({ top: 9999, behavior: "smooth" }); }, [visibleTranscript]);

  const done = visibleLines >= CODE_LINES.length;
  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");

  return (
    <div className="flex flex-col h-full bg-[#F5F5F5]">

      {/* Header */}
      <div className="flex items-center justify-between bg-white border-b border-[#EFEFEF] px-6 py-3">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-[15px] font-black">Engine Room</h2>
            <p className="text-[11px] text-[#B5B5B5]">AI intake in progress</p>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-red-50 border border-red-100 px-2.5 py-1 text-[10px] font-bold text-red-500 uppercase tracking-wide">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
            Live
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Timer */}
          <div className="flex items-center gap-1.5 rounded-lg bg-[#F5F5F5] border border-[#EFEFEF] px-3 py-1.5 text-[13px] font-mono font-bold text-[#0A0A0A]">
            <Clock size={12} className="text-[#B5B5B5]" />
            {mm}:{ss}
          </div>

          <button
            onClick={() => setMicOn((v) => !v)}
            className={[
              "flex items-center gap-2 rounded-xl px-3 py-1.5 text-[12px] font-bold transition-all",
              micOn ? "bg-[#F97316] text-white shadow-sm shadow-orange-200" : "bg-[#F5F5F5] border border-[#EFEFEF] text-[#737373]",
            ].join(" ")}
          >
            {micOn ? <Mic size={13} /> : <MicOff size={13} />}
            {micOn ? "Listening..." : "Muted"}
            {micOn && <AudioBars active={micOn} />}
          </button>

          <button
            onClick={() => setView("command")}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#EFEFEF] bg-white text-[#737373] hover:text-[#0A0A0A] transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Split pane */}
      <div className="flex flex-1 min-h-0 gap-4 p-4">

        {/* Left — Transcript */}
        <div className="flex w-1/2 flex-col rounded-2xl bg-white border border-[#EFEFEF] overflow-hidden">
          <div className="flex items-center gap-2 border-b border-[#EFEFEF] px-4 py-3">
            <span className="h-2 w-2 rounded-full bg-green-400" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#B5B5B5]">Live Transcript</span>
            <span className="ml-auto text-[10px] text-[#B5B5B5]">Ahmet Yılmaz</span>
          </div>

          <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            <AnimatePresence>
              {TRANSCRIPT.slice(0, visibleTranscript).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${line.role === "agent" ? "justify-end" : "justify-start"}`}
                >
                  <div className={[
                    "max-w-[80%] rounded-xl px-3.5 py-2.5 text-[13px] leading-relaxed",
                    line.role === "agent"
                      ? "bg-[#F97316] text-white rounded-br-sm"
                      : "bg-[#F5F5F5] text-[#0A0A0A] rounded-bl-sm",
                  ].join(" ")}>
                    {line.text}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {visibleTranscript < TRANSCRIPT.length && (
              <div className="flex gap-1 px-1">
                {[0, 1, 2].map((i) => (
                  <motion.span key={i} className="h-1.5 w-1.5 rounded-full bg-[#DEDEDE]"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right — Code stream */}
        <div className="flex w-1/2 flex-col rounded-2xl overflow-hidden border border-[#E0E0E0]">
          <div className="flex items-center gap-2 bg-[#0A0A0A] px-4 py-3">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
            </div>
            <Zap size={12} className="ml-2 text-[#F97316]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#737373]">AI Output</span>
          </div>

          <div ref={codeRef} className="flex-1 overflow-y-auto bg-[#0D0D0E] p-5 font-mono">
            <p className="mb-3 text-xs text-[#F97316]">yappaflow@engine:~$</p>
            <AnimatePresence>
              {CODE_LINES.slice(0, visibleLines).map((line, i) => (
                <motion.p key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className={[
                    "text-[12px] leading-5 mb-0.5",
                    line.type === "comment" ? "text-[#4A4A4A]" :
                    line.type === "success" ? "text-green-400" : "text-[#C9C9C9]",
                  ].join(" ")}
                >
                  {line.text}
                </motion.p>
              ))}
            </AnimatePresence>
            {!done && <span className="inline-block h-3 w-1.5 bg-[#F97316] animate-pulse" />}
          </div>

          {done && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#0A0A0A] border-t border-[#1A1A1A] p-4">
              <button
                onClick={() => setView("deploy")}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 py-2.5 text-[13px] font-bold text-white hover:bg-green-400 transition-colors"
              >
                Review & Deploy
                <ChevronRight size={15} />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
