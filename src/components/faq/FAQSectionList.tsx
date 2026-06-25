"use client";

import type { FAQItem } from "@/types/faq";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { getSiteConfig } from "@/lib/i18n/content";
import type { Locale } from "@/i18n/routing";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQSectionListProps {
  items: FAQItem[];
  showCategoryPrompt: boolean;
  listId?: string;
}

export function FAQSectionList({
  items,
  showCategoryPrompt,
  listId,
}: FAQSectionListProps) {
  const t = useTranslations("faq");
  const locale = useLocale() as Locale;
  const site = getSiteConfig(locale);

  if (showCategoryPrompt) {
    return (
      <p className="rounded-xl border border-dashed border-border bg-muted/30 px-6 py-10 text-center text-muted-foreground">
        {t("selectCategoryPrompt")}
      </p>
    );
  }

  if (items.length === 0) {
    return (
      <p className="rounded-xl border border-border bg-card px-6 py-10 text-center text-muted-foreground">
        {t.rich("noResultsWithCall", {
          callLink: () => (
            <a href={site.phoneHref} className="font-semibold text-primary">
              {t("callUsShort")}
            </a>
          ),
        })}
      </p>
    );
  }

  return (
    <Accordion
      id={listId}
      className={listId ? "scroll-mt-24 max-lg:scroll-mt-32" : undefined}
    >
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          value={item.id}
          id={item.category === "emergency" ? item.id : undefined}
        >
          <AccordionTrigger className="max-lg:text-base max-lg:py-3">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="max-lg:text-base">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
