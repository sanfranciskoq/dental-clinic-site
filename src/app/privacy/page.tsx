import { Container } from "@/components/layout/Container";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/constants";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description: `Privacy policy for ${siteConfig.name}.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main id="main-content" className="py-12 md:py-16">
      <Container className="prose prose-slate max-w-3xl">
        <h1>Privacy Policy</h1>
        <p className="lead text-muted-foreground">
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <section className="mt-8 space-y-4 text-muted-foreground">
          <p>
            {siteConfig.name} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;)
            respects your privacy. This policy describes how we collect, use, and
            protect your personal information when you visit our website or use
            our services.
          </p>

          <h2 className="text-xl font-bold text-foreground">
            Information we collect
          </h2>
          <p>
            When you submit a contact or appointment form, we collect your name,
            email address, phone number, and any information you provide in
            your message. We may also collect technical data such as browser type
            and pages visited through standard analytics tools.
          </p>

          <h2 className="text-xl font-bold text-foreground">
            How we use your information
          </h2>
          <p>
            We use your information to respond to inquiries, schedule
            appointments, provide dental care, and improve our website. We do
            not sell your personal information to third parties.
          </p>

          <h2 className="text-xl font-bold text-foreground">HIPAA notice</h2>
          <p>
            Protected health information (PHI) is handled in accordance with HIPAA
            regulations. Information submitted through this website for
            scheduling purposes is not considered PHI until you become a patient.
            Full HIPAA notices are provided at your first visit.
          </p>

          <h2 className="text-xl font-bold text-foreground">Contact us</h2>
          <p>
            Questions about this policy? Contact us at{" "}
            <a href={`mailto:${siteConfig.email}`} className="text-primary">
              {siteConfig.email}
            </a>{" "}
            or{" "}
            <a href={siteConfig.phoneHref} className="text-primary">
              {siteConfig.phone}
            </a>
            .
          </p>
        </section>
      </Container>
    </main>
  );
}
