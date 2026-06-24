import { getLocale } from "next-intl/server";
import { getWhyUsItems } from "@/lib/i18n/content";
import { Container } from "@/components/layout/Container";
import { WhyUsAnimated } from "@/components/sections/WhyUsAnimated";
import type { Locale } from "@/i18n/routing";

export async function WhyUs() {
  const locale = (await getLocale()) as Locale;
  const items = getWhyUsItems(locale);

  return (
    <section className="bg-muted/50 py-16 md:py-24">
      <Container>
        <WhyUsAnimated items={items} />
      </Container>
    </section>
  );
}
