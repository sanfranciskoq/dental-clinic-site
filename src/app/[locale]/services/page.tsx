import { setRequestLocale, getTranslations } from "next-intl/server";
import { getServices } from "@/lib/i18n/content";
import { ServicesShowcase } from "@/components/sections/services/ServicesShowcase";
import { Container } from "@/components/layout/Container";
import { CTALink } from "@/components/shared/CTALink";
import { createPageMetadata } from "@/lib/metadata";
import type { Locale } from "@/i18n/routing";

interface ServicesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ServicesPageProps) {
  const { locale } = await params;
  return createPageMetadata({
    locale,
    titleKey: "servicesTitle",
    descriptionKey: "servicesDescription",
    path: "/services",
  });
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tc = await getTranslations("common");
  const services = getServices(locale as Locale);

  return (
    <main id="main-content">
      <ServicesShowcase services={services} variant="page" />

      <section className="border-t border-border bg-card py-12 md:py-16">
        <Container>
          <div className="mx-auto max-w-2xl rounded-2xl border border-primary/20 bg-secondary/50 p-8 text-center">
            <h2 className="text-xl font-semibold text-foreground">
              {tc("notSureWhichService")}
            </h2>
            <p className="mt-2 text-muted-foreground">{tc("notSureDescription")}</p>
            <CTALink href="/book" className="mt-5">
              {tc("bookConsultation")}
            </CTALink>
          </div>
        </Container>
      </section>
    </main>
  );
}
