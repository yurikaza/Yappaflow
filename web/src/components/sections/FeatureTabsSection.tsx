"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Headphones, Code, Rocket } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { TabBar } from "@/components/ui/TabBar";
import { Button } from "@/components/ui/Button";

const TAB_ICONS = {
  listen: Headphones,
  build: Code,
  ship: Rocket,
} as const;

export function FeatureTabsSection() {
  const t = useTranslations("features");
  const [activeTab, setActiveTab] = useState("listen");

  const tabs = [
    { key: "listen", label: t("listen") },
    { key: "build", label: t("build") },
    { key: "ship", label: t("ship") },
  ];

  const tabContent = {
    listen: { title: t("listenTitle"), desc: t("listenDesc") },
    build: { title: t("buildTitle"), desc: t("buildDesc") },
    ship: { title: t("shipTitle"), desc: t("shipDesc") },
  };

  const content = tabContent[activeTab as keyof typeof tabContent];
  const Icon = TAB_ICONS[activeTab as keyof typeof TAB_ICONS];

  return (
    <section id="features" className="py-24 sm:py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-white/30 mb-4">How it works</p>
          <TabBar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="mt-16 grid gap-12 lg:grid-cols-2 items-center"
          >
            {/* Text */}
            <div>
              <h3 className="font-heading text-3xl uppercase tracking-tight sm:text-4xl">
                {content.title}
              </h3>
              <p className="mt-6 text-white/50 leading-relaxed">{content.desc}</p>
              <Button href="#cta" variant="link" className="mt-6" arrow>
                {t("listenSub")}
              </Button>
            </div>

            {/* Icon Preview */}
            <div className="flex items-center justify-center py-20 border border-white/5 rounded-lg">
              <Icon className="h-16 w-16 text-white/10" strokeWidth={1} />
            </div>
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}
