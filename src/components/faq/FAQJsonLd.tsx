import { siteConfig } from "@/data/site";
import { JsonLd } from "@/components/seo/JsonLd";
import type { FAQItem } from "@/types/faq";

interface FAQJsonLdProps {
  url?: string;
  items: FAQItem[];
}

export function FAQJsonLd({ url, items }: FAQJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
    ...(url && { url }),
    publisher: {
      "@type": "Dentist",
      name: siteConfig.name,
    },
  };

  return <JsonLd data={schema} />;
}
