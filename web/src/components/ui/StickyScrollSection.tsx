"use client";

import { useRef } from "react";
import { useScroll, MotionValue } from "framer-motion";
import { cn } from "@/lib/cn";

interface StickyScrollSectionProps {
  children: (progress: MotionValue<number>) => React.ReactNode;
  height?: number;
  className?: string;
}

export function StickyScrollSection({
  children,
  height = 300,
  className,
}: StickyScrollSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={containerRef}
      className={cn("relative", className)}
      style={{ height: `${height}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {children(scrollYProgress)}
      </div>
    </div>
  );
}
