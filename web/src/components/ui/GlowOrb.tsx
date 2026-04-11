"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface GlowOrbProps {
  color?: "orange" | "purple" | "blue";
  size?: number;
  position?: { top?: string; left?: string; right?: string; bottom?: string };
  animate?: boolean;
  className?: string;
}

const colors = {
  orange: "bg-brand-orange/15",
  purple: "bg-brand-purple/12",
  blue: "bg-brand-blue/10",
};

export function GlowOrb({
  color = "orange",
  size = 400,
  position = {},
  animate = true,
  className,
}: GlowOrbProps) {
  const style = {
    width: size,
    height: size,
    ...position,
  };

  if (!animate) {
    return (
      <div
        className={cn(
          "absolute rounded-full blur-[120px] pointer-events-none",
          colors[color],
          className
        )}
        style={style}
      />
    );
  }

  return (
    <motion.div
      className={cn(
        "absolute rounded-full blur-[120px] pointer-events-none",
        colors[color],
        className
      )}
      style={style}
      animate={{
        x: [0, 15, -10, 0],
        y: [0, -20, 10, 0],
        opacity: [0.5, 0.8, 0.4, 0.5],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
    />
  );
}
