"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { MessageCircle, Code, Rocket, Settings, Zap, Check, Globe, ExternalLink } from "lucide-react";

const SIDEBAR_ITEMS = [
  { icon: Zap, label: "Command Center" },
  { icon: MessageCircle, label: "Signals" },
  { icon: Code, label: "Engine Room" },
  { icon: Rocket, label: "Deploy Hub" },
  { icon: Settings, label: "Integrations" },
];

const CHAT_MESSAGES = [
  { sender: "Client", text: "I need a modern e-commerce store for my fashion brand", time: "14:32" },
  { sender: "Client", text: "With Turkish lira payment, dark mode, and mobile first", time: "14:33" },
  { sender: "Client", text: "We want to launch by next Friday", time: "14:33" },
  { sender: "Yappaflow AI", text: "Analyzing requirements... 3 key deliverables identified", time: "14:33", ai: true },
  { sender: "Yappaflow AI", text: "Starting code generation for Shopify storefront", time: "14:34", ai: true },
];

const CODE_LINES = `import { Store } from '@yappaflow/core'
import { IyzicoPayment } from '@yappaflow/payments'
import { ThemeProvider } from './theme'

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <Store
        platform="shopify"
        locale={["tr", "en"]}
        currency="TRY"
      >
        <Header />
        <ProductGrid columns={3} />
        <CartSidebar />
        <IyzicoPayment
          provider="iyzico"
          methods={["card", "eft"]}
        />
        <Footer />
      </Store>
    </ThemeProvider>
  )
}`;

const DEPLOY_STEPS = [
  "Building production assets",
  "Configuring DNS records",
  "Provisioning SSL certificate",
  "Deploying to Shopify CDN",
  "Running health checks",
];

/* ─── Phase Components ─── */

function ListenPhase({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="p-4 sm:p-5 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
        <span className="text-[10px] text-white/30 uppercase tracking-wider">Live Signal — WhatsApp</span>
      </div>

      <div className="flex-1 space-y-3 overflow-hidden">
        {CHAT_MESSAGES.map((msg, i) => (
          <motion.div
            key={i}
            style={{ opacity: useTransform(progress, [i * 0.05, i * 0.05 + 0.06], [0, 1]) }}
            className={`flex ${msg.ai ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
              msg.ai
                ? "bg-brand-orange/10 rounded-br-sm"
                : "bg-white/[0.04] rounded-bl-sm"
            }`}>
              <p className="text-[10px] text-white/30 mb-0.5">{msg.sender} · {msg.time}</p>
              <p className={`text-xs leading-relaxed ${msg.ai ? "text-brand-orange" : "text-white/70"}`}>
                {msg.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function BuildPhase({ progress }: { progress: MotionValue<number> }) {
  const charCount = useTransform(progress, [0, 0.28], [0, CODE_LINES.length]);

  return (
    <div className="p-4 sm:p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Code className="h-3.5 w-3.5 text-brand-orange" />
          <span className="text-[10px] text-white/30 uppercase tracking-wider">Engine Room — Generating</span>
        </div>
        <span className="text-[10px] text-brand-orange">store.tsx</span>
      </div>

      <div className="flex-1 bg-[#0a0a0c] rounded-lg p-4 overflow-hidden font-mono text-[11px] leading-relaxed">
        <motion.span className="text-white/70 whitespace-pre-wrap break-all">
          {/* Render code character by character */}
          <CodeRenderer code={CODE_LINES} charCount={charCount} />
        </motion.span>
        <motion.span
          className="inline-block w-[2px] h-[14px] bg-brand-orange ml-0.5 align-middle"
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.6 }}
        />
      </div>
    </div>
  );
}

function CodeRenderer({ code, charCount }: { code: string; charCount: MotionValue<number> }) {
  // Use a motion component that reads the charCount value
  return (
    <motion.span>
      {code.split("").map((char, i) => (
        <motion.span
          key={i}
          style={{ opacity: useTransform(charCount, (v) => (i < v ? 1 : 0)) }}
          className={
            char === "'" || char === '"' ? "text-green-400" :
            ["import", "from", "export", "default", "function", "return", "const"].some(kw => {
              const start = code.lastIndexOf(" ", i) + 1;
              const word = code.slice(start, code.indexOf(" ", i + 1) === -1 ? i + 1 : code.indexOf(" ", i + 1));
              return word === kw && i >= start && i < start + kw.length;
            }) ? "text-purple-400" : ""
          }
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

function ShipPhase({ progress }: { progress: MotionValue<number> }) {
  const barWidth = useTransform(progress, [0, 0.25], [0, 100]);

  return (
    <div className="p-4 sm:p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Rocket className="h-3.5 w-3.5 text-brand-orange" />
          <span className="text-[10px] text-white/30 uppercase tracking-wider">Deploy Hub — Shopify</span>
        </div>
        <motion.div
          style={{ opacity: useTransform(progress, [0.28, 0.33], [0, 1]) }}
          className="flex items-center gap-1.5"
        >
          <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] text-green-400 font-medium uppercase tracking-wider">Live</span>
        </motion.div>
      </div>

      {/* Progress bar */}
      <div className="mb-5">
        <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
          <motion.div
            style={{ width: useTransform(barWidth, (v) => `${v}%`) }}
            className="h-full bg-brand-orange rounded-full transition-none"
          />
        </div>
      </div>

      {/* Deploy steps */}
      <div className="space-y-3 flex-1">
        {DEPLOY_STEPS.map((step, i) => (
          <motion.div
            key={step}
            style={{ opacity: useTransform(progress, [i * 0.05, i * 0.05 + 0.04], [0, 1]) }}
            className="flex items-center gap-3"
          >
            <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
              <Check className="h-2.5 w-2.5 text-green-400" />
            </div>
            <span className="text-xs text-white/50">{step}</span>
          </motion.div>
        ))}
      </div>

      {/* Live URL */}
      <motion.div
        style={{ opacity: useTransform(progress, [0.28, 0.33], [0, 1]) }}
        className="mt-4 p-3 rounded-lg border border-green-500/10 bg-green-500/[0.03] flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <Globe className="h-3.5 w-3.5 text-green-400" />
          <span className="text-xs text-white/70">butikmode.com</span>
        </div>
        <ExternalLink className="h-3 w-3 text-white/20" />
      </motion.div>
    </div>
  );
}

/* ─── Main Component ─── */

export function DashboardStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Phase progress (each phase gets 0.33 of total)
  const p1 = useTransform(scrollYProgress, [0, 0.33], [0, 1]);
  const p2 = useTransform(scrollYProgress, [0.33, 0.66], [0, 1]);
  const p3 = useTransform(scrollYProgress, [0.66, 1], [0, 1]);

  // Phase opacities for crossfade
  const o1 = useTransform(scrollYProgress, [0, 0.05, 0.28, 0.35], [0, 1, 1, 0]);
  const o2 = useTransform(scrollYProgress, [0.30, 0.38, 0.60, 0.68], [0, 1, 1, 0]);
  const o3 = useTransform(scrollYProgress, [0.62, 0.70, 0.95, 1], [0, 1, 1, 1]);

  // Active sidebar index
  const activeIndex = useTransform(scrollYProgress, [0, 0.33, 0.66], [1, 2, 3]);

  return (
    <div ref={containerRef} className="relative bg-brand-dark" style={{ height: "400vh" }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden px-4">
        {/* Phase indicator */}
        <div className="absolute top-6 left-6 sm:left-10 z-20">
          <motion.p
            className="font-heading text-lg uppercase tracking-tight text-white/60"
          >
            <motion.span style={{ opacity: o1 }} className="absolute">01 Listen</motion.span>
            <motion.span style={{ opacity: o2 }} className="absolute">02 Build</motion.span>
            <motion.span style={{ opacity: o3 }} className="absolute">03 Ship</motion.span>
          </motion.p>
          <div className="mt-2 w-16 h-0.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
              className="h-full bg-brand-orange"
            />
          </div>
        </div>

        {/* Dashboard */}
        <div className="w-full max-w-6xl">
          <div className="bg-[#0c0c0f] border border-white/[0.06] rounded-xl overflow-hidden shadow-2xl shadow-black/80">
            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.05] bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                </div>
              </div>
              <span className="text-[10px] text-white/15 font-heading uppercase tracking-wider">Yappaflow</span>
            </div>

            <div className="flex min-h-[420px] sm:min-h-[500px]">
              {/* Sidebar — persistent, active item changes */}
              <div className="w-48 border-r border-white/[0.05] p-3 hidden sm:block">
                <div className="space-y-0.5">
                  {SIDEBAR_ITEMS.map((item, i) => (
                    <motion.div
                      key={item.label}
                      style={{
                        backgroundColor: useTransform(activeIndex, (v) =>
                          Math.round(v) === i ? "rgba(255,107,53,0.1)" : "transparent"
                        ),
                        color: useTransform(activeIndex, (v) =>
                          Math.round(v) === i ? "#FF6B35" : "rgba(255,255,255,0.3)"
                        ),
                      }}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-colors"
                    >
                      <item.icon className="h-3.5 w-3.5" />
                      <span>{item.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Content area — phases crossfade */}
              <div className="flex-1 relative">
                <motion.div style={{ opacity: o1 }} className="absolute inset-0">
                  <ListenPhase progress={p1} />
                </motion.div>
                <motion.div style={{ opacity: o2 }} className="absolute inset-0">
                  <BuildPhase progress={p2} />
                </motion.div>
                <motion.div style={{ opacity: o3 }} className="absolute inset-0">
                  <ShipPhase progress={p3} />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
