import { Star, Award, Users, UserPlus } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { getSiteConfig } from "@/lib/i18n/content";
import { Container } from "@/components/layout/Container";
import type { Locale } from "@/i18n/routing";

export async function TrustBar() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("common");
  const site = getSiteConfig(locale);

  const stats = [
    {
      icon: Star,
      value: `${site.stats.rating}★`,
      label: t("googleReviews", { count: site.stats.reviewCount }),
    },
    {
      icon: Award,
      value: `${site.stats.yearsInPractice}+`,
      label: t("yearsInPractice"),
    },
    {
      icon: Users,
      value: site.stats.patientsServed,
      label: t("patientsServed"),
    },
    {
      icon: UserPlus,
      value: t("welcome"),
      label: t("newPatientsAccepted"),
    },
  ];

  return (
    <section aria-label={t("clinicCredentials")} className="border-y border-border bg-card">
      <Container className="grid grid-cols-2 gap-6 py-8 md:grid-cols-4 md:gap-8">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center text-center">
            <stat.icon className="mb-2 size-6 text-primary" aria-hidden />
            <p className="text-xl font-bold text-foreground sm:text-2xl">{stat.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </Container>
    </section>
  );
}
