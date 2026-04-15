"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/Container";

const PROBLEMS = [
  { num: "01", text: "HOURS SPENT ON CLIENT BRIEFS THAT MISS THE MARK" },
  { num: "02", text: "MANUAL CODE GENERATION SLOWING YOUR PIPELINE" },
  { num: "03", text: "DEPLOYMENT CHAOS ACROSS MULTIPLE PLATFORMS" },
  { num: "04", text: "LOST CONTEXT BETWEEN CLIENT CONVERSATIONS AND DEV WORK" },
  { num: "05", text: "SCALING YOUR AGENCY WITHOUT SCALING YOUR TEAM" },
];

export function ProblemsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  return (
    <section
      ref={containerRef}
      className="relative bg-brand-dark"
      style={{ height: "300vh" }}
    >
      {/* Star particles — deterministic */}
      <div className="absolute inset-0 overflow-hidden">
        {[8,33,56,79,21,64,42,87,14,51,73,95,27,60,38,82,5,48,69,91].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-px bg-white/30 rounded-full"
            style={{
              left: `${pos}%`,
              top: `${[45,12,78,34,67,23,89,56,41,73,18,62,85,31,54,9,76,43,68,15][i]}%`,
            }}
            animate={{ opacity: [0.1, 0.5, 0.1] }}
            transition={{ duration: 3 + (i % 4) * 0.8, repeat: Infinity, delay: (i % 6) * 0.5 }}
          />
        ))}
      </div>

      {/* Section heading */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <Container className="mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.3em] text-brand-orange mb-4"
          >
            Rethinking agency work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-heading text-4xl sm:text-5xl uppercase tracking-tight text-white"
          >
            Sound <span className="text-white/30">familiar?</span>
          </motion.h2>
        </Container>

        {/* Horizontal scrolling cards */}
        <motion.div style={{ x }} className="flex gap-6 px-8 sm:px-12">
          {PROBLEMS.map(({ num, text }, i) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="shrink-0 w-[350px] sm:w-[420px] h-[320px] border border-white/10 flex flex-col justify-between p-6 sm:p-8 group hover:border-white/20 transition-colors"
            >
              <span className="font-heading text-6xl sm:text-7xl text-brand-orange/80">{num}</span>
              <p className="font-heading text-sm sm:text-base uppercase tracking-tight text-white leading-snug">
                {text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
