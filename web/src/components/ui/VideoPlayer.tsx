"use client";

import { cn } from "@/lib/cn";
import { Play } from "lucide-react";

interface VideoPlayerProps {
  className?: string;
}

export function VideoPlayer({ className }: VideoPlayerProps) {
  return (
    <div
      className={cn(
        "relative aspect-video w-full rounded-2xl overflow-hidden cursor-pointer group shadow-2xl",
        className
      )}
    >
      {/* Warm gradient bg */}
      <div className="absolute inset-0 gradient-warm" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(26,26,26,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(26,26,26,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-orange text-white shadow-lg shadow-brand-orange/30 transition-transform group-hover:scale-110">
          <Play className="h-5 w-5 ml-0.5" fill="currentColor" />
        </div>
      </div>
    </div>
  );
}
