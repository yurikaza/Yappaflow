import { cn } from "@/lib/cn";

interface GradientBackgroundProps {
  children: React.ReactNode;
  variant?: "warm" | "cool";
  className?: string;
}

export function GradientBackground({
  children,
  className,
}: GradientBackgroundProps) {
  return (
    <div className={cn("relative overflow-hidden bg-black", className)}>
      {children}
    </div>
  );
}
