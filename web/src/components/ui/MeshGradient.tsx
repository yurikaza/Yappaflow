"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface MeshGradientProps {
  className?: string;
}

export function MeshGradient({ className }: MeshGradientProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {/* Base warm gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-brand-cream to-brand-peach/30" />

      {/* Animated blobs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-brand-orange/15 blur-[120px]"
        animate={{
          x: ["-10%", "15%", "-5%", "-10%"],
          y: ["-15%", "10%", "20%", "-15%"],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: "10%", left: "20%" }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-brand-peach/20 blur-[100px]"
        animate={{
          x: ["10%", "-15%", "5%", "10%"],
          y: ["5%", "-10%", "15%", "5%"],
          scale: [1.1, 0.8, 1.2, 1.1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: "40%", right: "10%" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-brand-orange/10 blur-[100px]"
        animate={{
          x: ["5%", "-10%", "15%", "5%"],
          y: ["10%", "20%", "-5%", "10%"],
          scale: [0.9, 1.15, 1, 0.9],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{ bottom: "5%", left: "40%" }}
      />
    </div>
  );
}
