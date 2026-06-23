"use client";

import type { FAQCategory } from "@/types/faq";
import {
  CATEGORY_LABELS,
  getCategoryTheme,
} from "@/lib/category-theme";
import { cn } from "@/lib/utils";

interface CategoryGridProps {
  activeCategory: FAQCategory | null;
  onSelect: (category: FAQCategory) => void;
}

const categories = Object.keys(CATEGORY_LABELS) as FAQCategory[];

export function CategoryGrid({ activeCategory, onSelect }: CategoryGridProps) {
  return (
    <div
      className="flex flex-wrap justify-center gap-3"
      role="group"
      aria-label="Filter by category"
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
              "group relative flex size-14 items-center justify-center rounded-full border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              theme.grid,
              isActive && "ring-2 ring-primary ring-offset-2",
            )}
          >
            <Icon className="size-6" aria-hidden />
            <span
              role="tooltip"
              className="pointer-events-none absolute -bottom-9 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-800 px-2 py-1 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
            >
              {CATEGORY_LABELS[category]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
