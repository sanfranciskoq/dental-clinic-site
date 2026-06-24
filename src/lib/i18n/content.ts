import { FAQ_ITEMS, aboutContent, whyUsItems } from "@/data/faq";
import { services } from "@/data/services";
import { teamMembers } from "@/data/team";
import { testimonials } from "@/data/testimonials";
import { siteConfig as baseSiteConfig } from "@/data/site";
import type { Locale } from "@/i18n/routing";
import type { FAQItem } from "@/types/faq";
import type { Service } from "@/types/service";
import type { TeamMember } from "@/types/team";
import type { Testimonial } from "@/data/testimonials";
import { ukContent } from "@/data/locales/uk";

function mergeServices(locale: Locale): Service[] {
  if (locale === "en") return services;
  return services.map((service) => ({
    ...service,
    ...ukContent.services[service.slug],
  }));
}

function mergeFaq(locale: Locale): FAQItem[] {
  if (locale === "en") return FAQ_ITEMS;
  return FAQ_ITEMS.map((item) => ({
    ...item,
    ...ukContent.faq[item.id],
  }));
}

function mergeTeam(locale: Locale): TeamMember[] {
  if (locale === "en") return teamMembers;
  return teamMembers.map((member) => ({
    ...member,
    ...ukContent.team[member.slug],
  }));
}

function mergeTestimonials(locale: Locale): Testimonial[] {
  if (locale === "en") return testimonials;
  return testimonials.map((item) => ({
    ...item,
    ...ukContent.testimonials[item.id],
  }));
}

export function getSiteConfig(locale: Locale) {
  if (locale === "en") return baseSiteConfig;
  return {
    ...baseSiteConfig,
    ...ukContent.site,
    address: {
      ...baseSiteConfig.address,
      full: ukContent.site.addressFull,
    },
    hours: ukContent.site.hours,
    badges: ukContent.site.badges,
  };
}

export function getServices(locale: Locale) {
  return mergeServices(locale);
}

export function getLocalizedServiceBySlug(locale: Locale, slug: string) {
  return mergeServices(locale).find((s) => s.slug === slug);
}

export function getLocalizedRelatedServices(
  locale: Locale,
  slug: string,
  limit = 3,
) {
  return mergeServices(locale)
    .filter((s) => s.slug !== slug)
    .slice(0, limit);
}

export function getFaqItems(locale: Locale) {
  return mergeFaq(locale);
}

export function getFaqByIds(locale: Locale, ids: string[]) {
  return mergeFaq(locale).filter((item) => ids.includes(item.id));
}

export function getTeamMembers(locale: Locale) {
  return mergeTeam(locale);
}

export function getLocalizedTeamMemberBySlug(locale: Locale, slug: string) {
  return mergeTeam(locale).find((m) => m.slug === slug);
}

const DENTIST_SLUGS = ["dr-sarah-chen", "dr-marcus-reed"];

export function getDentists(locale: Locale) {
  return mergeTeam(locale).filter((m) => DENTIST_SLUGS.includes(m.slug));
}

export function getTestimonials(locale: Locale) {
  return mergeTestimonials(locale);
}

export function getWhyUsItems(locale: Locale) {
  if (locale === "en") return whyUsItems;
  return whyUsItems.map((item, index) => ({
    ...item,
    ...ukContent.whyUs[index],
  }));
}

export function getAboutContent(locale: Locale) {
  if (locale === "en") return aboutContent;
  return ukContent.about;
}
