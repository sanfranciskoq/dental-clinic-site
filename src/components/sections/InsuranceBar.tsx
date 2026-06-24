import { getLocale, getTranslations } from "next-intl/server";
import { getSiteConfig } from "@/lib/i18n/content";
import { insuranceProviders } from "@/data/faq";
import { Container } from "@/components/layout/Container";
import type { Locale } from "@/i18n/routing";

export async function InsuranceBar() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("home.insurance");
  const site = getSiteConfig(locale);

  return (
    <section className="border-y border-border py-12 md:py-16">
      <Container>
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            {t("eyebrow")}
          </p>
          <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {t("description")}{" "}
            <a
              href={site.phoneHref}
              className="font-semibold text-primary underline underline-offset-2"
            >
              {t("callUs")}
            </a>{" "}
            {t("financing")}
          </p>
        </div>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {insuranceProviders.map((provider) => (
            <li
              key={provider}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground"
            >
              {provider}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
