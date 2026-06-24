"use client";

import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FAQSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function FAQSearch({ value, onChange }: FAQSearchProps) {
  const t = useTranslations("faq");

  return (
    <div className="relative">
      <Label htmlFor="faq-search" className="sr-only">
        {t("searchLabel")}
      </Label>
      <Search
        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden
      />
      <Input
        id="faq-search"
        type="search"
        placeholder={t("searchPlaceholder")}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-11 rounded-xl pl-10"
      />
    </div>
  );
}
