"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { persistLocaleChoice } from "@/lib/persist-locale-choice";
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
      className="flex items-center rounded-full border border-border bg-card p-0.5"
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
            onClick={() => persistLocaleChoice(code)}
            className={cn(
              "inline-flex h-8 min-w-8 items-center justify-center rounded-full px-2.5 text-xs font-semibold leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
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
