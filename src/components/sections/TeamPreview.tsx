import { getLocale } from "next-intl/server";
import { getTeamMembers } from "@/lib/i18n/content";
import { Container } from "@/components/layout/Container";
import { TeamPreviewContent } from "@/components/sections/TeamPreviewContent";
import type { Locale } from "@/i18n/routing";

export async function TeamPreview() {
  const locale = (await getLocale()) as Locale;
  const members = getTeamMembers(locale);

  return (
    <section className="overflow-hidden py-16 md:py-24">
      <Container>
        <TeamPreviewContent members={members} />
      </Container>
    </section>
  );
}
