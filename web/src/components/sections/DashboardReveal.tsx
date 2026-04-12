"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MessageCircle, Code, Rocket, Settings, BarChart3, Zap } from "lucide-react";

const SIDEBAR_ITEMS = [
  { icon: Zap, label: "Command Center", active: true },
  { icon: MessageCircle, label: "Signals" },
  { icon: Code, label: "Engine Room" },
  { icon: Rocket, label: "Deploy Hub" },
  { icon: Settings, label: "Integrations" },
];

const SIGNALS = [
  { name: "Moda Butik", platform: "WhatsApp", time: "2m ago", status: "new" },
  { name: "Restaurant Proj", platform: "Instagram", time: "15m ago", status: "processing" },
  { name: "SaaS Dashboard", platform: "Email", time: "1h ago", status: "ready" },
  { name: "E-Commerce Store", platform: "WhatsApp", time: "3h ago", status: "deployed" },
];

export function DashboardReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.3, 1], [0.45, 0.65, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 0.6, 1], [14, 5, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [350, 120, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.4], [0, 0.6, 1]);

  return (
    <div ref={containerRef} className="relative bg-brand-dark" style={{ height: "200vh" }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden px-4">
        <div className="perspective-1200 w-full max-w-6xl">
          <motion.div
            style={{ scale, rotateX, y, opacity, transformStyle: "preserve-3d" }}
            className="w-full"
          >
            {/* Dashboard chrome */}
            <div className="bg-[#0c0c0f] border border-white/[0.06] rounded-xl overflow-hidden shadow-2xl shadow-black/80">
              {/* Title bar */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.05] bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  </div>
                  <span className="text-[10px] text-white/20 font-mono">app.yappaflow.com</span>
                </div>
                <span className="text-[10px] text-white/15 font-heading uppercase tracking-wider">Yappaflow</span>
              </div>

              <div className="flex min-h-[420px] sm:min-h-[500px]">
                {/* Sidebar */}
                <div className="w-48 border-r border-white/[0.05] p-3 hidden sm:block">
                  <div className="space-y-0.5">
                    {SIDEBAR_ITEMS.map((item) => (
                      <div
                        key={item.label}
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-colors ${
                          item.active
                            ? "bg-brand-orange/10 text-brand-orange"
                            : "text-white/30 hover:text-white/50"
                        }`}
                      >
                        <item.icon className="h-3.5 w-3.5" />
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/[0.05]">
                    <div className="flex items-center gap-2 px-3">
                      <div className="w-6 h-6 rounded-full bg-brand-orange/20 flex items-center justify-center">
                        <span className="text-[9px] text-brand-orange font-bold">Y</span>
                      </div>
                      <div>
                        <p className="text-[10px] text-white/60">Agency Pro</p>
                        <p className="text-[9px] text-white/20">3 active projects</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main content area */}
                <div className="flex-1 p-4 sm:p-5">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h3 className="text-sm font-medium text-white">Command Center</h3>
                      <p className="text-[10px] text-white/25 mt-0.5">4 active signals</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[10px] text-white/30">Live</span>
                    </div>
                  </div>

                  {/* Signals list */}
                  <div className="space-y-2">
                    {SIGNALS.map((signal, i) => (
                      <div
                        key={signal.name}
                        className="flex items-center justify-between p-3 rounded-lg border border-white/[0.04] hover:border-white/[0.08] transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            signal.status === "new" ? "bg-brand-orange/10" :
                            signal.status === "processing" ? "bg-blue-500/10" :
                            signal.status === "ready" ? "bg-purple-500/10" : "bg-green-500/10"
                          }`}>
                            <MessageCircle className={`h-3.5 w-3.5 ${
                              signal.status === "new" ? "text-brand-orange" :
                              signal.status === "processing" ? "text-blue-400" :
                              signal.status === "ready" ? "text-purple-400" : "text-green-400"
                            }`} />
                          </div>
                          <div>
                            <p className="text-xs text-white font-medium">{signal.name}</p>
                            <p className="text-[10px] text-white/25">{signal.platform} · {signal.time}</p>
                          </div>
                        </div>
                        <span className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          signal.status === "new" ? "bg-brand-orange/10 text-brand-orange" :
                          signal.status === "processing" ? "bg-blue-500/10 text-blue-400" :
                          signal.status === "ready" ? "bg-purple-500/10 text-purple-400" :
                          "bg-green-500/10 text-green-400"
                        }`}>
                          {signal.status}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-2 mt-5">
                    {[
                      { label: "Active", value: "12", color: "text-brand-orange" },
                      { label: "Building", value: "5", color: "text-blue-400" },
                      { label: "Deployed", value: "847", color: "text-green-400" },
                    ].map((stat) => (
                      <div key={stat.label} className="p-3 rounded-lg border border-white/[0.04]">
                        <p className="text-[9px] uppercase tracking-wider text-white/20">{stat.label}</p>
                        <p className={`text-lg font-semibold ${stat.color} mt-1`}>{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
