"use client";

import { Zap, MessageCircle, Code, Rocket, Globe, ShoppingBag, BarChart3, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { ShadcnButton } from "@/components/ui/shadcn-button";

interface Hero115Props {
  heading: string;
  description: string;
  button: {
    text: string;
    icon?: React.ReactNode;
    url: string;
  };
  trustText?: string;
}

/* ── Fake dashboard that shows platform capabilities ── */
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
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto w-full max-w-screen-lg"
    >
      <div className="rounded-2xl border border-white/[0.08] bg-brand-dark-card overflow-hidden shadow-2xl shadow-black/40">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          </div>
          <div className="flex-1 mx-8">
            <div className="bg-white/[0.04] rounded-md px-3 py-1 text-[11px] text-white/30 text-center max-w-xs mx-auto">
              app.yappaflow.com/dashboard
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <stat.icon className="h-3.5 w-3.5 text-brand-orange/70" />
                  <span className="text-[10px] uppercase tracking-wider text-white/30">{stat.label}</span>
                </div>
                <span className="text-lg font-semibold text-white">{stat.value}</span>
              </motion.div>
            ))}
          </div>

          {/* Projects table */}
          <div className="rounded-lg border border-white/[0.06] overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-[1fr_auto_auto_1fr] gap-4 px-4 py-2.5 bg-white/[0.02] border-b border-white/[0.06] text-[10px] uppercase tracking-wider text-white/25">
              <span>Project</span>
              <span>Platform</span>
              <span>Status</span>
              <span>Progress</span>
            </div>

            {/* Table rows */}
            {projects.map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.0 + i * 0.12 }}
                className="grid grid-cols-[1fr_auto_auto_1fr] gap-4 items-center px-4 py-3 border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors"
              >
                <span className="text-sm text-white font-medium">{project.name}</span>
                <span className="text-xs text-white/40 flex items-center gap-1.5">
                  <ShoppingBag className="h-3 w-3" />
                  {project.platform}
                </span>
                <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  project.status === "Live"
                    ? "bg-green-500/10 text-green-400"
                    : project.status === "Building"
                    ? "bg-brand-orange/10 text-brand-orange"
                    : "bg-blue-500/10 text-blue-400"
                }`}>
                  {project.status}
                </span>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress}%` }}
                      transition={{ duration: 1.2, delay: 1.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                      className={`h-full rounded-full ${
                        project.progress === 100 ? "bg-green-500" : "bg-brand-orange"
                      }`}
                    />
                  </div>
                  <span className="text-[11px] text-white/30 w-8 text-right">{project.progress}%</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom action row */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2 text-[11px] text-white/20">
              <MessageCircle className="h-3.5 w-3.5" />
              <span>3 active client conversations</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-brand-orange">
              <BarChart3 className="h-3.5 w-3.5" />
              <span>View Analytics</span>
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
  trustText,
}: Hero115Props) => {
  return (
    <section className="overflow-hidden py-32 bg-brand-dark text-white">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5">
          <div className="relative flex flex-col gap-5">
            {/* Concentric circle decoration */}
            <div
              style={{ transform: "translate(-50%, -50%)" }}
              className="absolute left-1/2 top-1/2 -z-10 mx-auto size-[800px] rounded-full border border-white/[0.06] p-16 [mask-image:linear-gradient(to_top,transparent,transparent,white,white,white,transparent,transparent)] md:size-[1300px] md:p-32"
            >
              <div className="size-full rounded-full border border-white/[0.06] p-16 md:p-32">
                <div className="size-full rounded-full border border-white/[0.06]"></div>
              </div>
            </div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto max-w-screen-lg text-balance text-center font-heading text-4xl uppercase tracking-tight md:text-7xl lg:text-8xl"
            >
              {heading.split(".")[0]}.
              <br />
              <span className="text-brand-orange">{heading.split(".")[1]?.trim()}</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mx-auto max-w-screen-md text-center text-white/50 md:text-lg"
            >
              {description}
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col items-center justify-center gap-3 pb-12 pt-3"
            >
              <ShadcnButton
                size="lg"
                asChild
                className="bg-brand-orange text-white hover:bg-brand-orange-dark rounded-none px-10 py-6 text-xs uppercase tracking-widest"
              >
                <a href={button.url}>
                  {button.text} {button.icon}
                </a>
              </ShadcnButton>
              {trustText && (
                <div className="text-xs text-white/30">{trustText}</div>
              )}
            </motion.div>
          </div>

          {/* Dashboard preview */}
          <DashboardPreview />
        </div>
      </div>
    </section>
  );
};

export { Hero115 };
