import { services } from "@/data/services";
import { Container } from "@/components/layout/Container";
import {
  ServicesCardsAnimated,
  ServicesIntroAnimated,
} from "@/components/sections/services/ServicesAnimated";

export function ServicesGrid() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-14">
          <ServicesIntroAnimated />
          <ServicesCardsAnimated services={services} />
        </div>
      </Container>
    </section>
  );
}
