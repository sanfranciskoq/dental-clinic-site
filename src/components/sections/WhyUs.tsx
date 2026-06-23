import { whyUsItems } from "@/data/faq";
import { Container } from "@/components/layout/Container";
import { DynamicIcon } from "@/components/shared/DynamicIcon";

export function WhyUs() {
  return (
    <section className="bg-muted/50 py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Why Choose Us
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Dentistry that respects your time and trust
          </h2>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {whyUsItems.map((item) => (
              <div
                key={item.title}
                className="flex gap-4 rounded-xl border border-border bg-card p-6 shadow-sm"
              >
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <DynamicIcon name={item.icon} className="size-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
