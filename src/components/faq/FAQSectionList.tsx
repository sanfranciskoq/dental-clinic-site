"use client";

import type { FAQItem } from "@/types/faq";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQSectionListProps {
  items: FAQItem[];
  showCategoryPrompt: boolean;
}

export function FAQSectionList({
  items,
  showCategoryPrompt,
}: FAQSectionListProps) {
  if (showCategoryPrompt) {
    return (
      <p className="rounded-xl border border-dashed border-border bg-muted/30 px-6 py-10 text-center text-muted-foreground">
        Select a topic above to browse questions, or use search to find
        answers across all categories.
      </p>
    );
  }

  if (items.length === 0) {
    return (
      <p className="rounded-xl border border-border bg-card px-6 py-10 text-center text-muted-foreground">
        No questions match your search. Try different keywords or{" "}
        <a href="tel:+15125550142" className="font-semibold text-primary">
          call us
        </a>{" "}
        for help.
      </p>
    );
  }

  return (
    <Accordion>
      {items.map((item) => (
        <AccordionItem key={item.id} value={item.id} id={item.category === "emergency" ? item.id : undefined}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
