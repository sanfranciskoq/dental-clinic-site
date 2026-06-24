import { setRequestLocale } from "next-intl/server";
import { FAQPageContent } from "@/components/faq/FAQPageContent";
import { createPageMetadata } from "@/lib/metadata";

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

  return (
    <main id="main-content">
      <FAQPageContent />
    </main>
  );
}
