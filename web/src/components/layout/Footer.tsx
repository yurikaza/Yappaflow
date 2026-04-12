"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const LINKS = [
  { label: "Github", href: "#" },
  { label: "X", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Contact", href: "#" },
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
];

export function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: footerRef, offset: ["start end", "end end"] });
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [0.05, 0.12]);

  return (
    <footer ref={footerRef} className="relative bg-brand-dark overflow-hidden">
      {/* Top links bar */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-8 border-t border-white/[0.04]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-6">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[10px] uppercase tracking-widest text-white/20 hover:text-white/50 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <p className="text-[10px] uppercase tracking-widest text-white/10">
            © 2026 Yappaflow. All rights reserved.
          </p>
        </div>
      </div>

      {/* Massive "YAPPAFLOW" text — 30vh tall, fills bottom */}
      <div className="relative h-[30vh] flex items-end justify-center overflow-hidden">
        <motion.h2
          style={{ opacity: textOpacity }}
          className="font-heading uppercase tracking-tighter text-white leading-none select-none whitespace-nowrap pb-0"
          // Font so large it overflows — intentional, only top portion visible
        >
          <span className="text-[clamp(8rem,22vw,25rem)]">
            YAPPAFLOW
          </span>
        </motion.h2>
      </div>
    </footer>
  );
}
