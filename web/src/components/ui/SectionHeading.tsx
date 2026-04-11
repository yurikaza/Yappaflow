import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      <h2 className="font-heading text-4xl uppercase tracking-tight text-brand-text-primary sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          "mt-6 max-w-2xl text-base text-brand-text-secondary leading-relaxed sm:text-lg",
          align === "center" && "mx-auto"
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
