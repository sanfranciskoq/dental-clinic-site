import { MapPin, Clock, Phone, Mail } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { Container } from "@/components/layout/Container";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/constants";

export const metadata = createPageMetadata({
  title: "Contact Us",
  description: `Contact ${siteConfig.name} in ${siteConfig.city}. Call, email, or send a message. We're here to help.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main id="main-content" className="py-12 md:py-16">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Contact
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            We&apos;d love to hear from you
          </h1>
          <p className="mt-4 text-muted-foreground">
            Questions about insurance, services, or scheduling? Reach out and
            we&apos;ll respond within one business day.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-semibold text-foreground">
              Send a message
            </h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-foreground">
                Get in touch
              </h2>
              <ul className="mt-6 space-y-4">
                <li className="flex gap-3">
                  <Phone className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                  <div>
                    <p className="font-medium text-foreground">Phone</p>
                    <a
                      href={siteConfig.phoneHref}
                      className="text-muted-foreground hover:text-primary"
                    >
                      {siteConfig.phone}
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-muted-foreground hover:text-primary"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                  <div>
                    <p className="font-medium text-foreground">Address</p>
                    <p className="text-muted-foreground">
                      {siteConfig.address.full}
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Clock className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                  <div>
                    <p className="font-medium text-foreground">Hours</p>
                    <ul className="text-muted-foreground">
                      {siteConfig.hours.map((h) => (
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
                title={`Map showing ${siteConfig.name} location`}
                src={siteConfig.mapEmbedUrl}
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
