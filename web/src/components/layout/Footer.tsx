import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const t = useTranslations("footer");

  const links = [
    { label: "GITHUB", href: "#" },
    { label: "X", href: "#" },
    { label: "LINKEDIN", href: "#" },
    { label: t("contact").toUpperCase(), href: "#" },
    { label: "YAPPAFLOW.COM", href: "#" },
  ];

  return (
    <footer className="py-6 bg-brand-surface-secondary text-brand-text-primary border-t border-brand-border">
      <Container>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Links row */}
          <div className="flex flex-wrap gap-6">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[11px] uppercase tracking-widest text-brand-text-tertiary transition-colors hover:text-brand-text-primary"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-[11px] uppercase tracking-widest text-brand-text-tertiary">
            {t("copyright")}
          </p>
        </div>
      </Container>
    </footer>
  );
}
