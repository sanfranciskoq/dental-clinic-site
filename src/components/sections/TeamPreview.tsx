import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { dentists } from "@/data/team";
import { Container } from "@/components/layout/Container";
import { CTALink } from "@/components/shared/CTALink";

export function TeamPreview() {
  const preview = dentists.slice(0, 3);

  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              Our Team
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Meet the people behind your smile
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Experienced, compassionate providers who take time to listen and
              explain every option.
            </p>
          </div>
          <CTALink href="/team" variant="outline" className="shrink-0">
            View full team
          </CTALink>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {preview.map((member) => (
            <Link
              key={member.slug}
              href={`/team/${member.slug}`}
              className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div className="relative aspect-square overflow-hidden bg-muted">
                <Image
                  src={member.image}
                  alt={`Portrait of ${member.name}`}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-foreground">
                  {member.name}
                </h3>
                <p className="text-sm text-primary">{member.title}</p>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {member.specialties.join(" · ")}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  View profile
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
