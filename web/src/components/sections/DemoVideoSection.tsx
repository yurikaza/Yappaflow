"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { SplitText } from "@/components/ui/SplitText";

export function DemoVideoSection() {
  const t = useTranslations("demo");
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const videoRotateX = useTransform(scrollYProgress, [0, 1], [8, 0]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);

  return (
    <section ref={sectionRef} id="demo" className="py-24 sm:py-32 bg-brand-surface-secondary">
      <Container>
        <div className="text-center mb-16">
          <SplitText
            as="h2"
            animation="slide"
            className="font-heading text-4xl uppercase tracking-tight text-brand-text-primary sm:text-5xl lg:text-6xl"
          >
            {t("headline")}
          </SplitText>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 text-brand-text-secondary max-w-lg mx-auto leading-relaxed"
          >
            {t("description")}
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto perspective-container">
          <motion.div
            style={{
              y: videoY,
              rotateX: videoRotateX,
              scale: videoScale,
              transformStyle: "preserve-3d",
            }}
          >
            <VideoPlayer />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
