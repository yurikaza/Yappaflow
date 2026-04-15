"use client";

import { cn } from "@/lib/cn";
import {
  ShoppingBag,
  Globe,
  Layout,
  Store,
  Server,
} from "lucide-react";

const logos = [
  { name: "Shopify", Icon: ShoppingBag },
  { name: "WordPress", Icon: Globe },
  { name: "Webflow", Icon: Layout },
  { name: "IKAS", Icon: Store },
  { name: "Hostinger", Icon: Server },
];

interface SlidingIconStripProps {
  label?: string;
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
}

export function SlidingIconStrip({
  label,
  speed = 30,
  direction = "left",
  pauseOnHover = true,
  className,
}: SlidingIconStripProps) {
  const items = [...logos, ...logos, ...logos, ...logos];

  return (
    <div className={cn("overflow-hidden", className)}>
      {label && (
        <p className="mb-6 text-center text-sm text-brand-text-tertiary">{label}</p>
      )}
      <div
        className={cn(
          "flex w-max gap-12",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: direction === "right" ? "reverse" : "normal",
        }}
      >
        {items.map(({ name, Icon }, i) => (
          <div
            key={`${name}-${i}`}
            className="flex items-center gap-2 text-brand-text-tertiary transition-colors hover:text-brand-text-secondary shrink-0"
          >
            <Icon className="h-5 w-5" />
            <span className="text-sm font-semibold tracking-wide">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
