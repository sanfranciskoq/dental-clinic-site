"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import type { FAQCategory } from "@/types/faq";
import { getFaqItems, getSiteConfig } from "@/lib/i18n/content";
import type { Locale } from "@/i18n/routing";
import { CategoryGrid } from "./CategoryGrid";
import { FAQJsonLd } from "./FAQJsonLd";
import { FAQSectionList } from "./FAQSectionList";
import { FAQSearch } from "./FAQSearch";

function matchesSearch(
  query: string,
  question: string,
  answer: string,
  keywords: string[] = [],
) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;
  const haystack = [question, answer, ...keywords].join(" ").toLowerCase();
  return haystack.includes(normalized);
}

export function FAQPageContent() {
  const locale = useLocale() as Locale;
  const t = useTranslations("faq");
  const tc = useTranslations("common");
  const site = getSiteConfig(locale);
  const allItems = useMemo(() => getFaqItems(locale), [locale]);

  const [activeCategory, setActiveCategory] = useState<FAQCategory | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => setSearchQuery(searchInput), 200);
    return () => window.clearTimeout(timer);
  }, [searchInput]);

  const filteredItems = useMemo(() => {
    if (!activeCategory) return [];

    return allItems.filter(
      (item) =>
        item.category === activeCategory &&
        matchesSearch(
          searchQuery,
          item.question,
          item.answer,
          item.keywords,
        ),
    );
  }, [activeCategory, searchQuery, allItems]);

  return (
    <>
      <FAQJsonLd url={`${site.url}/faq`} items={allItems} />
      <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
        <header className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
            {site.name}
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground sm:text-lg">
            {t("description")}
          </p>
        </header>

        <div id="emergency" className="mb-8 space-y-5 scroll-mt-24">
          <CategoryGrid
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
          />
          <FAQSearch value={searchInput} onChange={setSearchInput} />
        </div>

        <FAQSectionList
          items={filteredItems}
          showCategoryPrompt={activeCategory === null}
        />

        <aside className="mt-12 rounded-2xl border border-primary/20 bg-secondary/50 px-6 py-8 text-center sm:px-8">
          <h2 className="text-xl font-semibold text-foreground">
            {t("stillHaveQuestions")}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {t("stillHaveQuestionsDescription")}
          </p>
          <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={site.phoneHref}
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {tc("call", { phone: site.phone })}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-border bg-card px-6 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {tc("emailUs")}
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}
