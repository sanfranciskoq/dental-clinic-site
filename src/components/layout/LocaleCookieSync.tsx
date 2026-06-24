"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { persistLocaleChoice } from "@/lib/persist-locale-choice";

export function LocaleCookieSync() {
  const locale = useLocale() as Locale;

  useEffect(() => {
    persistLocaleChoice(locale);
  }, [locale]);

  return null;
}
