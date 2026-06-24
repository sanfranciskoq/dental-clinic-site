"use client";

import { useEffect } from "react";
import type { Locale } from "@/i18n/routing";

interface LocaleHtmlAttributesProps {
  locale: Locale;
}

export function LocaleHtmlAttributes({ locale }: LocaleHtmlAttributesProps) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
