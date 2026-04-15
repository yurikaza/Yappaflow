"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { use3DTilt } from "@/lib/hooks/use3DTilt";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

export function TiltCard({ children, className, maxTilt = 6 }: TiltCardProps) {
  const { ref, style, handlers } = use3DTilt(maxTilt);

  return (
    <div className="perspective-container">
      <motion.div
        ref={ref}
        style={style}
        {...handlers}
        className={cn("glass rounded-2xl p-6 shadow-xl transition-shadow hover:shadow-2xl", className)}
      >
        {children}
      </motion.div>
    </div>
  );
}
