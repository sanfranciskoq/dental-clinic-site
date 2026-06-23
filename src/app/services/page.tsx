import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { Container } from "@/components/layout/Container";
import { CTALink } from "@/components/shared/CTALink";
import { DynamicIcon } from "@/components/shared/DynamicIcon";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/constants";

export const metadata = createPageMetadata({
  title: "Dental Services",
  description: `Comprehensive dental services in ${siteConfig.city} — cleanings, whitening, implants, Invisalign, emergency care, and pediatric dentistry.`,
  path: "/services",
});

export default function ServicesPage() {
  return (
    <main id="main-content" className="py-12 md:py-16">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Services
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Dental care tailored to your goals
          </h1>
          <p className="mt-4 text-muted-foreground">
            Explore our treatments and book a consultation. Every plan starts
            with a conversation — never pressure.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex gap-5 rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                  <DynamicIcon name={service.icon} className="size-7" />
                </div>
                <div className="flex flex-1 flex-col">
                  <h2 className="text-xl font-semibold text-foreground">
                    {service.title}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {service.shortDescription}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Learn more
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                </div>
              </Link>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-primary/20 bg-secondary/50 p-8 text-center">
          <h2 className="text-xl font-semibold text-foreground">
            Not sure which service you need?
          </h2>
          <p className="mt-2 text-muted-foreground">
            Book a consultation and we&apos;ll recommend the right path.
          </p>
          <CTALink href="/book" className="mt-5">
            Book a consultation
          </CTALink>
        </div>
      </Container>
    </main>
  );
}
