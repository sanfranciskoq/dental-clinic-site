"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import type { ComponentType, SVGProps } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export interface MinimalistHeroNavLink {
  label: string;
  href: string;
}

export interface MinimalistHeroSocialLink {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  href: string;
  label: string;
}

export interface MinimalistHeroProps {
  logoText: string;
  navLinks: MinimalistHeroNavLink[];
  mainText: string;
  readMoreLink: string;
  readMoreLabel: string;
  imageSrc: string;
  imageAlt: string;
  overlayText: {
    part1: string;
    part2: string;
  };
  socialLinks: MinimalistHeroSocialLink[];
  locationText: string;
  backgroundImageSrc?: string;
  showHeader?: boolean;
  className?: string;
}

function InternalLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

function NavLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <InternalLink
      href={href}
      className="text-sm font-medium tracking-widest text-foreground/60 transition-colors hover:text-foreground"
    >
      {children}
    </InternalLink>
  );
}

function SocialIcon({
  href,
  icon: Icon,
  label,
}: MinimalistHeroSocialLink) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="text-foreground/60 transition-colors hover:text-primary"
    >
      <Icon className="h-5 w-5" />
    </a>
  );
}

export function MinimalistHero({
  logoText,
  navLinks,
  mainText,
  readMoreLink,
  readMoreLabel,
  imageSrc,
  imageAlt,
  overlayText,
  socialLinks,
  locationText,
  backgroundImageSrc,
  showHeader = false,
  className,
}: MinimalistHeroProps) {
  return (
    <section
      className={cn(
        "relative flex min-h-[calc(100dvh-4rem)] w-full flex-col items-center justify-between overflow-hidden bg-background p-6 font-sans md:min-h-[calc(100dvh-5rem)] md:p-10 lg:p-12",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        {backgroundImageSrc && (
          <img
            src={backgroundImageSrc}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-[0.12] dark:opacity-[0.08]"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/90 via-background/95 to-background" />
        <div className="absolute -right-24 top-10 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -left-24 bottom-16 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      {showHeader && (
        <header className="z-30 flex w-full max-w-7xl items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold tracking-wider text-foreground"
          >
            {logoText}
          </motion.div>
          <div className="hidden items-center space-x-8 md:flex">
            {navLinks.map((link) => (
              <NavLink key={link.label} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </div>
          <motion.button
            type="button"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col space-y-1.5 md:hidden"
            aria-label="Open menu"
          >
            <span className="block h-0.5 w-6 bg-foreground" />
            <span className="block h-0.5 w-6 bg-foreground" />
            <span className="block h-0.5 w-5 bg-foreground" />
          </motion.button>
        </header>
      )}

      <div className="relative z-10 grid w-full max-w-7xl flex-grow grid-cols-1 items-center gap-8 py-8 md:grid-cols-3 md:gap-4 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="z-20 order-2 text-center md:order-1 md:text-left"
        >
          <p className="mx-auto max-w-xs text-sm leading-relaxed text-muted-foreground md:mx-0 md:max-w-sm">
            {mainText}
          </p>
          <InternalLink
            href={readMoreLink}
            className="mt-4 inline-block text-sm font-semibold text-primary underline decoration-from-font underline-offset-4 transition-colors hover:text-primary/80"
          >
            {readMoreLabel}
          </InternalLink>
        </motion.div>

        <div className="relative order-1 flex h-full items-center justify-center md:order-2">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="absolute z-0 h-[280px] w-[280px] rounded-full bg-primary/20 ring-1 ring-primary/25 md:h-[380px] md:w-[380px] lg:h-[460px] lg:w-[460px]"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
            className="absolute z-[1] h-[250px] w-[250px] rounded-full bg-secondary/80 blur-sm md:h-[340px] md:w-[340px] lg:h-[420px] lg:w-[420px]"
          />
          <motion.img
            src={imageSrc}
            alt={imageAlt}
            className="relative z-10 h-auto w-52 object-cover md:w-60 lg:w-72"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src =
                "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=900&fit=crop&crop=face";
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="z-20 order-3 flex items-center justify-center text-center md:justify-end md:text-right"
        >
          <h1 className="text-6xl font-extrabold tracking-tight text-foreground sm:text-7xl md:text-8xl lg:text-9xl">
            {overlayText.part1}
            <br />
            <span className="text-primary">{overlayText.part2}</span>
          </h1>
        </motion.div>
      </div>

      <footer className="relative z-30 flex w-full max-w-7xl items-center justify-between pb-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="flex items-center space-x-4"
        >
          {socialLinks.map((link) => (
            <SocialIcon key={link.href} {...link} />
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-sm font-medium text-muted-foreground"
        >
          {locationText}
        </motion.div>
      </footer>
    </section>
  );
}

export default MinimalistHero;
