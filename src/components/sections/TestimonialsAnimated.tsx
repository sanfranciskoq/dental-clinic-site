"use client";

import { Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

const preview = testimonials.slice(0, 6);

export function TestimonialsAnimated() {
  return (
    <>
      <RevealGroup className="mx-auto max-w-2xl text-center">
        <RevealItem delay={0}>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Patient Reviews
          </p>
        </RevealItem>
        <RevealItem delay={0.1}>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Trusted by families across Austin
          </h2>
        </RevealItem>
      </RevealGroup>

      <RevealGroup className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {preview.map((t, index) => (
          <RevealItem key={t.id} index={index}>
            <figure className="flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-sm">
              <div
                className="flex gap-0.5"
                aria-label={`${t.rating} out of 5 stars`}
              >
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-4 fill-amber-400 text-amber-400"
                    aria-hidden
                  />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm text-muted-foreground">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 border-t border-border pt-4">
                <p className="font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.treatment}</p>
              </figcaption>
            </figure>
          </RevealItem>
        ))}
      </RevealGroup>
    </>
  );
}
