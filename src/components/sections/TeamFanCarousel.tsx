"use client";

import { useMemo } from "react";
import { useLocale } from "next-intl";
import {
  CardFanCarousel,
  type CardItem,
} from "@/components/ui/card-fan-carousel";
import type { TeamMember } from "@/types/team";
import type { Locale } from "@/i18n/routing";

function portraitImageUrl(url: string) {
  try {
    const parsed = new URL(url);
    parsed.searchParams.set("w", "400");
    parsed.searchParams.set("h", "700");
    parsed.searchParams.set("fit", "crop");
    if (parsed.searchParams.has("crop")) {
      parsed.searchParams.set("crop", "faces");
    }
    return parsed.toString();
  } catch {
    return url;
  }
}

interface TeamFanCarouselProps {
  members: TeamMember[];
}

export function TeamFanCarousel({ members }: TeamFanCarouselProps) {
  const locale = useLocale() as Locale;
  const prefix = locale === "en" ? "" : `/${locale}`;

  const cards = useMemo<CardItem[]>(
    () =>
      members.map((member) => ({
        imgUrl: portraitImageUrl(member.image),
        alt: `Portrait of ${member.name}`,
        linkUrl: `${prefix}/team/${member.slug}`,
        caption: member.name,
        subcaption: member.title,
      })),
    [members, prefix],
  );

  return <CardFanCarousel cards={cards} />;
}
