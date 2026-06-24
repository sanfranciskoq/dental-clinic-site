"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { CTALink } from "@/components/shared/CTALink";
import { DynamicIcon } from "@/components/shared/DynamicIcon";
import { ServicesVisual } from "@/components/sections/services/ServicesVisual";
import type { Service } from "@/types/service";

const spring = { type: "spring", stiffness: 260, damping: 24 } as const;

function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const markVisible = () => setVisible(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          markVisible();
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -48px 0px" },
    );

    observer.observe(node);

    const rect = node.getBoundingClientRect();
    const alreadyVisible =
      rect.top < window.innerHeight - 48 && rect.bottom > 0;

    if (alreadyVisible) {
      markVisible();
      observer.disconnect();
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function RevealItem({
  children,
  className,
  visible,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  visible: boolean;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`motion-safe ${className ?? ""}`}
      initial={{ opacity: 0, y: 20 }}
      animate={
        visible || reduceMotion
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 20 }
      }
      transition={
        reduceMotion
          ? { duration: 0 }
          : { ...spring, delay }
      }
    >
      {children}
    </motion.div>
  );
}

export function ServicesIntroAnimated() {
  const { ref, visible } = useReveal();

  return (
    <div ref={ref} className="lg:col-span-4">
      <RevealItem visible={visible} delay={0}>
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          Our Services
        </p>
      </RevealItem>
      <RevealItem visible={visible} delay={0.1}>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Complete care for every smile
        </h2>
      </RevealItem>
      <RevealItem visible={visible} delay={0.18}>
        <p className="mt-4 text-muted-foreground">
          From preventive cleanings to implants and emergencies — one trusted
          team for your whole family.
        </p>
      </RevealItem>
      <RevealItem visible={visible} delay={0.26} className="mt-8">
        <ServicesVisual />
      </RevealItem>
    </div>
  );
}

export function ServicesCardsAnimated({ services }: { services: Service[] }) {
  const { ref, visible } = useReveal();

  return (
    <div ref={ref} className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
      {services.map((service, index) => (
        <RevealItem
          key={service.slug}
          visible={visible}
          delay={0.06 * index}
          className="h-full"
        >
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

      <RevealItem
        visible={visible}
        delay={0.06 * services.length}
        className="sm:col-span-2"
      >
        <CTALink href="/services" variant="outline">
          View all services
        </CTALink>
      </RevealItem>
    </div>
  );
}
