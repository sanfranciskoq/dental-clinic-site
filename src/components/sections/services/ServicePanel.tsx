"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CTALink } from "@/components/shared/CTALink";
import { DynamicIcon } from "@/components/shared/DynamicIcon";
import type { Service } from "@/types/service";

interface ServicePanelProps {
  service: Service;
}

export function ServicePanel({ service }: ServicePanelProps) {
  const tc = useTranslations("common");
  const reduceMotion = useReducedMotion();

  const motionProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -6 },
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <div
      className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-md sm:p-8 lg:min-h-[22rem]"
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence mode="wait">
        <motion.div key={service.slug} {...motionProps}>
          <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/20 text-primary">
            <DynamicIcon name={service.icon} className="size-8" />
          </div>

          <h3 className="mt-6 text-2xl font-bold text-white sm:text-3xl">
            {service.title}
          </h3>

          <p className="mt-4 text-base leading-relaxed text-white/80">
            {service.description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CTALink
              href="/book"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-[1.02] hover:bg-primary/90 focus-visible:ring-white focus-visible:ring-offset-primary"
            >
              {tc("bookAppointment")}
              <ArrowRight className="ml-1.5 size-4" aria-hidden />
            </CTALink>

            <Link
              href={`/services/${service.slug}`}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/30 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              {tc("learnMore")}
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
