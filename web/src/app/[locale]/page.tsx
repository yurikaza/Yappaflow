import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { HeroSection } from "@/components/sections/HeroSection";
import { DashboardJourney } from "@/components/sections/DashboardJourney";
import { IntegrationsSection } from "@/components/sections/IntegrationsSection";
import { VideoSection } from "@/components/sections/VideoSection";
import { ManifestoSection } from "@/components/sections/ManifestoSection";
import { CtaSection } from "@/components/sections/CtaSection";

export default function LandingPage() {
  return (
    <SmoothScroll>
      <Navbar />
      <main>
        <HeroSection />
        <DashboardJourney />
        <IntegrationsSection />
        <VideoSection />
        <ManifestoSection />
        <CtaSection />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
