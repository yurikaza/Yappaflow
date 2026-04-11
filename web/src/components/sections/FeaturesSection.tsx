"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/Container";

const FEATURES = [
  { num: "01", title: "Listen to client conversations in real-time" },
  { num: "02", title: "Extract requirements automatically via AI" },
  { num: "03", title: "Generate production-ready code in minutes" },
  { num: "04", title: "Deploy to Shopify, WordPress, Webflow, IKAS" },
  { num: "05", title: "Auto-purchase domains and configure DNS" },
  { num: "06", title: "Connect WhatsApp and Instagram channels" },
  { num: "07", title: "Enterprise-grade security built in" },
  { num: "08", title: "Full API access for custom integrations" },
  { num: "09", title: "Touch-friendly mobile dashboard" },
];

function FanCard({ num, title, index, progress }: {
  num: string;
  title: string;
  index: number;
  progress: ReturnType<typeof useTransform>;
}) {
  // Each card fans out from a stacked position to its final position
  const fanX = useTransform(progress, [0, 0.5, 1], [0, index * 25, index * 25]);
  const fanY = useTransform(progress, [0, 0.5, 1], [0, index * 30, index * 30]);
  const fanRotate = useTransform(progress, [0, 0.5, 1], [0, index * -1.5, index * -1.5]);

  return (
    <motion.div
      style={{
        x: fanX,
        y: fanY,
        rotate: fanRotate,
        zIndex: FEATURES.length - index,
      }}
      className="absolute top-0 left-0 w-[320px] sm:w-[380px] h-[340px] sm:h-[400px] border border-brand-text-primary/10 bg-white flex flex-col justify-between p-6 sm:p-8"
    >
      <span className="font-heading text-5xl sm:text-6xl text-brand-orange/50">{num}</span>
      <p className="font-heading text-sm sm:text-base uppercase tracking-tight text-brand-text-primary leading-snug">
        {title}
      </p>
    </motion.div>
  );
}

export function FeaturesSection() {
  const t = useTranslations("features");
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      className="relative bg-brand-surface-secondary text-brand-text-primary"
      style={{ height: "250vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <Container className="h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            {/* Left — Card stack that fans out */}
            <div className="relative h-[400px] sm:h-[500px]">
              {FEATURES.map((feat, i) => (
                <FanCard
                  key={feat.num}
                  num={feat.num}
                  title={feat.title}
                  index={i}
                  progress={scrollYProgress}
                />
              ))}
            </div>

            {/* Right — Heading */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-right"
            >
              <h2 className="font-heading text-5xl sm:text-6xl lg:text-8xl uppercase tracking-tight leading-[0.9]">
                Yappaflow brings
              </h2>
              <h2 className="font-heading text-5xl sm:text-6xl lg:text-8xl uppercase tracking-tight leading-[0.9] text-brand-text-tertiary">
                the heat
              </h2>
            </motion.div>
          </div>
        </Container>
      </div>
    </section>
  );
}
