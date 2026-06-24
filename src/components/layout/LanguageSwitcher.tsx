"use client";

import { useCallback } from "react";
import { useLocale } from "next-intl";
import { useRouter as useNextRouter } from "next/navigation";
import { getPathname, usePathname } from "@/i18n/navigation";
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
  const router = useNextRouter();

  const switchLocale = useCallback(
    (code: Locale) => {
      if (code === locale) return;

      persistLocaleChoice(code);
      const href = getPathname({ locale: code, href: pathname });
      router.push(href);
    },
    [locale, pathname, router],
  );

  return (
    <div
      className="flex items-center rounded-full border border-border bg-card p-0.5"
      role="group"
      aria-label="Language"
    >
      {routing.locales.map((code) => {
        const isActive = locale === code;

        return (
          <button
            key={code}
            type="button"
            disabled={isActive}
            onClick={() => switchLocale(code)}
            className={cn(
              "inline-flex h-8 min-w-8 items-center justify-center rounded-full px-2.5 text-xs font-semibold leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
            aria-current={isActive ? "true" : undefined}
          >
            {labels[code]}
          </button>
        );
      })}
    </div>
  );
}
