"use client";

import { useTranslations } from "next-intl";
import { motion, useTransform, MotionValue } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { StickyScrollSection } from "@/components/ui/StickyScrollSection";

function StoryContent({ progress }: { progress: MotionValue<number> }) {
  const t = useTranslations("features");

  const textOpacity = useTransform(progress, [0, 0.15], [0, 1]);
  const textY = useTransform(progress, [0, 0.15], [40, 0]);

  // Frame visibilities
  const f1 = useTransform(progress, [0.05, 0.15, 0.3, 0.35], [0, 1, 1, 0]);
  const f2 = useTransform(progress, [0.3, 0.4, 0.6, 0.65], [0, 1, 1, 0]);
  const f3 = useTransform(progress, [0.6, 0.7, 0.95, 1], [0, 1, 1, 0.8]);

  // Chat bubbles stagger
  const b1 = useTransform(progress, [0.08, 0.18], [0, 1]);
  const b2 = useTransform(progress, [0.14, 0.24], [0, 1]);
  const b3 = useTransform(progress, [0.2, 0.3], [0, 1]);

  // Processing pulse
  const pulseScale = useTransform(progress, [0.35, 0.5, 0.6], [0.5, 1.2, 1]);
  const pulseOpacity = useTransform(progress, [0.35, 0.45, 0.55, 0.6], [0, 1, 1, 0.5]);

  // Checklist items
  const c1 = useTransform(progress, [0.68, 0.75], [0, 1]);
  const c2 = useTransform(progress, [0.73, 0.8], [0, 1]);
  const c3 = useTransform(progress, [0.78, 0.85], [0, 1]);
  const c4 = useTransform(progress, [0.83, 0.9], [0, 1]);

  return (
    <Container>
      <div className="grid gap-12 lg:grid-cols-2 items-center min-h-[80vh]">
        {/* Left — Text */}
        <motion.div style={{ opacity: textOpacity, y: textY }}>
          <p className="text-xs uppercase tracking-[0.3em] text-brand-orange mb-4">01 / Listen</p>
          <h2 className="font-heading text-4xl uppercase tracking-tight sm:text-5xl lg:text-6xl text-brand-text-primary">
            {t("listenTitle")}
          </h2>
          <p className="mt-6 text-brand-text-secondary leading-relaxed max-w-md">
            {t("listenDesc")}
          </p>
        </motion.div>

        {/* Right — Animated Frames */}
        <div className="relative h-[400px]">
          {/* Frame 1: Chat bubbles */}
          <motion.div style={{ opacity: f1 }} className="absolute inset-0 flex flex-col justify-center">
            <div className="glass rounded-2xl p-6 space-y-3">
              <motion.div style={{ opacity: b1 }} className="bg-brand-orange/10 rounded-2xl rounded-bl-sm px-4 py-3 max-w-[85%]">
                <p className="text-sm text-brand-text-primary">I need a modern online store for my brand...</p>
              </motion.div>
              <motion.div style={{ opacity: b2 }} className="bg-brand-surface-tertiary rounded-2xl rounded-bl-sm px-4 py-3 max-w-[70%]">
                <p className="text-sm text-brand-text-secondary">With Turkish lira payments and dark mode</p>
              </motion.div>
              <motion.div style={{ opacity: b3 }} className="bg-brand-surface-tertiary rounded-2xl rounded-bl-sm px-4 py-3 max-w-[60%]">
                <p className="text-sm text-brand-text-secondary">Launch by next Friday</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Frame 2: AI Processing */}
          <motion.div style={{ opacity: f2 }} className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <motion.div
                style={{ scale: pulseScale, opacity: pulseOpacity }}
                className="w-24 h-24 rounded-full bg-brand-orange/20 border-2 border-brand-orange flex items-center justify-center"
              >
                <div className="w-3 h-3 rounded-full bg-brand-orange animate-pulse" />
              </motion.div>
              <p className="mt-4 text-sm font-medium text-brand-orange">AI Processing...</p>
            </div>
          </motion.div>

          {/* Frame 3: Requirements Extracted */}
          <motion.div style={{ opacity: f3 }} className="absolute inset-0 flex flex-col justify-center">
            <div className="glass rounded-2xl p-6">
              <p className="text-xs uppercase tracking-widest text-brand-orange mb-4">Requirements Extracted</p>
              {[
                { text: "E-commerce platform with product catalog", o: c1 },
                { text: "Iyzico payment gateway (TRY)", o: c2 },
                { text: "Dark mode theme system", o: c3 },
                { text: "Deadline: 7 days", o: c4 },
              ].map((item, i) => (
                <motion.div key={i} style={{ opacity: item.o }} className="flex items-center gap-3 py-2 border-b border-brand-border last:border-0">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                  </div>
                  <span className="text-sm text-brand-text-primary">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </Container>
  );
}

export function ListenStorySection() {
  return (
    <StickyScrollSection height={300}>
      {(progress) => <StoryContent progress={progress} />}
    </StickyScrollSection>
  );
}
