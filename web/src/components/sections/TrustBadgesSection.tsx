"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

const badges = [
  { label: "SOC 2", sublabel: "Type II" },
  { label: "ISO", sublabel: "27001" },
  { label: "GDPR", sublabel: "Compliant" },
];

export function TrustBadgesSection() {
  const t = useTranslations("trust");

  return (
    <section className="py-24 sm:py-32 bg-brand-surface-secondary">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-heading text-3xl uppercase tracking-tight text-brand-text-primary sm:text-4xl mb-4">
            {t("headline")}
          </h2>
          <p className="text-brand-text-secondary max-w-md mx-auto">{t("description")}</p>

          <div className="flex items-center justify-center gap-6 mt-12">
            {badges.map(({ label, sublabel }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                animate={{ y: [0, -6, 0] }}
                className="glass rounded-xl px-8 py-6 flex flex-col items-center shadow-lg"
              >
                <span className="text-2xl font-heading uppercase text-brand-text-primary">{label}</span>
                <span className="text-[10px] uppercase tracking-widest text-brand-text-tertiary mt-1">{sublabel}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
