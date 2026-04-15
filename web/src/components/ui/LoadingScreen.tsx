"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LETTERS = "YAPPAFLOW".split("");

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loading"
          className="fixed inset-0 z-[9999] flex items-center justify-center gradient-warm"
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col items-center">
            {/* Letters */}
            <div className="flex overflow-hidden">
              {LETTERS.map((letter, i) => (
                <motion.span
                  key={i}
                  className="font-heading text-5xl sm:text-7xl text-brand-text-primary uppercase"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Orange underline */}
            <motion.div
              className="h-1 bg-brand-orange rounded-full mt-3"
              initial={{ scaleX: 0, width: "100%" }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "left" }}
            />

            {/* Tagline */}
            <motion.p
              className="mt-4 text-xs uppercase tracking-[0.3em] text-brand-text-tertiary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              From Conversation to Code
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
