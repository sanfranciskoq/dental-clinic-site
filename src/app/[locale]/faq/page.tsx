import { setRequestLocale } from "next-intl/server";
import { FAQPageContent } from "@/components/faq/FAQPageContent";
import { FAQJsonLd } from "@/components/faq/FAQJsonLd";
import { createPageMetadata } from "@/lib/metadata";
import { getFaqItems, getSiteConfig } from "@/lib/i18n/content";
import type { Locale } from "@/i18n/routing";

interface FAQPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: FAQPageProps) {
  const { locale } = await params;
  return createPageMetadata({
    locale,
    titleKey: "faqTitle",
    descriptionKey: "faqDescription",
    path: "/faq",
  });
}

export default async function FAQPage({ params }: FAQPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const typedLocale = locale as Locale;
  const items = getFaqItems(typedLocale);
  const site = getSiteConfig(typedLocale);

  return (
    <main id="main-content">
      <FAQJsonLd url={`${site.url}/faq`} items={items} />
      <FAQPageContent items={items} />
    </main>
  );
}
