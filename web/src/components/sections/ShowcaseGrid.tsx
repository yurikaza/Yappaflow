"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SplitText } from "@/components/ui/SplitText";

const cards = [
  { key: "card1", num: "01" },
  { key: "card2", num: "02" },
  { key: "card3", num: "03" },
];

export function ShowcaseGrid() {
  const t = useTranslations("showcase");
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headingY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={sectionRef} className="py-24 sm:py-32">
      <Container>
        <motion.div style={{ y: headingY }}>
          <SplitText
            as="h2"
            animation="color"
            className="font-heading text-4xl uppercase tracking-tight text-brand-text-primary sm:text-5xl lg:text-6xl mb-16"
          >
            {t("headline")}
          </SplitText>
        </motion.div>

        <div className="space-y-0 border-t border-brand-border">
          {cards.map(({ key, num }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-[auto_1fr] gap-8 py-10 border-b border-brand-border items-start group hover:bg-brand-surface-secondary/50 px-4 -mx-4 rounded-lg transition-colors"
            >
              <span className="text-xs text-brand-orange font-mono pt-1">{num}</span>
              <div>
                <h3 className="font-heading text-xl uppercase tracking-tight text-brand-text-primary sm:text-2xl group-hover:text-brand-orange transition-colors">
                  {t(`${key}Title`)}
                </h3>
                <p className="mt-3 text-sm text-brand-text-secondary leading-relaxed max-w-lg">
                  {t(`${key}Desc`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
