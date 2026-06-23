import { Container } from "@/components/layout/Container";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/constants";

export const metadata = createPageMetadata({
  title: "Terms of Service",
  description: `Terms of service for ${siteConfig.name} website.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <main id="main-content" className="py-12 md:py-16">
      <Container className="prose prose-slate max-w-3xl">
        <h1>Terms of Service</h1>
        <p className="lead text-muted-foreground">
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <section className="mt-8 space-y-4 text-muted-foreground">
          <p>
            By using the {siteConfig.name} website, you agree to these terms.
            If you do not agree, please do not use this site.
          </p>

          <h2 className="text-xl font-bold text-foreground">
            Website use
          </h2>
          <p>
            This website provides general information about our dental practice
            and services. It is not a substitute for professional dental advice,
            diagnosis, or treatment. Always seek the advice of your dentist with
            questions about a medical condition.
          </p>

          <h2 className="text-xl font-bold text-foreground">
            Appointment requests
          </h2>
          <p>
            Submitting an appointment request through this website does not
            guarantee a specific date or time. Our team will contact you to
            confirm availability. For dental emergencies, call{" "}
            <a href={siteConfig.phoneHref} className="text-primary">
              {siteConfig.phone}
            </a>{" "}
            immediately.
          </p>

          <h2 className="text-xl font-bold text-foreground">
            Limitation of liability
          </h2>
          <p>
            {siteConfig.name} makes reasonable efforts to ensure information on
            this website is accurate but does not warrant completeness or
            suitability for any purpose. We are not liable for damages arising
            from use of this website.
          </p>

          <h2 className="text-xl font-bold text-foreground">Contact</h2>
          <p>
            Questions about these terms? Contact{" "}
            <a href={`mailto:${siteConfig.email}`} className="text-primary">
              {siteConfig.email}
            </a>
            .
          </p>
        </section>
      </Container>
    </main>
  );
}
