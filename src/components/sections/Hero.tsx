import Image from "next/image";
import { Phone } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { getSiteConfig } from "@/lib/i18n/content";
import { CTALink } from "@/components/shared/CTALink";
import { Container } from "@/components/layout/Container";
import type { Locale } from "@/i18n/routing";

export async function Hero() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("home.hero");
  const tc = await getTranslations("common");
  const site = getSiteConfig(locale);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary/60 to-background">
      <Container className="grid items-center gap-10 py-16 md:grid-cols-2 md:py-24 lg:py-28">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            {t("eyebrow")}
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl lg:leading-tight">
            {t("title")}
          </h1>
          <p className="mt-5 text-lg text-muted-foreground sm:text-xl">
            {t("subtitle", { description: site.description })}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <CTALink href="/book">{tc("bookAppointment")}</CTALink>
            <a
              href={site.phoneHref}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border bg-card px-6 text-sm font-semibold text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Phone className="size-4" aria-hidden />
              {tc("call", { phone: site.phone })}
            </a>
          </div>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border shadow-lg">
          <Image
            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=600&fit=crop"
            alt={tc("heroImageAlt")}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </Container>
    </section>
  );
}
