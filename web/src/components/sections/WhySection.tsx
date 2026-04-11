"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

const HIGHLIGHTS = [
  {
    title: "CREATE MORE IMMERSIVE EXPERIENCES",
    desc: "Unlock the creative potential and impact of your web agency. Smooth automation pulls clients into the narrative.",
  },
  {
    title: "INCREASE CONVERSION RATES",
    desc: "A frictionless pipeline reduces client friction, speeds up onboarding, and closes more deals.",
  },
  {
    title: "IMPROVE PERCEIVED QUALITY",
    desc: "Polished automated workflows communicate professionalism and attention to detail.",
  },
];

export function WhySection() {
  const t = useTranslations("hero");

  return (
    <section className="py-32 sm:py-40 bg-brand-dark relative overflow-hidden">
      {/* Star particles */}
      <div className="absolute inset-0">
        {[15,42,68,89,31,55,73,96,8,47].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-px bg-white/30 rounded-full"
            style={{
              left: `${pos}%`,
              top: `${[22,61,38,74,52,11,83,45,67,29][i]}%`,
            }}
            animate={{ opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: (i % 5) * 0.5 }}
          />
        ))}
      </div>

      <Container className="relative z-10">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left — heading with accent line */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex gap-6"
          >
            {/* Vertical orange accent line */}
            <div className="w-1 bg-brand-orange shrink-0 rounded-full" />
            <h2 className="font-heading text-5xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-white leading-[0.9]">
              Why<br />Yappaflow?
            </h2>
          </motion.div>

          {/* Right — body text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-base text-white/50 leading-relaxed">
              We&apos;ve heard all the reasons agencies stick to manual workflows. It&apos;s slow. It&apos;s expensive. It&apos;s error-prone. And historically, those were all true. But we like to imagine things as they could be, then build them. So, why should you automate your agency?
            </p>
          </motion.div>
        </div>

        {/* 3 Feature highlight cards */}
        <div className="grid gap-8 md:grid-cols-3 mt-20">
          {HIGHLIGHTS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <h3 className="font-heading text-lg sm:text-xl uppercase tracking-tight text-brand-orange leading-snug">
                {item.title}
              </h3>
              <p className="mt-3 text-sm text-white/40 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
