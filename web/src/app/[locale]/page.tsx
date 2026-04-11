import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { WhySection } from "@/components/sections/WhySection";
import { ScrollTextReveal } from "@/components/sections/ScrollTextReveal";
import { AboutSection } from "@/components/sections/AboutSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { ShowcaseList } from "@/components/sections/ShowcaseList";
import { CtaSection } from "@/components/sections/CtaSection";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Dark sections */}
        <HeroSection />
        <WhySection />
        <ScrollTextReveal />

        {/* Light sections — ScrollTextReveal fades to white matching this bg */}
        <AboutSection />
        <FeaturesSection />
        <ShowcaseList />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
