import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { teamMembers } from "@/data/team";
import {
  getLocalizedTeamMemberBySlug,
  getSiteConfig,
} from "@/lib/i18n/content";
import { createDynamicPageMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/Container";
import { CTALink } from "@/components/shared/CTALink";
import { JsonLd } from "@/components/seo/JsonLd";
import { routing, type Locale } from "@/i18n/routing";

interface TeamMemberPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    teamMembers.map((member) => ({ locale, slug: member.slug })),
  );
}

export async function generateMetadata({ params }: TeamMemberPageProps) {
  const { locale, slug } = await params;
  const member = getLocalizedTeamMemberBySlug(locale as Locale, slug);
  if (!member) return {};

  const site = getSiteConfig(locale as Locale);

  return createDynamicPageMetadata({
    locale,
    title: member.name,
    description: `${member.title} at ${site.name}. Specialties: ${member.specialties.join(", ")}.`,
    path: `/team/${slug}`,
  });
}

export default async function TeamMemberPage({ params }: TeamMemberPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const typedLocale = locale as Locale;
  const member = getLocalizedTeamMemberBySlug(typedLocale, slug);
  if (!member) notFound();

  const t = await getTranslations("pages.teamMember");
  const tc = await getTranslations("common");
  const site = getSiteConfig(typedLocale);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.name,
    jobTitle: member.title,
    worksFor: {
      "@type": "Dentist",
      name: site.name,
    },
    description: member.bio,
  };

  return (
    <main id="main-content" className="py-12 md:py-16">
      <JsonLd data={personSchema} />
      <Container className="max-w-4xl">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
          <div className="relative mx-auto aspect-square w-full max-w-xs shrink-0 overflow-hidden rounded-2xl border border-border shadow-sm sm:mx-0">
            <Image
              src={member.image}
              alt={`Portrait of ${member.name}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 320px"
              priority
            />
          </div>

          <div className="flex-1">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              {member.title}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {member.name}
            </h1>
            <p className="mt-2 text-muted-foreground">
              {member.specialties.join(" · ")}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("languages")}: {member.languages.join(", ")}
            </p>

            <p className="mt-6 leading-relaxed text-muted-foreground">{member.bio}</p>

            <blockquote className="mt-6 border-l-4 border-primary pl-4 italic text-foreground">
              &ldquo;{member.personalNote}&rdquo;
            </blockquote>
          </div>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          <section>
            <h2 className="text-xl font-bold text-foreground">{t("education")}</h2>
            <ul className="mt-4 space-y-2">
              {member.education.map((edu) => (
                <li key={edu} className="text-sm text-muted-foreground">
                  {edu}
                </li>
              ))}
            </ul>
          </section>

          {member.affiliations.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-foreground">{t("affiliations")}</h2>
              <ul className="mt-4 space-y-2">
                {member.affiliations.map((aff) => (
                  <li key={aff} className="text-sm text-muted-foreground">
                    {aff}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <CTALink href="/book">{tc("bookAppointment")}</CTALink>
          <CTALink href="/team" variant="outline">
            {tc("backToTeam")}
          </CTALink>
        </div>
      </Container>
    </main>
  );
}
