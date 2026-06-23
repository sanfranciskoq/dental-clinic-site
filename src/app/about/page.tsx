import { aboutContent } from "@/data/faq";
import { siteConfig } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/Container";
import { CTALink } from "@/components/shared/CTALink";

export const metadata = createPageMetadata({
  title: "About Us",
  description: `Learn about ${siteConfig.name} — our story, mission, technology, and commitment to gentle dental care in ${siteConfig.city}.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <main id="main-content" className="py-12 md:py-16">
      <Container className="max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          About Us
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          A practice built on trust, not transactions
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          {aboutContent.story}
        </p>

        <section className="mt-12 rounded-xl border border-border bg-card p-8">
          <h2 className="text-2xl font-bold text-foreground">Our mission</h2>
          <p className="mt-4 text-muted-foreground">{aboutContent.mission}</p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-foreground">
            Modern technology, human touch
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {aboutContent.technology.map((item) => (
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
            Certifications &amp; standards
          </h2>
          <ul className="mt-6 space-y-2">
            {aboutContent.certifications.map((cert) => (
              <li
                key={cert}
                className="text-muted-foreground"
              >
                {cert}
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <CTALink href="/team">Meet our team</CTALink>
          <CTALink href="/book" variant="outline">
            Book a visit
          </CTALink>
        </div>
      </Container>
    </main>
  );
}
