"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
}

const variants = {
  primary:
    "bg-[var(--color-accent)] text-[#fafaf9] hover:bg-[var(--color-accent-hover)]",
  outline:
    "border border-[var(--color-text)] text-[var(--color-text)] hover:bg-[var(--color-text)] hover:text-[var(--color-bg)]",
  ghost:
    "text-[var(--color-text)] hover:text-[var(--color-accent)]",
};

const sizes = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-8 py-3.5 text-base",
  lg: "px-10 py-4.5 text-lg",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2",
    "font-[family-name:var(--font-display)] font-medium tracking-wide",
    "rounded-full transition-colors",
    "cursor-pointer select-none",
    variants[variant],
    sizes[size],
    className
  );

  const easeExpo = [0.16, 1, 0.3, 1] as const;

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.3, ease: easeExpo }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={classes}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: easeExpo }}
    >
      {children}
    </motion.button>
  );
}
