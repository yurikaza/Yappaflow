"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Rocket, Code, Globe, Shield, ShoppingBag, MessageCircle, BarChart3 } from "lucide-react";
import { ParticleGlobe } from "@/components/ui/ParticleGlobe";

interface Hero115Props {
  heading: string;
  description: string;
  button: {
    text: string;
    url: string;
  };
  secondaryButton?: {
    text: string;
    url: string;
  };
  badgeText?: string;
  trustText?: string;
}

/* ── Dashboard Preview ── */
function DashboardPreview() {
  const projects = [
    { name: "Fashion Store", platform: "Shopify", status: "Live", progress: 100 },
    { name: "Restaurant Site", platform: "WordPress", status: "Building", progress: 68 },
    { name: "SaaS Landing", platform: "Webflow", status: "Deploying", progress: 89 },
  ];

  const stats = [
    { label: "Projects Shipped", value: "1,247", icon: Rocket },
    { label: "Code Generated", value: "3.2M", icon: Code },
    { label: "Platforms", value: "6+", icon: Globe },
    { label: "Uptime", value: "99.9%", icon: Shield },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto w-full max-w-screen-lg"
    >
      <div className="rounded-xl border border-white/[0.08] bg-[#0d1117] overflow-hidden shadow-2xl shadow-black/60">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.06] bg-[#161b22]">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 mx-8">
            <div className="bg-white/[0.06] rounded px-3 py-1 text-[11px] text-white/30 text-center max-w-xs mx-auto">
              app.yappaflow.com/dashboard
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-5">
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 + i * 0.08 }}
                className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-3"
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <stat.icon className="h-3 w-3 text-brand-orange/70" />
                  <span className="text-[9px] uppercase tracking-wider text-white/25">{stat.label}</span>
                </div>
                <span className="text-base font-semibold text-white">{stat.value}</span>
              </motion.div>
            ))}
          </div>

          {/* Projects */}
          <div className="rounded-lg border border-white/[0.06] overflow-hidden">
            <div className="grid grid-cols-[1fr_auto_auto_1fr] gap-4 px-4 py-2 bg-white/[0.02] border-b border-white/[0.06] text-[9px] uppercase tracking-wider text-white/20">
              <span>Project</span><span>Platform</span><span>Status</span><span>Progress</span>
            </div>
            {projects.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.2 + i * 0.1 }}
                className="grid grid-cols-[1fr_auto_auto_1fr] gap-4 items-center px-4 py-2.5 border-b border-white/[0.04] last:border-0"
              >
                <span className="text-xs text-white font-medium">{p.name}</span>
                <span className="text-[10px] text-white/35 flex items-center gap-1">
                  <ShoppingBag className="h-2.5 w-2.5" />{p.platform}
                </span>
                <span className={`text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded ${
                  p.status === "Live" ? "bg-green-500/10 text-green-400"
                    : p.status === "Building" ? "bg-brand-orange/10 text-brand-orange"
                    : "bg-blue-500/10 text-blue-400"
                }`}>{p.status}</span>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 bg-white/[0.06] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${p.progress}%` }}
                      transition={{ duration: 1.2, delay: 1.4 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                      className={`h-full rounded-full ${p.progress === 100 ? "bg-green-500" : "bg-brand-orange"}`}
                    />
                  </div>
                  <span className="text-[10px] text-white/25 w-7 text-right">{p.progress}%</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom row */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-1.5 text-[10px] text-white/15">
              <MessageCircle className="h-3 w-3" /><span>3 active conversations</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-brand-orange/60">
              <BarChart3 className="h-3 w-3" /><span>Analytics</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const Hero115 = ({
  heading,
  description,
  button,
  secondaryButton,
  badgeText,
}: Hero115Props) => {
  const parts = heading.split(".");
  const line1 = parts[0]?.trim() || "";
  const line2 = parts[1]?.trim() || "";

  return (
    <section className="relative overflow-hidden bg-brand-dark text-white pt-28 pb-16 min-h-svh">
      {/* Particle Globe background */}
      <div className="absolute inset-0 z-0">
        <ParticleGlobe className="w-full h-full" />
      </div>

      {/* Extra ambient glow */}
      <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-brand-orange/[0.04] blur-[150px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          {badgeText && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] backdrop-blur-sm px-4 py-2"
            >
              <Sparkles className="h-3.5 w-3.5 text-brand-orange" />
              <span className="text-xs font-medium text-white/70">{badgeText}</span>
            </motion.div>
          )}

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight leading-[0.95]"
          >
            {line1}
            <br />
            {line2 && <>{line2}.</>}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 max-w-xl text-base sm:text-lg text-white/40 leading-relaxed"
          >
            {description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href={button.url}
              className="inline-flex items-center gap-2 bg-white text-brand-dark text-sm font-medium px-7 py-3.5 rounded-full hover:bg-white/90 transition-colors"
            >
              {button.text}
              <ArrowUpRight className="h-4 w-4" />
            </a>
            {secondaryButton && (
              <a
                href={secondaryButton.url}
                className="inline-flex items-center gap-2 border border-white/15 text-white text-sm font-medium px-7 py-3.5 rounded-full hover:border-white/30 hover:bg-white/[0.04] transition-all"
              >
                {secondaryButton.text}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </motion.div>
        </div>

        {/* Dashboard preview */}
        <div className="mt-16">
          <DashboardPreview />
        </div>
      </div>
    </section>
  );
};

export { Hero115 };
