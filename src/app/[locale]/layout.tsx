import type { Locale } from "@/i18n/routing";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { DM_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { SkipLink } from "@/components/layout/SkipLink";
import { Header } from "@/components/layout/Header";
import { Footer, MobileCTA } from "@/components/layout/Footer";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { routing } from "@/i18n/routing";
import "../globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

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
    <html lang={locale} className={`${dmSans.variable} h-full`} suppressHydrationWarning>
      <body className="flex min-h-full flex-col pb-20 antialiased md:pb-0">
        <LocalBusinessJsonLd />
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <MotionProvider>
              <SkipLink locale={locale as Locale} />
              <Header locale={locale as Locale} />
              {children}
              <Footer locale={locale as Locale} />
              <MobileCTA locale={locale as Locale} />
              <Toaster position="top-center" richColors />
            </MotionProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
