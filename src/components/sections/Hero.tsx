import { getLocale, getTranslations } from "next-intl/server";
import { HeroSection } from "@/components/sections/HeroSection";
import type { Locale } from "@/i18n/routing";

export async function Hero() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("home.hero");
  const tc = await getTranslations("common");

  return (
    <HeroSection
      line1={t("line1")}
      line2={t("line2")}
      line3={t("line3")}
      subheadline={t("subheadline")}
      ctaLabel={tc("bookAppointment")}
      ariaLabel={tc("heroImageAlt")}
    />
  );
}
