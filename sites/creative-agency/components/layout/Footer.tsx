import { cn } from "@/lib/utils";

const socialLinks = [
  { label: "Twitter", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] px-[var(--grid-margin)] py-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Copyright */}
        <p className="text-[var(--text-xs)] text-[var(--color-text-dim)]">
          &copy; 2026 Creative Agency. All rights reserved.
        </p>

        {/* Social links */}
        <div className="flex items-center gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={cn(
                "text-[var(--text-xs)] text-[var(--color-text-dim)]",
                "hover:text-[var(--color-text)] transition-colors duration-300",
                "[transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
              )}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
