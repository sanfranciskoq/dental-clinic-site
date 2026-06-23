import { getFaqItems } from "@/data/faq";
import { siteConfig } from "@/lib/constants";

interface FAQJsonLdProps {
  url?: string;
}

export function FAQJsonLd({ url }: FAQJsonLdProps) {
  const items = getFaqItems();

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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
