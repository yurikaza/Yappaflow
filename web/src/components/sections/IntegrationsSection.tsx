"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  MessageCircle,
  Instagram,
  ShoppingBag,
  Globe,
  Layout,
  Store,
  Server,
  Globe2,
} from "lucide-react";

const PLATFORMS = [
  { name: "WhatsApp\nListening", icon: MessageCircle },
  { name: "Instagram\nIntake", icon: Instagram },
  { name: "Shopify\nDeploy", icon: ShoppingBag },
  { name: "WordPress\nGeneration", icon: Globe },
  { name: "Webflow\nProjects", icon: Layout },
  { name: "IKAS\nCommerce", icon: Store },
  { name: "Namecheap\nDomains", icon: Globe2 },
  { name: "Hostinger\nHosting", icon: Server },
];

export function IntegrationsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 20%"],
  });
  const headingO = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const headingY = useTransform(scrollYProgress, [0, 1], [60, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0a0a0c] py-32 sm:py-40 overflow-hidden"
    >
      {/* Subtle grain */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC44IiBudW1PY3RhdmVzPSI0IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNuKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==")`,
          backgroundRepeat: "repeat",
        }}
      />

      <div className="relative z-10 px-3 sm:px-4 lg:px-6">
        {/* Big description text — 95% width */}
        <motion.div
          style={{ opacity: headingO, y: headingY }}
          className="mb-24 w-full"
        >
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] xl:text-5xl font-medium text-white leading-[1.25]">
            <span className="pl-36"></span> We are an AI-powered agency
            platform. Not just automation, not isolated tools. We provide{" "}
            <span className="font-bold">
              client listening, code generation, multi-platform deployment
            </span>{" "}
            and <span className="font-bold">system integration</span> as one
            connected approach. An end-to-end ecosystem designed to{" "}
            <span className="font-bold">scale, perform and integrate</span>{" "}
            seamlessly with existing platforms.
          </p>
        </motion.div>

        {/* Label row */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-[11px] uppercase tracking-widest text-white/20">
            Our Integrations
          </p>
          <p className="text-[11px] uppercase tracking-widest text-white/20">
            Est. 2026
          </p>
        </div>

        {/* Cards (left) + Text (right) — separated with gap */}
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-12 lg:gap-20 items-start">
          {/* Left: Compact card grid */}
          <div>
            {/* Row 1 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {PLATFORMS.slice(0, 4).map((platform, i) => (
                <motion.div
                  key={platform.name}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="bg-[#131316] rounded-lg p-3.5 w-[130px] sm:w-[140px] h-[120px] flex flex-col justify-between group hover:bg-[#1a1a1e] transition-colors cursor-pointer"
                >
                  <h3 className="text-[11px] font-medium text-white/70 whitespace-pre-line leading-tight group-hover:text-white transition-colors">
                    {platform.name}
                  </h3>
                  <div className="w-6 h-6 rounded bg-white/[0.04] flex items-center justify-center group-hover:bg-brand-orange/10 transition-colors">
                    <platform.icon
                      className="h-3 w-3 text-white/20 group-hover:text-brand-orange transition-colors"
                      strokeWidth={1.5}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
              {PLATFORMS.slice(4).map((platform, i) => (
                <motion.div
                  key={platform.name}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
                  className="bg-[#131316] rounded-lg p-3.5 w-[130px] sm:w-[140px] h-[120px] flex flex-col justify-between group hover:bg-[#1a1a1e] transition-colors cursor-pointer"
                >
                  <h3 className="text-[11px] font-medium text-white/70 whitespace-pre-line leading-tight group-hover:text-white transition-colors">
                    {platform.name}
                  </h3>
                  <div className="w-6 h-6 rounded bg-white/[0.04] flex items-center justify-center group-hover:bg-brand-orange/10 transition-colors">
                    <platform.icon
                      className="h-3 w-3 text-white/20 group-hover:text-brand-orange transition-colors"
                      strokeWidth={1.5}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Description text — separated */}
          <div className="max-w-md pt-2">
            <p className="text-xs text-white/30 leading-relaxed">
              Yappaflow connects to your existing tools silently. It listens to
              client conversations on WhatsApp and Instagram, extracts
              requirements in real-time, generates production-ready code, and
              deploys to your preferred platform. We don&apos;t add complexity.{" "}
              <span className="text-white/60 font-medium">We remove it.</span>
            </p>
            <p className="text-xs text-white/30 leading-relaxed mt-5">
              Your conversations become code, your meetings become live
              products.{" "}
              <span className="text-white/60 font-medium">
                That&apos;s the difference.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
