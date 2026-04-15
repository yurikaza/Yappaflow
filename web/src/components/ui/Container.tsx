import React from "react";
import { cn } from "@/lib/cn";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function Container({
  children,
  className,
  as = "div",
}: ContainerProps) {
  return React.createElement(as, { className: cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", className) }, children);
}
