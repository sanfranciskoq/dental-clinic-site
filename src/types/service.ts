export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: string;
  duration: string;
  costRange: string;
  benefits: string[];
  steps: { title: string; description: string }[];
  faqIds: string[];
}
