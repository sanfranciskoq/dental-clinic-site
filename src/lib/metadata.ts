import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/data/site";
import { routing } from "@/i18n/routing";

interface PageMetadataOptions {
  locale: string;
  titleKey: string;
  descriptionKey: string;
  path?: string;
}

export async function createPageMetadata({
  locale,
  titleKey,
  descriptionKey,
  path = "",
}: PageMetadataOptions): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });
  const title = t(titleKey);
  const description = t(descriptionKey);
  const url = `${siteConfig.url}${locale === routing.defaultLocale ? "" : `/${locale}`}${path}`;
  const fullTitle =
    title.includes(siteConfig.name) ? title : `${title} | ${siteConfig.name}`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        routing.locales.map((l) => [
          l,
          `${siteConfig.url}${l === routing.defaultLocale ? "" : `/${l}`}${path}`,
        ]),
      ),
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: locale === "uk" ? "uk_UA" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

export async function createDynamicPageMetadata({
  locale,
  title,
  description,
  path = "",
}: {
  locale: string;
  title: string;
  description: string;
  path?: string;
}): Promise<Metadata> {
  const url = `${siteConfig.url}${locale === routing.defaultLocale ? "" : `/${locale}`}${path}`;
  const fullTitle =
    title === siteConfig.name ? title : `${title} | ${siteConfig.name}`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        routing.locales.map((l) => [
          l,
          `${siteConfig.url}${l === routing.defaultLocale ? "" : `/${l}`}${path}`,
        ]),
      ),
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: locale === "uk" ? "uk_UA" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
