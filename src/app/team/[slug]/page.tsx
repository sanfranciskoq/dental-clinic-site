import Image from "next/image";
import { notFound } from "next/navigation";
import { teamMembers, getTeamMemberBySlug } from "@/data/team";
import { siteConfig } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/Container";
import { CTALink } from "@/components/shared/CTALink";

interface TeamMemberPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return teamMembers.map((member) => ({ slug: member.slug }));
}

export async function generateMetadata({ params }: TeamMemberPageProps) {
  const { slug } = await params;
  const member = getTeamMemberBySlug(slug);
  if (!member) return {};

  return createPageMetadata({
    title: member.name,
    description: `${member.title} at ${siteConfig.name}. Specialties: ${member.specialties.join(", ")}.`,
    path: `/team/${slug}`,
  });
}

export default async function TeamMemberPage({ params }: TeamMemberPageProps) {
  const { slug } = await params;
  const member = getTeamMemberBySlug(slug);
  if (!member) notFound();

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.name,
    jobTitle: member.title,
    worksFor: {
      "@type": "Dentist",
      name: siteConfig.name,
    },
    description: member.bio,
  };

  return (
    <main id="main-content" className="py-12 md:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
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
              Languages: {member.languages.join(", ")}
            </p>

            <p className="mt-6 leading-relaxed text-muted-foreground">
              {member.bio}
            </p>

            <blockquote className="mt-6 border-l-4 border-primary pl-4 italic text-foreground">
              &ldquo;{member.personalNote}&rdquo;
            </blockquote>
          </div>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          <section>
            <h2 className="text-xl font-bold text-foreground">Education</h2>
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
              <h2 className="text-xl font-bold text-foreground">
                Affiliations
              </h2>
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
          <CTALink href="/book">Book an appointment</CTALink>
          <CTALink href="/team" variant="outline">
            Back to team
          </CTALink>
        </div>
      </Container>
    </main>
  );
}
