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

interface LogoBarProps {
  label?: string;
  className?: string;
}

export function LogoBar({ label, className }: LogoBarProps) {
  return (
    <div className={cn("text-center", className)}>
      {label && (
        <p className="mb-6 text-sm text-brand-text-tertiary">{label}</p>
      )}
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
        {logos.map(({ name, Icon }) => (
          <div
            key={name}
            className="flex items-center gap-2 text-brand-text-tertiary transition-colors hover:text-brand-text-secondary"
          >
            <Icon className="h-5 w-5" />
            <span className="text-sm font-semibold tracking-wide">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
