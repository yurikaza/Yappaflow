import type { Metadata } from "next";
import { spaceGrotesk, dmSans } from "@/lib/fonts";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import "./globals.css";

export const metadata: Metadata = {
  title: "Creative Agency — We Create Digital Experiences",
  description:
    "A bold creative agency crafting premium digital experiences through design, strategy, and technology.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
