import type { Locale } from "@/i18n/routing";

const cookieName = "NEXT_LOCALE";
const maxAge = 60 * 60 * 24 * 365;

/** Clear path-scoped NEXT_LOCALE cookies that next-intl Link may set (e.g. path=/uk). */
function clearScopedLocaleCookies() {
  for (const path of ["/", "/uk", "/en"]) {
    document.cookie = `${cookieName}=; path=${path}; max-age=0; SameSite=Lax`;
  }
}

/** Keep NEXT_LOCALE aligned with the locale the user chose (always path=/). */
export function persistLocaleChoice(locale: Locale) {
  if (typeof document === "undefined") return;

  clearScopedLocaleCookies();
  document.cookie = `${cookieName}=${locale}; path=/; max-age=${maxAge}; SameSite=Lax`;
}
