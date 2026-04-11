"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight } from "lucide-react";

export function CtaSection() {
  const t = useTranslations("cta");

  return (
    <section id="cta" className="py-24 sm:py-40 bg-brand-surface-secondary text-brand-text-primary overflow-hidden">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Massive mixed-color typography like lenis */}
          <h2 className="font-heading uppercase tracking-tight leading-[0.9]"
            style={{ fontSize: "clamp(3rem, 10vw, 10rem)" }}
          >
            <span className="text-brand-text-primary">Yappaflow is</span>
            <br />
            <span className="text-brand-orange">your new</span>
            <br />
            <span className="text-brand-text-primary">agency</span>{" "}
            <span className="text-brand-text-tertiary">pipeline</span>
          </h2>
        </motion.div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row gap-4"
        >
          <Button
            href="#"
            className="bg-brand-orange text-white hover:bg-brand-orange-dark rounded-none px-10 py-5 text-xs uppercase tracking-widest"
          >
            {t("getDemo")} <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
