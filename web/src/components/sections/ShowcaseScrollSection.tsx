"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Globe,
  Layout,
  Store,
  Server,
  MessageCircle,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { HorizontalScrollSection } from "@/components/ui/HorizontalScrollSection";
import { SplitText } from "@/components/ui/SplitText";

const BRANDS = [
  { name: "Shopify", Icon: ShoppingBag, desc: "E-commerce storefronts" },
  { name: "WordPress", Icon: Globe, desc: "Full-stack sites" },
  { name: "Webflow", Icon: Layout, desc: "Responsive projects" },
  { name: "IKAS", Icon: Store, desc: "Turkish market" },
  { name: "Hostinger", Icon: Server, desc: "Custom deploys" },
  { name: "WhatsApp", Icon: MessageCircle, desc: "Client intake" },
];

export function ShowcaseScrollSection() {
  const t = useTranslations("integrations");

  return (
    <HorizontalScrollSection contentWidth={3} className="bg-brand-surface-secondary">
      {/* Panel 1: Title */}
      <div className="flex items-center justify-center w-screen h-screen shrink-0 px-8">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-orange mb-4">Ecosystem</p>
          <SplitText
            as="h2"
            animation="color"
            className="font-heading text-5xl uppercase tracking-tight text-brand-text-primary sm:text-6xl lg:text-7xl"
          >
            {t("headline")}
          </SplitText>
          <p className="mt-6 text-brand-text-secondary leading-relaxed max-w-md">
            {t("description")}
          </p>
        </div>
      </div>

      {/* Panel 2-3: Brand Cards */}
      <div className="flex items-center gap-8 px-8 shrink-0">
        {BRANDS.map(({ name, Icon, desc }, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="glass rounded-2xl p-8 w-[320px] h-[280px] shrink-0 flex flex-col justify-between group hover:shadow-xl transition-shadow"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center mb-6">
                <Icon className="h-6 w-6 text-brand-orange" strokeWidth={1.5} />
              </div>
              <h3 className="font-heading text-2xl uppercase tracking-tight text-brand-text-primary">
                {name}
              </h3>
              <p className="mt-2 text-sm text-brand-text-secondary">{desc}</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-brand-orange uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
              Explore <span>&rarr;</span>
            </div>
          </motion.div>
        ))}
      </div>
    </HorizontalScrollSection>
  );
}
