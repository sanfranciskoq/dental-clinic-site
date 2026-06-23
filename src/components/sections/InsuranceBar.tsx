import { siteConfig } from "@/lib/constants";
import { insuranceProviders } from "@/data/faq";
import { Container } from "@/components/layout/Container";

export function InsuranceBar() {
  return (
    <section className="border-y border-border py-12 md:py-16">
      <Container>
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Insurance &amp; Payment
          </p>
          <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
            We accept most major plans
          </h2>
          <p className="mt-3 text-muted-foreground">
            Don&apos;t see yours?{" "}
            <a
              href={siteConfig.phoneHref}
              className="font-semibold text-primary underline underline-offset-2"
            >
              Call us
            </a>{" "}
            — we&apos;ll verify your benefits before your visit. Financing
            available through CareCredit.
          </p>
        </div>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {insuranceProviders.map((provider) => (
            <li
              key={provider}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground"
            >
              {provider}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
