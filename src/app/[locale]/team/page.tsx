import { setRequestLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { getTeamMembers } from "@/lib/i18n/content";
import { createPageMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/Container";
import { CTALink } from "@/components/shared/CTALink";
import type { Locale } from "@/i18n/routing";

interface TeamPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: TeamPageProps) {
  const { locale } = await params;
  return createPageMetadata({
    locale,
    titleKey: "teamTitle",
    descriptionKey: "teamDescription",
    path: "/team",
  });
}

export default async function TeamPage({ params }: TeamPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("pages.team");
  const tc = await getTranslations("common");
  const teamMembers = getTeamMembers(locale as Locale);

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

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {teamMembers.map((member) => (
            <Link
              key={member.slug}
              href={`/team/${member.slug}`}
              className="group flex gap-5 rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-6"
            >
              <div className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-muted sm:size-28">
                <Image
                  src={member.image}
                  alt={`Portrait of ${member.name}`}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              </div>
              <div className="flex flex-1 flex-col">
                <h2 className="text-lg font-semibold text-foreground">{member.name}</h2>
                <p className="text-sm text-primary">{member.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {member.specialties.join(" · ")}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {member.languages.join(", ")}
                </p>
                <span className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-semibold text-primary">
                  {tc("viewProfile")}
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <CTALink href="/book">{t("bookWithTeam")}</CTALink>
        </div>
      </Container>
    </main>
  );
}
