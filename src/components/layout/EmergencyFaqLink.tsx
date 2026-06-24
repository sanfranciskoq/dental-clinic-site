"use client";

import { useLocale } from "next-intl";
import { getPathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { persistLocaleChoice } from "@/lib/persist-locale-choice";

const EMERGENCY_FAQ_HREF = {
  pathname: "/faq" as const,
  query: { category: "emergency" },
  hash: "emergency",
};

interface EmergencyFaqLinkProps {
  children: React.ReactNode;
  className?: string;
}

export function EmergencyFaqLink({ children, className }: EmergencyFaqLinkProps) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const href = getPathname({ locale, href: EMERGENCY_FAQ_HREF });

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    persistLocaleChoice(locale);
    router.push(EMERGENCY_FAQ_HREF, { locale });
  }

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
