"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/cn";

interface ViewportSectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  fadeDirection?: "up" | "down" | "none";
  snap?: boolean;
}

export function ViewportSection({
  id,
  className,
  children,
  fadeDirection = "up",
  snap = true,
}: ViewportSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const yOffset = fadeDirection === "up" ? 40 : fadeDirection === "down" ? -40 : 0;

  return (
    <div
      id={id}
      ref={ref}
      className={cn(
        snap && "scroll-snap-section",
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: yOffset }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
