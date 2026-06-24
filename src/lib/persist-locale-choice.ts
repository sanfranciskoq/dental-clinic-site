import { routing, type Locale } from "@/i18n/routing";

const cookieName = routing.localeCookie?.name ?? "NEXT_LOCALE";
const maxAge = routing.localeCookie?.maxAge ?? 60 * 60 * 24 * 365;

/** Keep NEXT_LOCALE aligned with the locale the user is viewing (path=/ so all routes see it). */
export function persistLocaleChoice(locale: Locale) {
  if (typeof document === "undefined") return;

  document.cookie = `${cookieName}=${locale}; path=/; max-age=${maxAge}; SameSite=Lax`;
}
