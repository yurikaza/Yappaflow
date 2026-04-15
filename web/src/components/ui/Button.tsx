"use client";

import { cn } from "@/lib/cn";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  className?: string;
  href?: string;
  onClick?: () => void;
  arrow?: boolean;
}

const variants = {
  primary: "bg-brand-orange text-white hover:bg-brand-orange-dark shadow-lg shadow-brand-orange/20",
  outline: "border border-brand-border-strong text-brand-text-primary hover:border-brand-orange hover:text-brand-orange",
  ghost: "text-brand-text-secondary hover:text-brand-text-primary",
  link: "text-brand-text-secondary hover:text-brand-orange underline underline-offset-4 decoration-brand-orange/30 hover:decoration-brand-orange px-0 py-0",
};

const sizes = {
  sm: "px-5 py-2 text-xs",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3 text-sm",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  href,
  onClick,
  arrow = false,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center gap-2 font-medium transition-all duration-300 cursor-pointer",
    variant !== "link" && "rounded-full uppercase tracking-wider",
    variants[variant],
    variant !== "link" && sizes[size],
    className
  );

  const content = (
    <>
      {children}
      {arrow && <ArrowRight className="h-3.5 w-3.5" />}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: variant === "link" ? 1 : 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={classes}
      onClick={onClick}
      whileHover={{ scale: variant === "link" ? 1 : 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.button>
  );
}
