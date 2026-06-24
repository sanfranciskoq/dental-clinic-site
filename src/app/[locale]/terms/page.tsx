import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { createPageMetadata } from "@/lib/metadata";
import { getSiteConfig } from "@/lib/i18n/content";
import type { Locale } from "@/i18n/routing";

interface TermsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: TermsPageProps) {
  const { locale } = await params;
  return createPageMetadata({
    locale,
    titleKey: "termsTitle",
    descriptionKey: "termsDescription",
    path: "/terms",
  });
}

export default async function TermsPage({ params }: TermsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("legal");
  const tt = await getTranslations("legal.terms");
  const tm = await getTranslations("metadata");
  const site = getSiteConfig(locale as Locale);
  const dateLocale = locale === "uk" ? "uk-UA" : "en-US";

  return (
    <main id="main-content" className="py-12 md:py-16">
      <Container className="prose prose-slate max-w-3xl">
        <h1>{tm("termsTitle")}</h1>
        <p className="lead text-muted-foreground">
          {t("lastUpdated", {
            date: new Date().toLocaleDateString(dateLocale, {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
          })}
        </p>

        <section className="mt-8 space-y-4 text-muted-foreground">
          <p>{tt("intro", { name: site.name })}</p>

          <h2 className="text-xl font-bold text-foreground">{tt("servicesTitle")}</h2>
          <p>{tt("servicesBody")}</p>

          <h2 className="text-xl font-bold text-foreground">{tt("appointmentsTitle")}</h2>
          <p>{tt("appointmentsBody")}</p>

          <h2 className="text-xl font-bold text-foreground">{tt("liabilityTitle")}</h2>
          <p>{tt("liabilityBody", { name: site.name })}</p>

          <h2 className="text-xl font-bold text-foreground">{tt("contactTitle")}</h2>
          <p>{tt("contactBody", { email: site.email, phone: site.phone })}</p>
        </section>
      </Container>
    </main>
  );
}
