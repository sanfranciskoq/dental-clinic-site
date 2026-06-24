import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { Clock, DollarSign } from "lucide-react";
import { services } from "@/data/services";
import {
  getLocalizedServiceBySlug,
  getLocalizedRelatedServices,
  getFaqByIds,
  getSiteConfig,
} from "@/lib/i18n/content";
import { createDynamicPageMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/Container";
import { CTALink } from "@/components/shared/CTALink";
import { DynamicIcon } from "@/components/shared/DynamicIcon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { routing, type Locale } from "@/i18n/routing";

interface ServicePageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    services.map((service) => ({ locale, slug: service.slug })),
  );
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { locale, slug } = await params;
  const service = getLocalizedServiceBySlug(locale as Locale, slug);
  if (!service) return {};

  const site = getSiteConfig(locale as Locale);

  return createDynamicPageMetadata({
    locale,
    title: service.title,
    description: `${service.shortDescription} Available at ${site.name} in ${site.city}.`,
    path: `/services/${slug}`,
  });
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const typedLocale = locale as Locale;
  const service = getLocalizedServiceBySlug(typedLocale, slug);
  if (!service) notFound();

  const tc = await getTranslations("common");
  const faqItems = getFaqByIds(typedLocale, service.faqIds);
  const related = getLocalizedRelatedServices(typedLocale, slug);
  const site = getSiteConfig(typedLocale);

  return (
    <main id="main-content" className="py-12 md:py-16">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:gap-12">
          <article>
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-xl bg-secondary text-primary">
                <DynamicIcon name={service.icon} className="size-6" />
              </div>
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                {tc("service")}
              </p>
            </div>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {service.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">{service.description}</p>

            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2">
                <Clock className="size-4 text-primary" aria-hidden />
                <span>{service.duration}</span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2">
                <DollarSign className="size-4 text-primary" aria-hidden />
                <span>{service.costRange}</span>
              </div>
            </div>

            <section className="mt-10">
              <h2 className="text-2xl font-bold text-foreground">{tc("benefits")}</h2>
              <ul className="mt-4 space-y-2">
                {service.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-2 text-muted-foreground"
                  >
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-bold text-foreground">{tc("whatToExpect")}</h2>
              <ol className="mt-6 space-y-6">
                {service.steps.map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold text-foreground">{step.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {faqItems.length > 0 && (
              <section className="mt-10">
                <h2 className="text-2xl font-bold text-foreground">
                  {tc("commonQuestions")}
                </h2>
                <Accordion className="mt-4">
                  {faqItems.map((item) => (
                    <AccordionItem key={item.id} value={item.id}>
                      <AccordionTrigger>{item.question}</AccordionTrigger>
                      <AccordionContent>{item.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                <Link
                  href="/faq"
                  className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
                >
                  {tc("viewAllFaqs")}
                </Link>
              </section>
            )}

            <section className="mt-10">
              <h2 className="text-2xl font-bold text-foreground">
                {tc("relatedServices")}
              </h2>
              <ul className="mt-4 space-y-2">
                {related.map((rel) => (
                  <li key={rel.slug}>
                    <Link
                      href={`/services/${rel.slug}`}
                      className="text-primary hover:underline"
                    >
                      {rel.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </article>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-foreground">
                {tc("bookThisService")}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {tc("bookServiceRequest")}
              </p>
              <CTALink
                href={`/book?service=${service.slug}`}
                className="mt-5 w-full"
              >
                {tc("bookServiceCta", { service: service.title })}
              </CTALink>
              <a
                href={site.phoneHref}
                className="mt-3 flex min-h-11 w-full items-center justify-center rounded-full border border-border text-sm font-semibold transition-colors hover:bg-muted"
              >
                {tc("call", { phone: site.phone })}
              </a>
              <p className="mt-4 text-xs text-muted-foreground">
                {tc("costDisclaimer")}
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </main>
  );
}
