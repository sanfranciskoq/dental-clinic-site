import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

interface SkipLinkProps {
  locale: Locale;
}

export async function SkipLink({ locale }: SkipLinkProps) {
  const t = await getTranslations({ locale, namespace: "common" });

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:outline-none"
    >
      {t("skipToContent")}
    </a>
  );
}
