import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { getServices } from "@/lib/i18n/content";
import { Container } from "@/components/layout/Container";
import { CTALink } from "@/components/shared/CTALink";
import { DynamicIcon } from "@/components/shared/DynamicIcon";
import { createPageMetadata } from "@/lib/metadata";
import type { Locale } from "@/i18n/routing";

interface ServicesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ServicesPageProps) {
  const { locale } = await params;
  return createPageMetadata({
    locale,
    titleKey: "servicesTitle",
    descriptionKey: "servicesDescription",
    path: "/services",
  });
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("pages.services");
  const tc = await getTranslations("common");
  const services = getServices(locale as Locale);

  return (
    <main id="main-content" className="py-12 md:py-16">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            {t("eyebrow")}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-muted-foreground">{t("description")}</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group flex gap-5 rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                <DynamicIcon name={service.icon} className="size-7" />
              </div>
              <div className="flex flex-1 flex-col">
                <h2 className="text-xl font-semibold text-foreground">{service.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {service.shortDescription}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  {tc("learnMore")}
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-primary/20 bg-secondary/50 p-8 text-center">
          <h2 className="text-xl font-semibold text-foreground">
            {tc("notSureWhichService")}
          </h2>
          <p className="mt-2 text-muted-foreground">{tc("notSureDescription")}</p>
          <CTALink href="/book" className="mt-5">
            {tc("bookConsultation")}
          </CTALink>
        </div>
      </Container>
    </main>
  );
}
