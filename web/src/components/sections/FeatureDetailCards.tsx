"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Instagram,
  ShoppingBag,
  Globe,
  Layout,
  Store,
  Server,
  Globe2,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const integrations = [
  { name: "WhatsApp", Icon: MessageCircle },
  { name: "Instagram", Icon: Instagram },
  { name: "Shopify", Icon: ShoppingBag },
  { name: "WordPress", Icon: Globe },
  { name: "Webflow", Icon: Layout },
  { name: "IKAS", Icon: Store },
  { name: "Namecheap", Icon: Globe2 },
  { name: "Hostinger", Icon: Server },
];

export function FeatureDetailCards() {
  const t = useTranslations("detail");

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="grid gap-16 lg:grid-cols-2 items-center"
        >
          <div>
            <h2 className="font-heading text-4xl uppercase tracking-tight text-brand-text-primary sm:text-5xl lg:text-6xl">
              {t("headline")}
            </h2>
            <p className="mt-6 text-brand-text-secondary leading-relaxed">
              {t("description")}
            </p>
            <Button href="#cta" variant="link" className="mt-6" arrow>
              {t("learnMore")}
            </Button>
          </div>

          <div className="grid grid-cols-4 gap-px bg-brand-border rounded-2xl overflow-hidden shadow-lg">
            {integrations.map(({ name, Icon }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex flex-col items-center gap-2 p-5 bg-white hover:bg-brand-orange/5 transition-colors group"
              >
                <Icon className="h-5 w-5 text-brand-text-tertiary group-hover:text-brand-orange transition-colors" strokeWidth={1.5} />
                <span className="text-[10px] uppercase tracking-widest text-brand-text-tertiary group-hover:text-brand-orange transition-colors">{name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
