"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

export function AboutSection() {
  return (
    <section className="py-32 sm:py-40 bg-brand-surface-secondary text-brand-text-primary">
      <Container>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-snug font-light max-w-5xl"
        >
          Yappaflow is an{" "}
          <span className="text-brand-orange font-normal">AI-powered platform</span>{" "}
          built to automate the entire web agency pipeline and supercharge your team with{" "}
          <span className="text-brand-orange font-normal">butter-smooth workflows</span>,{" "}
          all while keeping your standards high and your clients happy.
        </motion.p>
      </Container>
    </section>
  );
}
