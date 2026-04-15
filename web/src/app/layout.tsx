import type { Metadata } from "next";
import { inter, anton, jetbrainsMono } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yappaflow",
  description:
    "AI-powered SaaS platform that automates the entire web development pipeline — from client discovery to deployment.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${inter.variable} ${anton.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-brand-dark text-white antialiased">
        {children}
      </body>
    </html>
  );
}
