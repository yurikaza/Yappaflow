"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function ScrollTextReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const eLetterRef = useRef<HTMLSpanElement>(null);
  const [origin, setOrigin] = useState("50% 50%");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const measure = () => {
      const block = textBlockRef.current;
      const e = eLetterRef.current;
      if (!block || !e) return;
      const blockRect = block.getBoundingClientRect();
      const eRect = e.getBoundingClientRect();
      const x = ((eRect.left + eRect.width / 2 - blockRect.left) / blockRect.width) * 100;
      const y = ((eRect.top + eRect.height / 2 - blockRect.top) / blockRect.height) * 100;
      setOrigin(`${x.toFixed(1)}% ${y.toFixed(1)}%`);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const line1O = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const line2O = useTransform(scrollYProgress, [0.06, 0.15], [0, 1]);
  const line1Y = useTransform(scrollYProgress, [0, 0.1], [40, 0]);
  const line2Y = useTransform(scrollYProgress, [0.06, 0.14], [40, 0]);
  const textScale = useTransform(scrollYProgress, [0.22, 0.85], [1, 80]);
  const otherTextOpacity = useTransform(scrollYProgress, [0.28, 0.42], [1, 0]);
  // Dark bg + stars fade out VERY early — must be fully gone before E zoom is visible
  const darkBgOpacity = useTransform(scrollYProgress, [0.2, 0.32], [1, 0]);
  // The E text (cream colored) fades slightly later after dark is fully gone
  const eTextOpacity = useTransform(scrollYProgress, [0.6, 0.78], [1, 0]);

  const fontSize = "clamp(2.5rem, 8vw, 7rem)";

  return (
    <div ref={containerRef} className="relative" style={{ height: "500vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Layer 0: Cream bg */}
        <div className="absolute inset-0" style={{ background: "#FFF8F2" }} />

        {/* Layer 1: Dark bg + stars — fades out early */}
        <motion.div className="absolute inset-0 z-[1]" style={{ opacity: darkBgOpacity }}>
          <div className="absolute inset-0 bg-brand-dark" />
          {[25, 58, 82, 11, 44, 71, 93, 36].map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-px h-px bg-white/20 rounded-full"
              style={{
                left: `${pos}%`,
                top: `${[35, 72, 18, 56, 89, 42, 14, 67][i]}%`,
              }}
              animate={{ opacity: [0.05, 0.3, 0.05] }}
              transition={{ duration: 4 + (i % 3), repeat: Infinity, delay: (i % 4) * 0.6 }}
            />
          ))}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-brand-orange/5 blur-[160px]" style={{ top: "25%", left: "30%" }} />
        </motion.div>

        {/* Layer 2: SINGLE text block — contains both visible text AND cream E.
            One element = perfect alignment. */}
        <div className="absolute inset-0 flex items-center justify-center z-[10]">
          <motion.div
            ref={textBlockRef}
            className="text-center whitespace-nowrap"
            style={{ scale: textScale, transformOrigin: origin }}
          >
            {/* Line 1 */}
            <div className="font-heading uppercase tracking-tight leading-[0.9]" style={{ fontSize }}>
              <motion.span style={{ opacity: line1O }} className="inline-block">
                <motion.span style={{ y: line1Y, display: "inline-block" }}>
                  <motion.span style={{ opacity: otherTextOpacity }} className="text-white">SO W</motion.span>
                  <motion.span ref={eLetterRef} style={{ color: "#FFF8F2", opacity: eTextOpacity }}>E</motion.span>
                  <motion.span style={{ opacity: otherTextOpacity }} className="text-white">{" BUILT"}</motion.span>
                </motion.span>
              </motion.span>
            </div>

            {/* Line 2 */}
            <motion.div style={{ opacity: otherTextOpacity }} className="font-heading uppercase tracking-tight leading-[0.9]">
              <motion.span style={{ opacity: line2O, y: line2Y, display: "inline-block" }} className="text-brand-orange">
                <span style={{ fontSize }}>Agency Automation</span>
              </motion.span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
