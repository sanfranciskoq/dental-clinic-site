"use client";

import { whyUsItems } from "@/data/faq";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { DynamicIcon } from "@/components/shared/DynamicIcon";

export function WhyUsAnimated() {
  return (
    <>
      <RevealGroup className="mx-auto max-w-2xl text-center">
        <RevealItem delay={0}>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Why Choose Us
          </p>
        </RevealItem>
        <RevealItem delay={0.1}>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Dentistry that respects your time and trust
          </h2>
        </RevealItem>
      </RevealGroup>

      <RevealGroup className="mt-12 grid gap-8 sm:grid-cols-2">
        {whyUsItems.map((item, index) => (
          <RevealItem key={item.title} index={index}>
            <div className="flex gap-4 rounded-xl border border-border bg-card p-6 shadow-sm">
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
          </RevealItem>
        ))}
      </RevealGroup>
    </>
  );
}
