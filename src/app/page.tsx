import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { WhyUs } from "@/components/sections/WhyUs";
import { TeamPreview } from "@/components/sections/TeamPreview";
import { Testimonials } from "@/components/sections/Testimonials";
import { InsuranceBar } from "@/components/sections/InsuranceBar";
import { LocationHours } from "@/components/sections/LocationHours";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/constants";

export const metadata = createPageMetadata({
  title: `${siteConfig.name} | Dentist in ${siteConfig.city}, ${siteConfig.state}`,
  description: siteConfig.description,
  path: "/",
});

export default function HomePage() {
  return (
    <main id="main-content">
      <Hero />
      <TrustBar />
      <ServicesGrid />
      <WhyUs />
      <TeamPreview />
      <Testimonials />
      <InsuranceBar />
      <LocationHours />
      <FinalCTA />
    </main>
  );
}
