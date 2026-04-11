"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { cn } from "@/lib/cn";

interface SplitTextProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  /** "fade" = opacity 0→1, "slide" = slide up + fade, "color" = color reveal */
  animation?: "fade" | "slide" | "color";
  /** Stagger delay between characters in seconds */
  stagger?: number;
  /** Start/end scroll offsets */
  scrollStart?: string;
  scrollEnd?: string;
}

function AnimatedChar({
  char,
  index,
  total,
  progress,
  animation,
}: {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  animation: "fade" | "slide" | "color";
}) {
  const start = index / total;
  const end = Math.min((index + 1) / total + 0.1, 1);

  const opacity = useTransform(progress, [start, end], [0.15, 1]);
  const y = useTransform(progress, [start, end], [animation === "slide" ? 20 : 0, 0]);
  const color = useTransform(
    progress,
    [start, end],
    animation === "color"
      ? ["rgba(26,26,26,0.15)", "rgba(26,26,26,1)"]
      : ["inherit", "inherit"]
  );

  return (
    <motion.span
      style={{
        opacity: animation === "color" ? 1 : opacity,
        y: animation === "slide" ? y : 0,
        color: animation === "color" ? color : undefined,
        display: "inline-block",
        whiteSpace: char === " " ? "pre" : "normal",
      }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}

export function SplitText({
  children,
  className,
  as: Tag = "h2",
  animation = "fade",
  scrollStart = "start 80%",
  scrollEnd = "end 20%",
}: SplitTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [scrollStart as any, scrollEnd as any],
  });

  const chars = children.split("");

  return (
    <Tag ref={ref as any} className={cn("overflow-hidden", className)}>
      {chars.map((char, i) => (
        <AnimatedChar
          key={`${char}-${i}`}
          char={char}
          index={i}
          total={chars.length}
          progress={scrollYProgress}
          animation={animation}
        />
      ))}
    </Tag>
  );
}
