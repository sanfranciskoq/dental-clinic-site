import type { Service } from "@/types/service";
import { getServiceHeaderImage } from "@/lib/services-assets";

const baseServices = [
  {
    slug: "cleanings",
    title: "Cleanings & Checkups",
    shortDescription: "Preventive care to keep your smile healthy year-round.",
    description:
      "Regular cleanings and exams are the foundation of oral health. Our hygienists use gentle techniques and digital tools to remove plaque, check for early signs of decay, and personalize your home-care routine.",
    icon: "Sparkles",
    duration: "45–60 minutes",
    costRange: "$120–$180 (often covered by insurance)",
    benefits: [
      "Cavity and gum disease prevention",
      "Fresh, polished feel after every visit",
      "Personalized hygiene coaching",
    ],
    steps: [
      {
        title: "Comprehensive exam",
        description: "Your dentist reviews your health history and checks teeth, gums, and bite.",
      },
      {
        title: "Professional cleaning",
        description: "Plaque and tartar are removed with ultrasonic and hand instruments.",
      },
      {
        title: "Polish & fluoride",
        description: "Teeth are polished; fluoride is offered when appropriate.",
      },
      {
        title: "Treatment plan",
        description: "We discuss findings and schedule any follow-up care you need.",
      },
    ],
    faqIds: ["cleaning-frequency", "first-visit", "cost-estimate"],
  },
  {
    slug: "teeth-whitening",
    title: "Teeth Whitening",
    shortDescription: "Brighter smiles with safe, professional whitening options.",
    description:
      "Whether you want fast in-office results or gradual at-home brightening, we customize whitening to your sensitivity level and goals. We assess enamel health first so you get results without compromising your teeth.",
    icon: "Sun",
    duration: "60–90 minutes (in-office)",
    costRange: "$350–$600",
    benefits: [
      "Noticeable results in one visit or 2 weeks at home",
      "Custom trays for even, comfortable whitening",
      "Sensitivity-managed protocols",
    ],
    steps: [
      {
        title: "Consultation",
        description: "We evaluate staining causes and whether whitening is right for you.",
      },
      {
        title: "Preparation",
        description: "Gums are protected; shade is recorded for comparison.",
      },
      {
        title: "Treatment",
        description: "Professional-grade gel is applied in controlled cycles.",
      },
      {
        title: "Aftercare",
        description: "You receive guidance on foods to avoid and maintenance options.",
      },
    ],
    faqIds: ["teeth-whitening", "cost-estimate"],
  },
  {
    slug: "dental-implants",
    title: "Dental Implants",
    shortDescription: "Permanent tooth replacement that looks and feels natural.",
    description:
      "Implants restore function and confidence when teeth are missing. We use 3D imaging to plan placement precisely and coordinate with trusted specialists for complex cases when needed.",
    icon: "CircleDot",
    duration: "Multiple visits over 3–6 months",
    costRange: "$3,500–$6,000 per implant (varies by case)",
    benefits: [
      "Long-lasting, stable tooth replacement",
      "Preserves jawbone and facial structure",
      "No impact on adjacent healthy teeth",
    ],
    steps: [
      {
        title: "3D evaluation",
        description: "CBCT scan assesses bone quality and nerve position.",
      },
      {
        title: "Implant placement",
        description: "Titanium post is placed with local anesthesia or sedation.",
      },
      {
        title: "Healing period",
        description: "Bone integrates with the implant over several weeks.",
      },
      {
        title: "Crown delivery",
        description: "Custom crown is attached for a natural finish.",
      },
    ],
    faqIds: ["dental-implants", "payment-options", "cost-estimate"],
  },
  {
    slug: "invisalign",
    title: "Invisalign",
    shortDescription: "Clear aligners for straighter teeth without metal braces.",
    description:
      "Invisalign gradually moves teeth using a series of clear, removable aligners. Ideal for adults and teens with mild to moderate crowding or spacing — with fewer office visits than traditional braces.",
    icon: "AlignCenter",
    duration: "6–18 months (average)",
    costRange: "$4,000–$7,000",
    benefits: [
      "Nearly invisible aligners",
      "Removable for eating and brushing",
      "Digital preview of your future smile",
    ],
    steps: [
      {
        title: "Digital scan",
        description: "No messy impressions — we scan your teeth in minutes.",
      },
      {
        title: "Treatment preview",
        description: "See a simulation of your expected results before you start.",
      },
      {
        title: "Aligner series",
        description: "Wear each set 20–22 hours daily, changing every 1–2 weeks.",
      },
      {
        title: "Retention",
        description: "Retainers maintain your new smile long-term.",
      },
    ],
    faqIds: ["braces-invisalign", "cost-estimate"],
  },
  {
    slug: "emergency-care",
    title: "Emergency Care",
    shortDescription: "Same-day relief for toothaches, trauma, and urgent pain.",
    description:
      "Dental emergencies are stressful — we reserve daily slots for urgent cases. Call us immediately for severe pain, swelling, knocked-out teeth, or broken restorations.",
    icon: "Siren",
    duration: "Same-day when possible",
    costRange: "Varies; we discuss costs before treatment",
    benefits: [
      "Same-day emergency appointments",
      "After-hours on-call dentist",
      "Gentle pain management options",
    ],
    steps: [
      {
        title: "Call immediately",
        description: "Describe symptoms so we can triage and prepare for your arrival.",
      },
      {
        title: "Urgent evaluation",
        description: "We prioritize pain relief and diagnose the underlying issue.",
      },
      {
        title: "Stabilizing treatment",
        description: "Temporary or definitive care to stop pain and prevent worsening.",
      },
      {
        title: "Follow-up plan",
        description: "We schedule any additional treatment needed for full recovery.",
      },
    ],
    faqIds: ["severe-pain", "knocked-out-tooth", "after-hours"],
  },
  {
    slug: "pediatric-dentistry",
    title: "Pediatric Dentistry",
    shortDescription: "Positive dental experiences for infants, kids, and teens.",
    description:
      "Our kid-friendly team makes early visits fun and fear-free. From first tooth to braces-ready teens, we focus on prevention, education, and building lifelong healthy habits.",
    icon: "Baby",
    duration: "30–45 minutes",
    costRange: "Often fully covered for children under most plans",
    benefits: [
      "Tell-show-do approach for anxious kids",
      "Nitrous oxide available",
      "Parents welcome in the treatment room",
    ],
    steps: [
      {
        title: "Meet & greet",
        description: "We introduce tools and let your child explore the chair at their pace.",
      },
      {
        title: "Gentle exam",
        description: "Age-appropriate check of teeth, gums, and development.",
      },
      {
        title: "Cleaning & prevention",
        description: "Cleaning, fluoride, or sealants when recommended.",
      },
      {
        title: "Parent coaching",
        description: "Tips on brushing, diet, and when to return.",
      },
    ],
    faqIds: ["first-pediatric-visit", "child-anxiety", "fluoride-sealants"],
  },
];

export const services: Service[] = baseServices.map((service) => ({
  ...service,
  headerImage: getServiceHeaderImage(service.slug),
}));

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getRelatedServices(slug: string, limit = 3): Service[] {
  return services.filter((s) => s.slug !== slug).slice(0, limit);
}
