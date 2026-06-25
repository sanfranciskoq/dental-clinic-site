import { getTranslations } from "next-intl/server";
import { Phone, Calendar, AlertCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getSiteConfig } from "@/lib/i18n/content";
import { EmergencyFaqLink } from "@/components/layout/EmergencyFaqLink";
import { Container } from "./Container";
import type { Locale } from "@/i18n/routing";

const navItems = [
  { href: "/services" as const, key: "services" as const },
  { href: "/about" as const, key: "about" as const },
  { href: "/team" as const, key: "team" as const },
  { href: "/faq" as const, key: "faq" as const },
  { href: "/contact" as const, key: "contact" as const },
];

interface FooterProps {
  locale: Locale;
}

export async function Footer({ locale }: FooterProps) {
  const t = await getTranslations({ locale, namespace: "nav" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const tf = await getTranslations({ locale, namespace: "footer" });
  const site = getSiteConfig(locale);

  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="border-b border-rose-100 bg-rose-50/80 dark:border-rose-900/50 dark:bg-rose-950/40">
        <Container className="flex flex-wrap items-center justify-center gap-2 py-3 text-sm text-rose-800 dark:text-rose-200">
          <AlertCircle className="size-4 shrink-0" aria-hidden />
          <span>
            {tf("emergency")}{" "}
            <a
              href={site.phoneHref}
              className="font-semibold underline underline-offset-2 hover:text-rose-900 dark:hover:text-rose-100"
            >
              {tc("call", { phone: site.phone })}
            </a>{" "}
            {tf("emergencyText")}{" "}
            <EmergencyFaqLink className="font-semibold underline underline-offset-2 hover:text-rose-900 dark:hover:text-rose-100">
              {tf("emergencyFaq")}
            </EmergencyFaqLink>
          </span>
        </Container>
      </div>

      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-lg font-bold text-foreground">{site.name}</p>
          <p className="mt-2 text-sm text-muted-foreground">{site.description}</p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
            {tc("quickLinks")}
          </h2>
          <ul className="mt-3 space-y-2">
            {navItems.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {t(link.key)}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/book"
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {t("book")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
            {tc("contact")}
          </h2>
          <address className="mt-3 space-y-2 text-sm not-italic text-muted-foreground">
            <p>{site.address.full}</p>
            <p>
              <a
                href={site.phoneHref}
                className="transition-colors hover:text-primary"
              >
                {site.phone}
              </a>
            </p>
            <p>
              <a
                href={`mailto:${site.email}`}
                className="transition-colors hover:text-primary"
              >
                {site.email}
              </a>
            </p>
          </address>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
            {tc("hours")}
          </h2>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            {site.hours.map((h) => (
              <li key={h.day} className="flex justify-between gap-4">
                <span>{h.day}</span>
                <span className="text-foreground">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <Container className="flex flex-col items-center justify-between gap-4 border-t border-border py-6 text-sm text-muted-foreground sm:flex-row">
        <p>
          &copy; {new Date().getFullYear()} {site.name}. {tc("allRightsReserved")}
        </p>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-primary">
            {tf("privacy")}
          </Link>
          <Link href="/terms" className="hover:text-primary">
            {tf("terms")}
          </Link>
        </div>
      </Container>
    </footer>
  );
}

export async function MobileCTA({ locale }: FooterProps) {
  const tc = await getTranslations({ locale, namespace: "common" });
  const site = getSiteConfig(locale);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex gap-2 border-t border-border bg-card/95 p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur max-md:pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"
      role="group"
      aria-label={tc("quickActions")}
    >
      <a
        href={site.phoneHref}
        className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full border border-border bg-background text-sm font-semibold text-foreground transition-colors hover:bg-muted"
      >
        <Phone className="size-4" aria-hidden />
        {tc("callShort")}
      </a>
      <Link
        href="/book"
        className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
      >
        <Calendar className="size-4" aria-hidden />
        {tc("bookShort")}
      </Link>
    </div>
  );
}
