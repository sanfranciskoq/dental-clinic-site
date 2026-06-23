import { Star, Award, Users, UserPlus } from "lucide-react";
import { siteConfig } from "@/lib/constants";
import { Container } from "@/components/layout/Container";

const stats = [
  {
    icon: Star,
    value: `${siteConfig.stats.rating}★`,
    label: `${siteConfig.stats.reviewCount} Google reviews`,
  },
  {
    icon: Award,
    value: `${siteConfig.stats.yearsInPractice}+`,
    label: "Years in practice",
  },
  {
    icon: Users,
    value: siteConfig.stats.patientsServed,
    label: "Patients served",
  },
  {
    icon: UserPlus,
    value: "Welcome",
    label: "New patients accepted",
  },
];

export function TrustBar() {
  return (
    <section aria-label="Clinic credentials" className="border-y border-border bg-card">
      <Container className="grid grid-cols-2 gap-6 py-8 md:grid-cols-4 md:gap-8">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center text-center">
            <stat.icon
              className="mb-2 size-6 text-primary"
              aria-hidden
            />
            <p className="text-xl font-bold text-foreground sm:text-2xl">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </Container>
    </section>
  );
}
