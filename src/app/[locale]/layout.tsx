import type { Locale } from "@/i18n/routing";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";
import { SkipLink } from "@/components/layout/SkipLink";
import { Header } from "@/components/layout/Header";
import { Footer, MobileCTA } from "@/components/layout/Footer";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";
import { LocaleHtmlAttributes } from "@/components/layout/LocaleHtmlAttributes";
import { routing } from "@/i18n/routing";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LocaleHtmlAttributes locale={locale as Locale} />
      <LocalBusinessJsonLd locale={locale as Locale} />
      <SkipLink locale={locale as Locale} />
      <Header locale={locale as Locale} />
      {children}
      <Footer locale={locale as Locale} />
      <MobileCTA locale={locale as Locale} />
      <Toaster position="top-center" richColors />
    </NextIntlClientProvider>
  );
}
