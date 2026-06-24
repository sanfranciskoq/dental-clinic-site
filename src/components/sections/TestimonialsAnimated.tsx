"use client";

import { Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import type { Testimonial } from "@/data/testimonials";

interface TestimonialsAnimatedProps {
  testimonials: Testimonial[];
}

export function TestimonialsAnimated({ testimonials }: TestimonialsAnimatedProps) {
  const t = useTranslations("home.testimonials");

  return (
    <>
      <RevealGroup className="mx-auto max-w-2xl text-center">
        <RevealItem delay={0}>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            {t("eyebrow")}
          </p>
        </RevealItem>
        <RevealItem delay={0.1}>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("title")}
          </h2>
        </RevealItem>
      </RevealGroup>

      <RevealGroup className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((item, index) => (
          <RevealItem key={item.id} index={index}>
            <figure className="flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-sm">
              <div
                className="flex gap-0.5"
                aria-label={t("ratingLabel", { rating: item.rating })}
              >
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-4 fill-amber-400 text-amber-400"
                    aria-hidden
                  />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm text-muted-foreground">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 border-t border-border pt-4">
                <p className="font-semibold text-foreground">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.treatment}</p>
              </figcaption>
            </figure>
          </RevealItem>
        ))}
      </RevealGroup>
    </>
  );
}
