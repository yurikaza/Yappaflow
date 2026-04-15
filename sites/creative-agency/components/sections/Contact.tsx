"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { MagneticWrapper } from "@/components/ui/MagneticWrapper";
import { Button } from "@/components/ui/Button";

export function Contact() {
  return (
    <section
      id="contact"
      className="section-padding px-[var(--grid-margin)] flex flex-col items-center text-center"
    >
      {/* Label */}
      <RevealOnScroll>
        <p className="text-label mb-8">Get in Touch</p>
      </RevealOnScroll>

      {/* Large statement */}
      <RevealOnScroll delay={0.1}>
        <h2 className="text-display max-w-5xl">
          LET&rsquo;S WORK
          <br />
          TOGETHER
        </h2>
      </RevealOnScroll>

      {/* CTA */}
      <RevealOnScroll delay={0.2} className="mt-12">
        <MagneticWrapper strength={0.25}>
          <Button variant="primary" size="lg" href="mailto:hello@agency.com">
            Start a Project
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="ml-2"
            >
              <path
                d="M1 8h14M9 2l6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </MagneticWrapper>
      </RevealOnScroll>

      {/* Email */}
      <RevealOnScroll delay={0.3} className="mt-8">
        <a
          href="mailto:hello@agency.com"
          className="text-[var(--color-text-muted)] text-[var(--text-small)] hover:text-[var(--color-accent)] transition-colors duration-300"
        >
          hello@agency.com
        </a>
      </RevealOnScroll>
    </section>
  );
}
