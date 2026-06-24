import { Container } from "@/components/layout/Container";
import { TestimonialsAnimated } from "@/components/sections/TestimonialsAnimated";

export function Testimonials() {
  return (
    <section className="bg-secondary/40 py-16 md:py-24">
      <Container>
        <TestimonialsAnimated />
      </Container>
    </section>
  );
}
