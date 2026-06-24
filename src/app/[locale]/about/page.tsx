import { setRequestLocale, getTranslations } from "next-intl/server";
import { getAboutContent } from "@/lib/i18n/content";
import { createPageMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/Container";
import { CTALink } from "@/components/shared/CTALink";
import type { Locale } from "@/i18n/routing";

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: AboutPageProps) {
  const { locale } = await params;
  return createPageMetadata({
    locale,
    titleKey: "aboutTitle",
    descriptionKey: "aboutDescription",
    path: "/about",
  });
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("pages.about");
  const tc = await getTranslations("common");
  const about = getAboutContent(locale as Locale);

  return (
    <main id="main-content" className="py-12 md:py-16">
      <Container className="max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          {t("eyebrow")}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          {about.story}
        </p>

        <section className="mt-12 rounded-xl border border-border bg-card p-8">
          <h2 className="text-2xl font-bold text-foreground">{t("missionTitle")}</h2>
          <p className="mt-4 text-muted-foreground">{about.mission}</p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-foreground">{t("technologyTitle")}</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {about.technology.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm text-muted-foreground"
              >
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-foreground">
            {t("certificationsTitle")}
          </h2>
          <ul className="mt-6 space-y-2">
            {about.certifications.map((cert) => (
              <li key={cert} className="text-muted-foreground">
                {cert}
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <CTALink href="/team">{tc("meetOurTeam")}</CTALink>
          <CTALink href="/book" variant="outline">
            {tc("bookAVisit")}
          </CTALink>
        </div>
      </Container>
    </main>
  );
}
