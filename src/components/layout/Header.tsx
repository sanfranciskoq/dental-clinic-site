import { getTranslations } from "next-intl/server";
import { Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getSiteConfig } from "@/lib/i18n/content";
import { CTALink } from "@/components/shared/CTALink";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Container } from "./Container";
import type { Locale } from "@/i18n/routing";

const navItems = [
  { href: "/services" as const, key: "services" as const },
  { href: "/about" as const, key: "about" as const },
  { href: "/team" as const, key: "team" as const },
  { href: "/faq" as const, key: "faq" as const },
  { href: "/contact" as const, key: "contact" as const },
];

interface HeaderProps {
  locale: Locale;
}

export async function Header({ locale }: HeaderProps) {
  const t = await getTranslations({ locale, namespace: "nav" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const site = getSiteConfig(locale);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <Container className="flex h-16 items-center justify-between gap-4 max-lg:gap-2">
        <Link
          href="/"
          className="flex min-w-0 shrink flex-col leading-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
        >
          <span className="truncate text-lg font-bold text-foreground max-lg:text-base">
            {site.name}
          </span>
          <span className="hidden text-xs text-muted-foreground sm:block">
            {site.city}, {site.state}
          </span>
        </Link>

        <nav
          aria-label={t("main")}
          className="hidden items-center gap-1 lg:flex"
        >
          {navItems.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 max-lg:gap-1 sm:gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <a
            href={site.phoneHref}
            className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring max-lg:hidden sm:inline-flex"
            aria-label={tc("callLabel", { phone: site.phone })}
          >
            <Phone className="size-4" aria-hidden />
            <span className="hidden md:inline">{site.phone}</span>
          </a>
          <CTALink href="/book" className="max-lg:min-h-9 max-lg:px-3 max-lg:text-xs lg:px-5">
            <span className="lg:hidden">{tc("bookShort")}</span>
            <span className="hidden lg:inline">{t("book")}</span>
          </CTALink>
        </div>
      </Container>

      <nav
        aria-label={t("mobile")}
        className="flex gap-1 overflow-x-auto border-t border-border/60 px-4 py-2 scrollbar-thin snap-x snap-mandatory lg:hidden"
      >
        {navItems.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="shrink-0 snap-start rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            {t(link.key)}
          </Link>
        ))}
      </nav>
    </header>
  );
}
