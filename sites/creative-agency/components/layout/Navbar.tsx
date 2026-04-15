"use client";

import { motion } from "framer-motion";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[var(--grid-margin)] py-6 mix-blend-difference text-white"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Logo */}
      <a
        href="/"
        className="font-[family-name:var(--font-display)] text-sm font-medium tracking-[0.1em] uppercase"
      >
        Creative Agency
      </a>

      {/* Links */}
      <div className="flex items-center gap-8">
        {navLinks.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            className="relative text-sm font-medium tracking-wide group"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.7 + i * 0.05,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {link.label}
            <span className="absolute bottom-0 left-0 w-full h-px bg-current scale-x-0 origin-right transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-hover:origin-left" />
          </motion.a>
        ))}
      </div>
    </motion.nav>
  );
}
