import { cn } from "@/lib/cn";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "active";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wider transition-colors",
        variant === "active"
          ? "bg-brand-orange text-white"
          : "border border-brand-border-strong text-brand-text-secondary hover:text-brand-orange hover:border-brand-orange",
        className
      )}
    >
      {children}
    </span>
  );
}
