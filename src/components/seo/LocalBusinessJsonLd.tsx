import { getSiteConfig } from "@/lib/i18n/content";
import type { Locale } from "@/i18n/routing";
import { JsonLd } from "./JsonLd";

export function buildLocalBusinessSchema(locale: Locale) {
  const site = getSiteConfig(locale);

  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.zip,
      addressCountry: "US",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "14:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.stats.rating,
      reviewCount: site.stats.reviewCount,
    },
    priceRange: "$$",
  };
}

export function LocalBusinessJsonLd({ locale }: { locale: Locale }) {
  return <JsonLd data={buildLocalBusinessSchema(locale)} />;
}
