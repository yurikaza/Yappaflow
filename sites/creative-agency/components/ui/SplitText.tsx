"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

interface SplitTextProps {
  text: string;
  className?: string;
  stagger?: number;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function SplitText({
  text,
  className,
  stagger = 0.08,
  delay = 0.2,
  as: Tag = "h1",
}: SplitTextProps) {
  const words = text.split(" ");

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: {
      y: "110%",
      opacity: 0,
    },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: EASE_EXPO,
      },
    },
  };

  return (
    <motion.div
      className={cn(className)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      aria-label={text}
    >
      <Tag className="sr-only">{text}</Tag>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden"
          aria-hidden="true"
        >
          <motion.span className="inline-block" variants={wordVariants}>
            {word}
          </motion.span>
          {i < words.length - 1 && (
            <span className="inline-block w-[0.3em]" />
          )}
        </span>
      ))}
    </motion.div>
  );
}
