"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/cn";

interface HorizontalScrollSectionProps {
  children: React.ReactNode;
  className?: string;
  /** How many viewport widths of horizontal content */
  contentWidth?: number;
}

export function HorizontalScrollSection({
  children,
  className,
  contentWidth = 3,
}: HorizontalScrollSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${((contentWidth - 1) / contentWidth) * 100}%`]
  );

  return (
    <div
      ref={containerRef}
      className={cn("relative", className)}
      style={{ height: `${contentWidth * 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div
          style={{ x }}
          className="flex"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
