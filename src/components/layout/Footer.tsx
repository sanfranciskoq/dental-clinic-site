import Link from "next/link";
import { Phone, Calendar, AlertCircle } from "lucide-react";
import { siteConfig, navLinks } from "@/lib/constants";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="border-b border-rose-100 bg-rose-50/80">
        <Container className="flex flex-wrap items-center justify-center gap-2 py-3 text-sm text-rose-800">
          <AlertCircle className="size-4 shrink-0" aria-hidden />
          <span>
            Dental emergency?{" "}
            <a
              href={siteConfig.phoneHref}
              className="font-semibold underline underline-offset-2 hover:text-rose-900"
            >
              Call {siteConfig.phone}
            </a>{" "}
            or visit our{" "}
            <Link
              href="/faq#emergency"
              className="font-semibold underline underline-offset-2 hover:text-rose-900"
            >
              emergency FAQ
            </Link>
          </span>
        </Container>
      </div>

      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-lg font-bold text-foreground">{siteConfig.name}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {siteConfig.description}
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
            Quick Links
          </h2>
          <ul className="mt-3 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/book"
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Book Appointment
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
            Contact
          </h2>
          <address className="mt-3 space-y-2 text-sm not-italic text-muted-foreground">
            <p>{siteConfig.address.full}</p>
            <p>
              <a
                href={siteConfig.phoneHref}
                className="transition-colors hover:text-primary"
              >
                {siteConfig.phone}
              </a>
            </p>
            <p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="transition-colors hover:text-primary"
              >
                {siteConfig.email}
              </a>
            </p>
          </address>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
            Hours
          </h2>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            {siteConfig.hours.map((h) => (
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
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
          reserved.
        </p>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-primary">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-primary">
            Terms of Service
          </Link>
        </div>
      </Container>
    </footer>
  );
}

export function MobileCTA() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex border-t border-border bg-card/95 p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur md:hidden"
      role="group"
      aria-label="Quick actions"
    >
      <a
        href={siteConfig.phoneHref}
        className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full border border-border bg-background text-sm font-semibold text-foreground transition-colors hover:bg-muted"
      >
        <Phone className="size-4" aria-hidden />
        Call
      </a>
      <Link
        href="/book"
        className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
      >
        <Calendar className="size-4" aria-hidden />
        Book
      </Link>
    </div>
  );
}
