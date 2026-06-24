import { getLocale } from "next-intl/server";
import { getServices } from "@/lib/i18n/content";
import { ServicesShowcase } from "@/components/sections/services/ServicesShowcase";
import type { Locale } from "@/i18n/routing";

export async function ServicesGrid() {
  const locale = (await getLocale()) as Locale;
  const services = getServices(locale);

  return <ServicesShowcase services={services} variant="home" />;
}
