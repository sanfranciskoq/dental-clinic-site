import { getLocale } from "next-intl/server";
import { getTestimonials } from "@/lib/i18n/content";
import { Container } from "@/components/layout/Container";
import { TestimonialsAnimated } from "@/components/sections/TestimonialsAnimated";
import type { Locale } from "@/i18n/routing";

export async function Testimonials() {
  const locale = (await getLocale()) as Locale;
  const testimonials = getTestimonials(locale).slice(0, 6);

  return (
    <section className="bg-secondary/40 py-16 md:py-24">
      <Container>
        <TestimonialsAnimated testimonials={testimonials} />
      </Container>
    </section>
  );
}
