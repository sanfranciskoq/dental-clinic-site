import { siteConfig } from "@/lib/constants";
import { Container } from "@/components/layout/Container";
import { CTALink } from "@/components/shared/CTALink";

export function FinalCTA() {
  return (
    <section className="bg-primary py-16 text-primary-foreground md:py-20">
      <Container className="text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Ready for your healthiest smile?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-primary-foreground/90">
          Book online in under two minutes or call our friendly front desk.
          New patients always welcome.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <CTALink
            href="/book"
            variant="outline"
            className="border-primary-foreground/30 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          >
            Book Appointment
          </CTALink>
          <a
            href={siteConfig.phoneHref}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-primary-foreground/40 px-6 text-sm font-semibold transition-colors hover:bg-primary-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
          >
            Call {siteConfig.phone}
          </a>
        </div>
      </Container>
    </section>
  );
}
