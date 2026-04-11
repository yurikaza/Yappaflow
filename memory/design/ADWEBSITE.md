# Yappaflow Teaser Site: Art Direction & Build Guide

## 1. Project Context

**Identity:** You are acting as the Lead Frontend Developer for Yappaflow, an upcoming AI-powered web agency SaaS.
**Objective:** Build a high-impact, single-page promotional website (Waitlist/Teaser Page). The product is not fully built yet, so the goal is to sell the _vision_ (AI turning voice calls into deployed code) and capture agency emails.

## 2. Art Direction: "Bold & Unapologetic"

We are abandoning quiet minimalism for something more striking. Our target audience consists of elite web agencies; the design must intimidate them in a good way.

- **Color Palette:** Deep, pure dark mode background (`#0A0A0A` or true black). Text should be stark white or off-white. Use one electric, highly saturated accent color (e.g., Neon Cyan, Electric Indigo, or Acid Yellow) strictly for call-to-action buttons and glowing AI states.
- **Typography:** Oversized, aggressive sans-serif fonts for headings (think _Inter_, _Clash Display_, or _Space Grotesk_). The Hero headline should dominate the screen viewport.
- **Layout Structure:** Utilize asymmetric bento-box grids. Break out of standard containers. Use subtle, 1px borders to create a blueprint-like, highly technical feel.
- **Visual Metaphor:** The design should feel like a high-end terminal or a command center.

## 3. Tech Stack

- **Core:** Next.js (React)
- **Styling:** Tailwind CSS (Focus on custom utility classes for deep shadows and neon glows).
- **Animation Engine:** Framer Motion. Motion is critical here.
- **Waitlist Logic:** EmailJS (or similar serverless endpoint) for instant email capture.

## 4. The User Journey & Core Sections

The page must flow seamlessly through these specific beats:

1.  **The Hero (The Hook):** A massive, bold headline. E.g., _"Stop Coding. Start Talking."_ Below it, a sleek, glowing text-input or fake "voice wave" animation simulating the AI listening. Immediate Email Capture input field right in the hero.
2.  **The "Magic" Showcase (The Proof):** A highly animated section (using Framer Motion) that simulates a split screen: on the left, a chat transcript typing out; on the right, code blocks automatically generating in real-time.
3.  **The Ecosystem Grid (The Features):** A tight, dark bento-grid showing logos of our integrations (Shopify, Webflow, Namecheap, WhatsApp) with minimal text.
4.  **The Footer (The Urgency):** A brutalist, oversized call-to-action to join the waitlist. E.g., _"Early Access is Limited. Secure Your Agency's Spot."_

## 5. Development Directives

When generating components for this site, you must adhere to these Art Director rules:

- **Motion over Static:** Do not build static components. Everything should have an entrance animation (staggered fade-ins, slight upward translations) and rich hover states.
- **Code Quality:** Keep components isolated. Create a separate `Hero.tsx`, `WaitlistForm.tsx`, and `FeatureGrid.tsx`.
- **No Placeholders:** Use compelling, high-end copy in your code generation, not "Lorem Ipsum."

## Immediate Action Required

Acknowledge this Art Direction brief. Confirm you understand the "Bold, Dark, and Technical" aesthetic. Wait for the user to tell you which section to build first (e.g., "Let's build the Hero section").
