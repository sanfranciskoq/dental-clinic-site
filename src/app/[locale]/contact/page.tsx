import { setRequestLocale, getTranslations } from "next-intl/server";
import { MapPin, Clock, Phone, Mail } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { Container } from "@/components/layout/Container";
import { createPageMetadata } from "@/lib/metadata";
import { getSiteConfig } from "@/lib/i18n/content";
import type { Locale } from "@/i18n/routing";

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ContactPageProps) {
  const { locale } = await params;
  return createPageMetadata({
    locale,
    titleKey: "contactTitle",
    descriptionKey: "contactDescription",
    path: "/contact",
  });
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("pages.contact");
  const tc = await getTranslations("common");
  const site = getSiteConfig(locale as Locale);

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

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-semibold text-foreground">{tc("sendMessage")}</h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-foreground">{tc("getInTouch")}</h2>
              <ul className="mt-6 space-y-4">
                <li className="flex gap-3">
                  <Phone className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                  <div>
                    <p className="font-medium text-foreground">{tc("phone")}</p>
                    <a
                      href={site.phoneHref}
                      className="text-muted-foreground hover:text-primary"
                    >
                      {site.phone}
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                  <div>
                    <p className="font-medium text-foreground">{tc("email")}</p>
                    <a
                      href={`mailto:${site.email}`}
                      className="text-muted-foreground hover:text-primary"
                    >
                      {site.email}
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                  <div>
                    <p className="font-medium text-foreground">{tc("address")}</p>
                    <p className="text-muted-foreground">{site.address.full}</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Clock className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                  <div>
                    <p className="font-medium text-foreground">{tc("hours")}</p>
                    <ul className="text-muted-foreground">
                      {site.hours.map((h) => (
                        <li key={h.day}>
                          {h.day}: {h.time}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </ul>
            </div>

            <div className="overflow-hidden rounded-xl border border-border shadow-sm">
              <iframe
                title={tc("mapTitle", { name: site.name })}
                src={site.mapEmbedUrl}
                className="aspect-[4/3] w-full min-h-[240px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
