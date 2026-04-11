"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { API_REQUEST_EXAMPLE, API_RESPONSE_EXAMPLE } from "@/lib/constants";

export function ApiSection() {
  const t = useTranslations("api");
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  const codeRotateY = useTransform(scrollYProgress, [0, 1], [-8, 0]);
  const codeX = useTransform(scrollYProgress, [0, 1], [60, 0]);

  return (
    <section ref={sectionRef} id="api" className="py-24 sm:py-32">
      <Container>
        <div className="grid gap-16 lg:grid-cols-2 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-32"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-brand-orange mb-4">For Developers</p>
            <h2 className="font-heading text-4xl uppercase tracking-tight text-brand-text-primary sm:text-5xl">
              {t("headline")}
            </h2>
            <p className="mt-6 text-brand-text-secondary leading-relaxed">
              {t("description")}
            </p>
            <Button href="#" variant="link" className="mt-6" arrow>
              {t("learnMore")}
            </Button>
          </motion.div>

          <motion.div
            style={{
              rotateY: codeRotateY,
              x: codeX,
              transformStyle: "preserve-3d",
            }}
            className="space-y-4 perspective-container"
          >
            <CodeBlock code={API_REQUEST_EXAMPLE} title="Request" />
            <CodeBlock code={API_RESPONSE_EXAMPLE} title="Response" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
