"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Globe,
  Layout,
  Store,
  Globe2,
  Server,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { TiltCard } from "@/components/ui/TiltCard";

const categories = ["cms", "hosting", "messaging"] as const;

const integrations = [
  { key: "shopify", Icon: ShoppingBag, category: "cms" },
  { key: "wordpress", Icon: Globe, category: "cms" },
  { key: "webflow", Icon: Layout, category: "cms" },
  { key: "ikas", Icon: Store, category: "cms" },
  { key: "namecheap", Icon: Globe2, category: "hosting" },
  { key: "hostinger", Icon: Server, category: "hosting" },
];

export function IntegrationGrid() {
  const t = useTranslations("integrations");
  const [activeCategory, setActiveCategory] = useState<string>("cms");

  const filtered = integrations.filter(
    (item) => item.category === activeCategory
  );

  return (
    <section id="integrations" className="py-24 sm:py-32 bg-brand-surface-secondary">
      <Container>
        <div className="grid gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-4xl uppercase tracking-tight text-brand-text-primary sm:text-5xl lg:text-6xl">
              {t("headline")}
            </h2>
            <p className="mt-6 text-brand-text-secondary leading-relaxed">
              {t("description")}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat)}>
                  <Badge variant={activeCategory === cat ? "active" : "default"}>
                    {t(cat)}
                  </Badge>
                </button>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {filtered.map(({ key, Icon }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <TiltCard className="h-full" maxTilt={4}>
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-orange/10">
                      <Icon className="h-5 w-5 text-brand-orange" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="font-medium text-brand-text-primary">{t(key)}</h4>
                      <p className="mt-1 text-xs text-brand-text-secondary">{t(`${key}Desc`)}</p>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
