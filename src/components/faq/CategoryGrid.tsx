"use client";

import type { FAQCategory } from "@/types/faq";
import { useTranslations } from "next-intl";
import { getCategoryTheme } from "@/lib/category-theme";
import { cn } from "@/lib/utils";

interface CategoryGridProps {
  activeCategory: FAQCategory | null;
  onSelect: (category: FAQCategory) => void;
}

const categories = [
  "general",
  "appointments",
  "insurance",
  "procedures",
  "emergency",
  "pediatric",
] as const satisfies readonly FAQCategory[];

export function CategoryGrid({ activeCategory, onSelect }: CategoryGridProps) {
  const t = useTranslations("faq");
  const tc = useTranslations("faq.categories");

  return (
    <div
      className="flex flex-wrap justify-center gap-3 max-lg:flex-nowrap max-lg:justify-start max-lg:overflow-x-auto max-lg:pb-2 max-lg:scrollbar-thin max-lg:snap-x"
      role="group"
      aria-label={t("filterByCategory")}
    >
      {categories.map((category) => {
        const theme = getCategoryTheme(category);
        const Icon = theme.icon;
        const isActive = activeCategory === category;

        return (
          <button
            key={category}
            type="button"
            onClick={() => onSelect(category)}
            aria-pressed={isActive}
            className={cn(
              "group relative flex shrink-0 snap-start items-center justify-center rounded-full border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 max-lg:h-auto max-lg:min-h-11 max-lg:gap-2 max-lg:px-4 max-lg:py-2 lg:size-14",
              theme.grid,
              isActive && "ring-2 ring-primary ring-offset-2",
            )}
          >
            <Icon className="size-5 shrink-0 lg:size-6" aria-hidden />
            <span className="max-lg:text-xs max-lg:font-medium lg:sr-only">
              {tc(category)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
