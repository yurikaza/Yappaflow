import { cn } from "@/lib/cn";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  variant?: "default" | "glass";
  glow?: boolean;
}

export function Card({ children, className, hover = false, variant = "default" }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl p-6",
        variant === "default" && "border border-brand-border bg-white",
        variant === "glass" && "glass rounded-2xl shadow-lg",
        hover && "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
        className
      )}
    >
      {children}
    </div>
  );
}
