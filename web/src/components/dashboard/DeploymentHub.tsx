"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Server, Check, ExternalLink, Sparkles, ChevronLeft, ArrowRight } from "lucide-react";
import type { DashboardView } from "./DashboardShell";

type Route = "cms" | "custom" | null;
type CMS   = "shopify" | "wordpress" | "webflow" | "ikas";

const CMS_OPTIONS: { id: CMS; label: string; color: string; desc: string }[] = [
  { id: "shopify",   label: "Shopify",   color: "#96BF48", desc: "E-commerce stores"      },
  { id: "wordpress", label: "WordPress", color: "#21759B", desc: "Blogs & business sites" },
  { id: "webflow",   label: "Webflow",   color: "#4353FF", desc: "Design-first websites"  },
  { id: "ikas",      label: "IKAS",      color: "#F97316", desc: "Turkish e-commerce"     },
];

const DEPLOY_STEPS = ["Building assets", "Configuring DNS", "SSL certificate", "Going live"];

function SuccessScreen({ onBack }: { onBack: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center h-full text-center px-12 py-16">
      <div className="relative mb-8">
        {[1.4, 1.8].map((s, i) => (
          <motion.div key={i} className="absolute inset-0 rounded-full border-2 border-green-300"
            initial={{ scale: 1, opacity: 0.6 }} animate={{ scale: s, opacity: 0 }}
            transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.5, ease: "easeOut" }}
            style={{ width: 72, height: 72, top: 0, left: 0 }} />
        ))}
        <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-green-500 shadow-xl shadow-green-500/20">
          <Check size={32} strokeWidth={3} className="text-white" />
        </div>
      </div>
      <h2 className="text-3xl font-black tracking-tight text-white">Site is Live! 🎉</h2>
      <p className="mt-2 text-white/30">Your project was deployed successfully</p>
      <div className="mt-6 flex items-center gap-2 rounded-xl bg-green-500/10 border border-green-500/20 px-5 py-3">
        <Globe size={14} className="text-green-400" />
        <span className="text-[13px] font-semibold text-green-400">https://butikmode.com</span>
      </div>
      <div className="mt-5 flex gap-3">
        <button className="flex items-center gap-2 rounded-xl bg-[#0A0A0A] px-5 py-2.5 text-[13px] font-bold text-white hover:opacity-80 transition-opacity">
          <ExternalLink size={14} />
          Open Live Site
        </button>
        <button onClick={onBack}
          className="rounded-xl border border-white/[0.05] px-5 py-2.5 text-[13px] font-semibold text-white/30 hover:bg-white/[0.04] transition-colors">
          Back to Dashboard
        </button>
      </div>
    </motion.div>
  );
}

interface Props { setView: (v: DashboardView) => void; }

export function DeploymentHub({ setView }: Props) {
  const [route, setRoute]      = useState<Route>(null);
  const [cms, setCms]          = useState<CMS | null>(null);
  const [deploying, setDeploy] = useState(false);
  const [success, setSuccess]  = useState(false);
  const [progress, setProgress] = useState(0);

  const startDeploy = () => {
    setDeploy(true);
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 10 + 4;
      if (p >= 100) { p = 100; clearInterval(iv); setTimeout(() => setSuccess(true), 500); }
      setProgress(Math.min(p, 100));
    }, 200);
  };

  if (success) return <SuccessScreen onBack={() => { setSuccess(false); setDeploy(false); setRoute(null); setCms(null); setProgress(0); setView("command"); }} />;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        {route && (
          <button onClick={() => setRoute(null)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.05] bg-[#111114] hover:bg-white/[0.04] transition-colors">
            <ChevronLeft size={16} className="text-white/30" />
          </button>
        )}
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white">Deploy Hub</h1>
          <p className="mt-0.5 text-[13px] text-white/30">
            {!route ? "Choose your deployment route" : route === "cms" ? "Select a CMS platform" : "Configure domain & hosting"}
          </p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Route selector */}
        {!route && (
          <motion.div key="routes" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="grid grid-cols-2 gap-5 max-w-2xl">
              {[
                { id: "cms" as Route,    label: "Deploy to CMS",   icon: Globe,  accent: "#4353FF", bg: "bg-blue-500/10",    desc: "Shopify, WordPress, Webflow or IKAS" },
                { id: "custom" as Route, label: "Deploy Custom",   icon: Server, accent: "#FF6B35", bg: "bg-[#FF6B35]/10",  desc: "Domain via Namecheap + Hostinger server" },
              ].map(({ id, label, icon: Icon, accent, bg, desc }) => (
                <button key={id!} onClick={() => setRoute(id)}
                  className="group rounded-2xl bg-[#111114] border border-white/[0.05] p-7 text-left hover:border-white/[0.08] hover:shadow-xl hover:shadow-black/20 transition-all">
                  <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${bg}`}>
                    <Icon size={24} style={{ color: accent }} />
                  </div>
                  <h3 className="text-[16px] font-bold text-white">{label}</h3>
                  <p className="mt-1.5 text-[13px] text-white/30">{desc}</p>
                  <div className="mt-5 flex items-center gap-1.5 text-[13px] font-bold" style={{ color: accent }}>
                    Select route <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* CMS route */}
        {route === "cms" && !deploying && (
          <motion.div key="cms" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-xl">
            <div className="grid grid-cols-2 gap-3 mb-6">
              {CMS_OPTIONS.map((opt) => (
                <button key={opt.id} onClick={() => setCms(opt.id)}
                  className={[
                    "relative rounded-xl border p-5 text-left transition-all",
                    cms === opt.id ? "border-2 shadow-xl shadow-black/20" : "border-white/[0.05] bg-[#111114] hover:border-white/[0.08]",
                  ].join(" ")}
                  style={cms === opt.id ? { borderColor: opt.color, backgroundColor: `${opt.color}08` } : {}}
                >
                  <div className="mb-3 h-2 w-2 rounded-full" style={{ backgroundColor: opt.color }} />
                  <p className="text-[14px] font-bold" style={cms === opt.id ? { color: opt.color } : {}}>{opt.label}</p>
                  <p className="mt-1 text-[11px] text-white/20">{opt.desc}</p>
                  {cms === opt.id && (
                    <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full" style={{ backgroundColor: opt.color }}>
                      <Check size={11} strokeWidth={3} className="text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
            {cms && (
              <motion.button initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} onClick={startDeploy}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-[13px] font-bold text-[#0A0A0A] hover:opacity-80 transition-opacity shadow-xl shadow-black/20">
                <Sparkles size={15} />
                Deploy to {CMS_OPTIONS.find((c) => c.id === cms)?.label}
              </motion.button>
            )}
          </motion.div>
        )}

        {/* Custom route */}
        {route === "custom" && !deploying && (
          <motion.div key="custom" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-md">
            <div className="space-y-4 mb-6">
              {[
                {
                  step: 1, title: "Domain Search — Namecheap",
                  content: (
                    <div>
                      <div className="flex items-center gap-2 rounded-lg border border-green-500/20 bg-green-500/10 px-3 py-2.5">
                        <span className="text-[12px] text-white/20">https://</span>
                        <span className="flex-1 text-[13px] font-mono font-semibold">butikmode.com</span>
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500">
                          <Check size={11} strokeWidth={3} className="text-white" />
                        </div>
                      </div>
                      <p className="mt-1.5 text-[11px] text-green-400 font-semibold">✓ Available — $10.98/yr</p>
                    </div>
                  ),
                },
                {
                  step: 2, title: "Server — Hostinger",
                  content: (
                    <div className="flex items-center justify-between rounded-lg border border-white/[0.05] bg-[#111114] px-4 py-3">
                      <div>
                        <p className="text-[13px] font-bold text-white">Business Plan</p>
                        <p className="text-[11px] text-white/20 mt-0.5">4 GB RAM · 200 GB SSD · Auto SSL</p>
                      </div>
                      <span className="text-[16px] font-black text-[#FF6B35]">$3.99<span className="text-[11px] font-medium text-white/20">/mo</span></span>
                    </div>
                  ),
                },
              ].map(({ step, title, content }) => (
                <div key={step} className="flex gap-4">
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#FF6B35]/10 border border-[#FF6B35]/30">
                    <span className="text-[11px] font-black text-[#FF6B35]">{step}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-[13px] font-semibold mb-2">{title}</p>
                    {content}
                  </div>
                </div>
              ))}
            </div>
            <button onClick={startDeploy}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-[13px] font-bold text-[#0A0A0A] hover:opacity-80 transition-opacity shadow-xl shadow-black/20">
              <Sparkles size={15} />
              Confirm & Deploy
            </button>
          </motion.div>
        )}

        {/* Deploying */}
        {deploying && !success && (
          <motion.div key="deploying" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-sm mx-auto mt-10 text-center">
            <p className="text-[18px] font-black mb-1 text-white">Deploying your site...</p>
            <p className="text-[13px] text-white/30 mb-8">Usually takes under 30 seconds</p>
            <div className="h-1.5 w-full rounded-full bg-white/[0.06] mb-6 overflow-hidden">
              <motion.div className="h-1.5 rounded-full bg-[#FF6B35]" style={{ width: `${progress}%` }} />
            </div>
            <div className="space-y-3 text-left">
              {DEPLOY_STEPS.map((step, i) => {
                const done = progress > (i + 1) * 25;
                return (
                  <div key={step} className="flex items-center gap-3">
                    <div className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full transition-all ${done ? "bg-green-500" : "bg-white/[0.06]"}`}>
                      {done && <Check size={11} strokeWidth={3} className="text-white" />}
                    </div>
                    <span className={`text-[13px] transition-colors ${done ? "text-white font-medium" : "text-white/20"}`}>{step}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
