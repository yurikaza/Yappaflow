"use client";

import { useTranslations } from "next-intl";
import { motion, useTransform, MotionValue } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { StickyScrollSection } from "@/components/ui/StickyScrollSection";

const STATUS_ITEMS = [
  { label: "DNS Configured", delay: 0.42 },
  { label: "SSL Provisioned", delay: 0.48 },
  { label: "Assets Optimized", delay: 0.54 },
];

function StoryContent({ progress }: { progress: MotionValue<number> }) {
  const t = useTranslations("features");

  const textOpacity = useTransform(progress, [0, 0.12], [0, 1]);
  const textY = useTransform(progress, [0, 0.12], [40, 0]);

  const f1 = useTransform(progress, [0.05, 0.15, 0.3, 0.35], [0, 1, 1, 0]);
  const f2 = useTransform(progress, [0.3, 0.4, 0.6, 0.65], [0, 1, 1, 0]);
  const f3 = useTransform(progress, [0.6, 0.7, 0.95, 1], [0, 1, 1, 0.8]);

  // Deploy button press
  const btnScale = useTransform(progress, [0.1, 0.2, 0.25], [1, 0.95, 1]);

  // Progress bar
  const barWidth = useTransform(progress, [0.35, 0.6], [0, 100]);

  // Browser scale
  const browserScale = useTransform(progress, [0.65, 0.9], [0.8, 1]);
  const browserRotateX = useTransform(progress, [0.65, 0.9], [8, 0]);

  return (
    <Container>
      <div className="grid gap-12 lg:grid-cols-2 items-center min-h-[80vh]">
        <motion.div style={{ opacity: textOpacity, y: textY }}>
          <p className="text-xs uppercase tracking-[0.3em] text-brand-orange mb-4">03 / Ship</p>
          <h2 className="font-heading text-4xl uppercase tracking-tight sm:text-5xl lg:text-6xl text-brand-text-primary">
            {t("shipTitle")}
          </h2>
          <p className="mt-6 text-brand-text-secondary leading-relaxed max-w-md">
            {t("shipDesc")}
          </p>
        </motion.div>

        <div className="relative h-[400px]">
          {/* Frame 1: Deploy button */}
          <motion.div style={{ opacity: f1 }} className="absolute inset-0 flex items-center justify-center">
            <motion.div
              style={{ scale: btnScale }}
              className="relative"
            >
              <div className="absolute inset-0 bg-brand-orange/20 rounded-full blur-xl scale-150" />
              <div className="relative bg-brand-orange text-white px-12 py-5 rounded-full text-lg font-heading uppercase tracking-wider shadow-xl shadow-brand-orange/30 cursor-pointer">
                Deploy
              </div>
            </motion.div>
          </motion.div>

          {/* Frame 2: Progress */}
          <motion.div style={{ opacity: f2 }} className="absolute inset-0 flex items-center justify-center">
            <div className="glass rounded-2xl p-6 w-full max-w-sm">
              <p className="text-xs uppercase tracking-widest text-brand-text-tertiary mb-3">Deploying...</p>
              {/* Progress bar */}
              <div className="h-2 bg-brand-surface-tertiary rounded-full overflow-hidden mb-6">
                <motion.div
                  style={{ width: useTransform(barWidth, (v) => `${v}%`) }}
                  className="h-full bg-brand-orange rounded-full"
                />
              </div>
              {/* Status items */}
              {STATUS_ITEMS.map((item, i) => (
                <motion.div
                  key={item.label}
                  style={{ opacity: useTransform(progress, [item.delay, item.delay + 0.06], [0, 1]) }}
                  className="flex items-center gap-3 py-2"
                >
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                  </div>
                  <span className="text-sm text-brand-text-primary">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Frame 3: Live site */}
          <motion.div style={{ opacity: f3 }} className="absolute inset-0 flex items-center justify-center perspective-container">
            <motion.div
              style={{
                scale: browserScale,
                rotateX: browserRotateX,
                transformStyle: "preserve-3d",
              }}
              className="glass rounded-xl overflow-hidden w-full max-w-sm shadow-2xl"
            >
              <div className="flex items-center gap-2 px-3 py-2 border-b border-brand-border bg-white/80">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                  <div className="w-2 h-2 rounded-full bg-yellow-400" />
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 bg-brand-surface-tertiary rounded-md px-3 py-1 text-[10px] text-brand-text-tertiary text-center">
                  client-store.com
                </div>
                <span className="text-[9px] uppercase tracking-wider bg-green-500 text-white px-2 py-0.5 rounded-full font-medium">
                  Live
                </span>
              </div>
              <div className="p-4 space-y-2 bg-white/60">
                <div className="h-10 bg-brand-orange/10 rounded-md flex items-center px-3">
                  <span className="text-[10px] font-medium text-brand-orange">My Store</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="h-20 bg-brand-surface-tertiary rounded-md" />
                  <div className="h-20 bg-brand-surface-tertiary rounded-md" />
                  <div className="h-20 bg-brand-surface-tertiary rounded-md" />
                </div>
                <div className="h-4 bg-brand-surface-tertiary rounded-md w-1/2" />
                <div className="h-8 bg-brand-orange rounded-md flex items-center justify-center">
                  <span className="text-[9px] text-white font-medium">Add to Cart</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Container>
  );
}

export function ShipStorySection() {
  return (
    <StickyScrollSection height={300} className="gradient-warm">
      {(progress) => <StoryContent progress={progress} />}
    </StickyScrollSection>
  );
}
