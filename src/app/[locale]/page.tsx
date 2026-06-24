import { setRequestLocale } from "next-intl/server";
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
import { heroBackgroundImage } from "@/lib/hero-assets";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HomePageProps) {
  const { locale } = await params;
  return createPageMetadata({
    locale,
    titleKey: "homeTitle",
    descriptionKey: "homeDescription",
    path: "/",
  });
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main id="main-content">
      <link rel="preload" as="image" href={heroBackgroundImage} />
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
