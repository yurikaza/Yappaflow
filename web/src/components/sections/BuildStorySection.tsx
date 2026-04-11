"use client";

import { useTranslations } from "next-intl";
import { motion, useTransform, MotionValue } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { StickyScrollSection } from "@/components/ui/StickyScrollSection";

const COMPONENTS = [
  { name: "Header", color: "bg-brand-orange/20 border-brand-orange/30" },
  { name: "ProductGrid", color: "bg-blue-50 border-blue-200" },
  { name: "CartSidebar", color: "bg-green-50 border-green-200" },
  { name: "Footer", color: "bg-purple-50 border-purple-200" },
];

function StoryContent({ progress }: { progress: MotionValue<number> }) {
  const t = useTranslations("features");

  const textOpacity = useTransform(progress, [0, 0.12], [0, 1]);
  const textY = useTransform(progress, [0, 0.12], [40, 0]);

  const f1 = useTransform(progress, [0.05, 0.15, 0.3, 0.35], [0, 1, 1, 0]);
  const f2 = useTransform(progress, [0.3, 0.4, 0.6, 0.65], [0, 1, 1, 0]);
  const f3 = useTransform(progress, [0.6, 0.7, 0.95, 1], [0, 1, 1, 0.8]);

  // Code typing
  const codeReveal = useTransform(progress, [0.08, 0.3], [0, 1]);

  // Component scatter
  const scatter = useTransform(progress, [0.35, 0.55], [0, 1]);

  // Assembly
  const assemble = useTransform(progress, [0.65, 0.9], [0, 1]);

  return (
    <Container>
      <div className="grid gap-12 lg:grid-cols-2 items-center min-h-[80vh]">
        <motion.div style={{ opacity: textOpacity, y: textY }}>
          <p className="text-xs uppercase tracking-[0.3em] text-brand-orange mb-4">02 / Build</p>
          <h2 className="font-heading text-4xl uppercase tracking-tight sm:text-5xl lg:text-6xl text-brand-text-primary">
            {t("buildTitle")}
          </h2>
          <p className="mt-6 text-brand-text-secondary leading-relaxed max-w-md">
            {t("buildDesc")}
          </p>
        </motion.div>

        <div className="relative h-[400px]">
          {/* Frame 1: Code typing */}
          <motion.div style={{ opacity: f1 }} className="absolute inset-0 flex items-center justify-center">
            <motion.div className="bg-[#1A1A1A] rounded-xl p-5 w-full max-w-sm font-mono text-xs leading-loose overflow-hidden">
              <div className="flex gap-1.5 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
              </div>
              <motion.div style={{ opacity: codeReveal }}>
                <span className="text-brand-orange">import</span> <span className="text-white">{"{ Store }"}</span> <span className="text-brand-orange">from</span> <span className="text-green-400">{`'./store'`}</span>
                <br />
                <span className="text-brand-orange">import</span> <span className="text-white">{"{ Theme }"}</span> <span className="text-brand-orange">from</span> <span className="text-green-400">{`'./theme'`}</span>
                <br /><br />
                <span className="text-purple-400">export default</span> <span className="text-blue-400">function</span> <span className="text-white">{"App() {"}</span>
                <br />
                <span className="text-white/50 pl-4">{"return <Store theme={Theme.dark} />"}</span>
                <br />
                <span className="text-white">{"}"}</span>
              </motion.div>
              <motion.div
                className="w-0.5 h-4 bg-white inline-block ml-1"
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
              />
            </motion.div>
          </motion.div>

          {/* Frame 2: Components scatter */}
          <motion.div style={{ opacity: f2 }} className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full max-w-sm h-[300px]">
              {COMPONENTS.map((comp, i) => {
                const angle = (i / COMPONENTS.length) * Math.PI * 2;
                const radius = 100;
                return (
                  <motion.div
                    key={comp.name}
                    style={{
                      x: useTransform(scatter, [0, 1], [0, Math.cos(angle) * radius]),
                      y: useTransform(scatter, [0, 1], [0, Math.sin(angle) * radius]),
                      scale: useTransform(scatter, [0, 0.5, 1], [0.5, 1, 1]),
                    }}
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass rounded-xl px-4 py-3 border ${comp.color}`}
                  >
                    <span className="text-xs font-mono font-medium text-brand-text-primary">{`<${comp.name} />`}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Frame 3: Browser mockup assembly */}
          <motion.div style={{ opacity: f3 }} className="absolute inset-0 flex items-center justify-center">
            <motion.div
              style={{ scale: useTransform(assemble, [0, 1], [0.85, 1]) }}
              className="glass rounded-xl overflow-hidden w-full max-w-sm shadow-2xl"
            >
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-3 py-2 border-b border-brand-border bg-white/80">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                  <div className="w-2 h-2 rounded-full bg-yellow-400" />
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 bg-brand-surface-tertiary rounded-md px-3 py-1 text-[10px] text-brand-text-tertiary text-center">
                  client-store.com
                </div>
              </div>
              {/* Page content mockup */}
              <div className="p-4 space-y-2 bg-white/60">
                <div className="h-8 bg-brand-orange/10 rounded-md" />
                <div className="grid grid-cols-3 gap-2">
                  <div className="h-16 bg-brand-surface-tertiary rounded-md" />
                  <div className="h-16 bg-brand-surface-tertiary rounded-md" />
                  <div className="h-16 bg-brand-surface-tertiary rounded-md" />
                </div>
                <div className="h-6 bg-brand-surface-tertiary rounded-md w-2/3" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Container>
  );
}

export function BuildStorySection() {
  return (
    <StickyScrollSection height={300} className="bg-brand-surface-secondary">
      {(progress) => <StoryContent progress={progress} />}
    </StickyScrollSection>
  );
}
