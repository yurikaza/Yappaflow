"use client";

import { useTranslations } from "next-intl";
import { Zap } from "lucide-react";
import { Hero115 } from "@/components/ui/Hero115";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <Hero115
      heading={`${t("headline")} ${t("headlineAccent")}`}
      description={t("description")}
      button={{
        text: t("cta"),
        icon: <Zap className="ml-2 size-4" />,
        url: "#cta",
      }}
      trustText={t("trustedBy")}
    />
  );
}
