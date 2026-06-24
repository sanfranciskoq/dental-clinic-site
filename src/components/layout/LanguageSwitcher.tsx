"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const labels: Record<Locale, string> = {
  en: "EN",
  uk: "UA",
};

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    for (const code of routing.locales) {
      if (code === locale) continue;
      router.prefetch(pathname, { locale: code });
    }
  }, [locale, pathname, router]);

  return (
    <div
      className="flex rounded-full border border-border bg-card p-0.5"
      role="group"
      aria-label="Language"
    >
      {routing.locales.map((code) => {
        const isActive = locale === code;

        return (
          <Link
            key={code}
            href={pathname}
            locale={code}
            scroll={false}
            prefetch={false}
            className={cn(
              "min-h-8 rounded-full px-2.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isActive
                ? "bg-primary text-primary-foreground pointer-events-none"
                : "text-muted-foreground hover:text-foreground",
            )}
            aria-current={isActive ? "true" : undefined}
          >
            {labels[code]}
          </Link>
        );
      })}
    </div>
  );
}
