import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { createPageMetadata } from "@/lib/metadata";
import { getSiteConfig } from "@/lib/i18n/content";
import type { Locale } from "@/i18n/routing";

interface PrivacyPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PrivacyPageProps) {
  const { locale } = await params;
  return createPageMetadata({
    locale,
    titleKey: "privacyTitle",
    descriptionKey: "privacyDescription",
    path: "/privacy",
  });
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("legal");
  const tp = await getTranslations("legal.privacy");
  const tm = await getTranslations("metadata");
  const site = getSiteConfig(locale as Locale);
  const dateLocale = locale === "uk" ? "uk-UA" : "en-US";

  return (
    <main id="main-content" className="py-12 md:py-16">
      <Container className="prose prose-slate max-w-3xl">
        <h1>{tm("privacyTitle")}</h1>
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
          <p>{tp("intro", { name: site.name })}</p>

          <h2 className="text-xl font-bold text-foreground">{tp("collectTitle")}</h2>
          <p>{tp("collectBody")}</p>

          <h2 className="text-xl font-bold text-foreground">{tp("useTitle")}</h2>
          <p>{tp("useBody")}</p>

          <h2 className="text-xl font-bold text-foreground">{tp("hipaaTitle")}</h2>
          <p>{tp("hipaaBody")}</p>

          <h2 className="text-xl font-bold text-foreground">{tp("contactTitle")}</h2>
          <p>
            {tp("contactBody", { email: site.email, phone: site.phone })}
          </p>
        </section>
      </Container>
    </main>
  );
}
