import { getTranslations } from "next-intl/server";
import { CTALink } from "@/components/shared/CTALink";
import { TeamFanCarousel } from "@/components/sections/TeamFanCarousel";
import type { TeamMember } from "@/types/team";

interface TeamPreviewContentProps {
  members: TeamMember[];
}

export async function TeamPreviewContent({ members }: TeamPreviewContentProps) {
  const t = await getTranslations("home.team");
  const tc = await getTranslations("common");

  return (
    <>
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            {t("eyebrow")}
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">{t("description")}</p>
        </div>
        <CTALink href="/team" variant="outline" className="shrink-0">
          {tc("viewFullTeam")}
        </CTALink>
      </div>

      <div className="mt-6 md:mt-10">
        <TeamFanCarousel members={members} />
      </div>
    </>
  );
}
