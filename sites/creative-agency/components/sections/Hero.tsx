"use client";

import { motion } from "framer-motion";
import { SplitText } from "@/components/ui/SplitText";

export function Hero() {
  return (
    <section className="relative min-h-svh flex flex-col justify-end pb-[15vh] px-[var(--grid-margin)] overflow-hidden">
      {/* Accent detail — small orange line */}
      <motion.div
        className="absolute top-[30vh] right-[var(--grid-margin)] w-px h-20 bg-[var(--color-accent)]"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{
          duration: 1,
          delay: 0.8,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{ transformOrigin: "top" }}
      />

      {/* Main hero content */}
      <div className="max-w-[90vw] lg:max-w-[80vw]">
        {/* Headline — viewport-filling, word stagger */}
        <SplitText
          text="WE CREATE DIGITAL EXPERIENCES"
          className="text-hero"
          stagger={0.08}
          delay={0.2}
        />

        {/* Subtitle */}
        <motion.p
          className="mt-8 max-w-xl text-[var(--text-body)] text-[var(--color-text-muted)] leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 1,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          A bold creative agency crafting premium digital experiences through
          design, strategy, and technology.
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 right-[var(--grid-margin)] flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
      >
        <span className="text-label">Scroll</span>
        <motion.div
          className="w-px h-8 bg-[var(--color-text-dim)]"
          animate={{
            scaleY: [0, 1, 0],
            originY: [0, 0, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      </motion.div>
    </section>
  );
}
