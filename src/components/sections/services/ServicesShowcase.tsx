"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { ServicesVideoBackground } from "@/components/sections/services/ServicesVideoBackground";
import { ServiceList } from "@/components/sections/services/ServiceList";
import { ServicePanel } from "@/components/sections/services/ServicePanel";
import { CTALink } from "@/components/shared/CTALink";
import { cn } from "@/lib/utils";
import type { Service } from "@/types/service";

type ServicesShowcaseVariant = "home" | "page";

interface ServicesShowcaseProps {
  services: Service[];
  variant?: ServicesShowcaseVariant;
}

export function ServicesShowcase({
  services,
  variant = "home",
}: ServicesShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const isHome = variant === "home";

  const t = useTranslations(isHome ? "home.services" : "pages.services");
  const tc = useTranslations("common");

  const activeService = services[activeIndex] ?? services[0];

  const headerMotion = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.3 },
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
      };

  const listMotion = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.45, delay: 0.15, ease: [0.22, 1, 0.36, 1] as const },
      };

  if (!activeService) return null;

  const HeadingTag = isHome ? "h2" : "h1";

  return (
    <section
      className={cn(
        "relative flex w-full items-center overflow-hidden",
        isHome ? "min-h-[85vh]" : "min-h-[55vh]",
      )}
      aria-labelledby="services-showcase-heading"
    >
      <ServicesVideoBackground />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <motion.header className="max-w-3xl" {...headerMotion}>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            {t("eyebrow")}
          </p>
          <HeadingTag
            id="services-showcase-heading"
            className="mt-3 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl lg:leading-[1.1]"
          >
            {t("title")}
          </HeadingTag>
          <p className="mt-4 max-w-2xl text-base text-white/75 sm:text-lg">
            {t("description")}
          </p>
        </motion.header>

        <motion.div
          className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-2 lg:gap-12 xl:gap-16"
          {...listMotion}
        >
          <ServiceList
            services={services}
            activeIndex={activeIndex}
            onActiveChange={setActiveIndex}
          />

          <div className="hidden lg:block">
            <ServicePanel service={activeService} />
          </div>
        </motion.div>

        <div className="mt-8 lg:hidden">
          <ServicePanel service={activeService} />
        </div>

        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CTALink
            href="/services"
            variant="ghost"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/5 px-5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10 hover:text-white"
          >
            {tc("viewAllServices")}
            <ArrowRight className="size-4" aria-hidden />
          </CTALink>

          {isHome ? (
            <p className="text-sm text-white/60">
              {tc("learnMore")}{" "}
              <Link
                href="/book"
                className="font-semibold text-primary underline-offset-2 hover:underline"
              >
                {tc("bookAppointment")}
              </Link>
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
