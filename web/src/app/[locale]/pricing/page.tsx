"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";

const TIERS = [
  {
    name: "Starter",
    desc: "For solo agencies getting started",
    monthly: 49,
    annual: 39,
    features: [
      "5 active projects",
      "WhatsApp + Instagram listening",
      "Shopify & WordPress deploy",
      "Basic AI code generation",
      "Email support",
      "1 team member",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Growth",
    desc: "For growing agencies scaling fast",
    monthly: 149,
    annual: 119,
    features: [
      "25 active projects",
      "All messaging platforms",
      "All CMS platforms (6+)",
      "Advanced AI code generation",
      "Priority support",
      "Custom domains",
      "API access",
      "5 team members",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Scale",
    desc: "For enterprise agencies",
    monthly: null,
    annual: null,
    features: [
      "Unlimited projects",
      "Dedicated infrastructure",
      "Custom integrations",
      "SLA guarantee",
      "Dedicated account manager",
      "On-premise option",
      "Unlimited team members",
      "White-label support",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const FAQ = [
  { q: "Can I switch plans anytime?", a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and billing is prorated." },
  { q: "What happens after the free trial?", a: "After 14 days, you'll be asked to choose a plan. No charge during the trial. Cancel anytime." },
  { q: "Do you offer refunds?", a: "We offer a 30-day money-back guarantee on all paid plans. No questions asked." },
  { q: "Is there a setup fee?", a: "No setup fees, no hidden costs. The price you see is the price you pay." },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-brand-dark text-white">
      {/* Atmosphere */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-brand-orange/[0.025] blur-[200px]" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC44IiBudW1PY3RhdmVzPSI0IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNuKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==")`,
            backgroundRepeat: "repeat",
          }}
        />
      </div>

      {/* Nav back */}
      <div className="relative z-10 px-6 py-6">
        <a href="/" className="font-heading text-lg uppercase tracking-tight text-white hover:text-brand-orange transition-colors">
          Yappaflow
        </a>
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pb-32">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center pt-16 sm:pt-24 mb-16">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
            className="text-[10px] uppercase tracking-[0.5em] text-brand-orange/60 mb-6">
            Pricing
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight leading-[0.95]">
            Simple pricing<br />
            <span className="text-brand-orange">for growing agencies</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="mt-6 text-sm text-white/30 max-w-md mx-auto">
            Start free for 14 days. No credit card required. Scale as your agency grows.
          </motion.p>

          {/* Annual/Monthly toggle */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="mt-8 flex items-center justify-center gap-3">
            <span className={`text-xs uppercase tracking-wider ${!annual ? "text-white" : "text-white/25"}`}>Monthly</span>
            <button onClick={() => setAnnual(!annual)}
              className={`w-12 h-6 rounded-full flex items-center px-0.5 transition-colors ${annual ? "bg-brand-orange" : "bg-white/10"}`}>
              <div className={`w-5 h-5 rounded-full bg-white transition-transform ${annual ? "translate-x-6" : "translate-x-0"}`} />
            </button>
            <span className={`text-xs uppercase tracking-wider ${annual ? "text-white" : "text-white/25"}`}>
              Annual <span className="text-brand-orange text-[10px]">-20%</span>
            </span>
          </motion.div>
        </div>

        {/* Tier cards */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className={`rounded-xl p-6 sm:p-8 flex flex-col ${
                tier.popular
                  ? "bg-[#111114] border-2 border-brand-orange/30 relative"
                  : "bg-[#0c0c0f] border border-white/[0.06]"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-orange text-white text-[9px] uppercase tracking-widest px-4 py-1 rounded-full font-medium">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-heading text-xl uppercase tracking-tight text-white">{tier.name}</h3>
                <p className="text-xs text-white/25 mt-1">{tier.desc}</p>
              </div>

              <div className="mb-6">
                {tier.monthly ? (
                  <div className="flex items-baseline gap-1">
                    <span className="font-heading text-5xl text-white">${annual ? tier.annual : tier.monthly}</span>
                    <span className="text-xs text-white/25">/mo</span>
                  </div>
                ) : (
                  <span className="font-heading text-3xl text-white">Custom</span>
                )}
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {tier.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5 text-xs text-white/40">
                    <Check className="h-3.5 w-3.5 text-brand-orange shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <a href={tier.monthly ? "#" : "mailto:hello@yappaflow.com"}
                className={`flex items-center justify-center gap-2 py-3.5 rounded-lg text-xs uppercase tracking-widest font-medium transition-colors ${
                  tier.popular
                    ? "bg-brand-orange text-white hover:bg-brand-orange-dark"
                    : "bg-white/[0.04] text-white/60 border border-white/[0.06] hover:bg-white/[0.08] hover:text-white"
                }`}>
                {tier.cta}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </motion.div>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto mt-24">
          <h2 className="font-heading text-2xl uppercase tracking-tight text-white text-center mb-10">
            Frequently asked
          </h2>
          <div className="space-y-2">
            {FAQ.map((faq, i) => (
              <div key={i} className="border border-white/[0.04] rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/[0.02] transition-colors"
                >
                  <span className="text-sm text-white/70">{faq.q}</span>
                  <span className="text-white/20 text-lg">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4">
                    <p className="text-xs text-white/30 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="max-w-2xl mx-auto mt-20 text-center">
          <p className="text-[10px] uppercase tracking-widest text-white/15">
            No credit card required · Free for 14 days · Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
}
