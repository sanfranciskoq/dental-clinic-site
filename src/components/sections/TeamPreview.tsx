import { getLocale } from "next-intl/server";
import { getDentists } from "@/lib/i18n/content";
import { Container } from "@/components/layout/Container";
import { TeamPreviewContent } from "@/components/sections/TeamPreviewContent";
import type { Locale } from "@/i18n/routing";

export async function TeamPreview() {
  const locale = (await getLocale()) as Locale;
  const preview = getDentists(locale).slice(0, 3);

  return (
    <section className="py-16 md:py-24">
      <Container>
        <TeamPreviewContent members={preview} />
      </Container>
    </section>
  );
}
