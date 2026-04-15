"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight } from "lucide-react";

const SHOWCASE = [
  { project: "E-Commerce Automation", company: "Fashion Agency" },
  { project: "Multi-Platform Deploy", company: "Digital Studio" },
  { project: "AI Client Intake", company: "Web Consultancy" },
  { project: "Real-Time Code Gen", company: "Dev Agency" },
  { project: "WhatsApp Integration", company: "Marketing Firm" },
  { project: "Turkish Market Launch", company: "Istanbul Agency" },
];

export function ShowcaseList() {
  return (
    <section className="py-32 sm:py-40 bg-brand-surface-secondary text-brand-text-primary">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          {/* Left heading */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-4xl sm:text-5xl uppercase tracking-tight leading-[0.9]">
              Yappaflow
            </h2>
            <h2 className="font-heading text-4xl sm:text-5xl uppercase tracking-tight leading-[0.9] text-brand-orange">
              in use
            </h2>
          </motion.div>

          {/* Right — showcase list */}
          <div>
            {SHOWCASE.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex items-center justify-between py-5 border-b border-dashed border-brand-text-primary/10 group cursor-pointer"
              >
                <span className="text-base sm:text-lg text-brand-text-secondary group-hover:text-brand-text-primary transition-colors">
                  {item.project}
                </span>
                <span className="text-sm sm:text-base font-bold text-brand-text-primary">
                  {item.company}
                </span>
              </motion.div>
            ))}

            {/* View Showcase button */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8"
            >
              <a
                href="#cta"
                className="inline-flex items-center gap-2 bg-brand-orange text-white text-xs uppercase tracking-widest px-8 py-4 hover:bg-brand-orange-dark transition-colors"
              >
                <ArrowUpRight className="h-4 w-4" />
                View Showcase
              </a>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
