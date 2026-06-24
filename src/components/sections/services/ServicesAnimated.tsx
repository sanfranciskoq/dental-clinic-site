"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CTALink } from "@/components/shared/CTALink";
import { DynamicIcon } from "@/components/shared/DynamicIcon";
import { ServicesVisual } from "@/components/sections/services/ServicesVisual";
import type { Service } from "@/types/service";

export function ServicesIntroAnimated() {
  return (
    <RevealGroup className="lg:col-span-4">
      <RevealItem delay={0}>
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          Our Services
        </p>
      </RevealItem>
      <RevealItem delay={0.1}>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Complete care for every smile
        </h2>
      </RevealItem>
      <RevealItem delay={0.18}>
        <p className="mt-4 text-muted-foreground">
          From preventive cleanings to implants and emergencies — one trusted
          team for your whole family.
        </p>
      </RevealItem>
      <RevealItem delay={0.26} className="mt-8">
        <ServicesVisual />
      </RevealItem>
    </RevealGroup>
  );
}

export function ServicesCardsAnimated({ services }: { services: Service[] }) {
  return (
    <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
      {services.map((service, index) => (
        <RevealItem key={service.slug} index={index} className="h-full">
          <Link
            href={`/services/${service.slug}`}
            className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 shadow-sm transition-[transform,box-shadow,border-color] hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div className="mb-3 flex size-11 items-center justify-center rounded-xl bg-secondary text-primary">
              <DynamicIcon name={service.icon} className="size-5" />
            </div>
            <h3 className="text-base font-semibold text-foreground">
              {service.title}
            </h3>
            <p className="mt-1.5 flex-1 text-sm text-muted-foreground">
              {service.shortDescription}
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
              Learn more
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </span>
          </Link>
        </RevealItem>
      ))}

      <RevealItem index={services.length} className="sm:col-span-2">
        <CTALink href="/services" variant="outline">
          View all services
        </CTALink>
      </RevealItem>
    </RevealGroup>
  );
}
