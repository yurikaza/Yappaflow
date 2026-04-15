"use client";

import { createContext, useContext } from "react";
import { useScroll, MotionValue } from "framer-motion";

interface ScrollContextValue {
  scrollYProgress: MotionValue<number>;
}

const ScrollContext = createContext<ScrollContextValue | null>(null);

export function ScrollAnimationProvider({ children }: { children: React.ReactNode }) {
  const { scrollYProgress } = useScroll();
  return (
    <ScrollContext.Provider value={{ scrollYProgress }}>
      {children}
    </ScrollContext.Provider>
  );
}

export function usePageScroll() {
  const ctx = useContext(ScrollContext);
  if (!ctx) throw new Error("usePageScroll must be used within ScrollAnimationProvider");
  return ctx;
}
