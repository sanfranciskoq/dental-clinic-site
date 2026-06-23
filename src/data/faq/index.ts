import type { FAQItem } from "@/types/faq";

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "office-hours",
    category: "general",
    question: "What are your office hours?",
    answer:
      "We are open Monday through Friday from 8:00 AM to 6:00 PM, and Saturday from 9:00 AM to 2:00 PM. We are closed on Sundays and major holidays.",
    keywords: ["hours", "open", "schedule"],
  },
  {
    id: "new-patient-forms",
    category: "general",
    question: "Do I need to fill out forms before my first visit?",
    answer:
      "Yes. New patients should complete health history and consent forms before arriving. We will email them when you book. Arriving 15 minutes early helps us start on time.",
    keywords: ["forms", "paperwork", "first visit"],
  },
  {
    id: "parking",
    category: "general",
    question: "Is parking available at the clinic?",
    answer:
      "Yes, we offer free parking in the lot behind our building. Accessible spaces are located near the main entrance.",
    keywords: ["parking", "accessibility"],
  },
  {
    id: "languages",
    category: "general",
    question: "What languages does your staff speak?",
    answer:
      "Our team provides care in English and Spanish. Interpreter services can be arranged with advance notice.",
    keywords: ["language", "spanish"],
  },
  {
    id: "book-appointment",
    category: "appointments",
    question: "How do I schedule an appointment?",
    answer:
      "Book online through our appointment form, call our front desk, or use the contact form. For urgent concerns, please call us directly.",
    keywords: ["book", "schedule"],
  },
  {
    id: "cancellation-policy",
    category: "appointments",
    question: "What is your cancellation policy?",
    answer:
      "We ask for at least 24 hours' notice to cancel or reschedule. Late cancellations may incur a fee. Emergencies happen — call us as soon as possible.",
    keywords: ["cancel", "reschedule"],
  },
  {
    id: "first-visit",
    category: "appointments",
    question: "What should I expect at my first visit?",
    answer:
      "Your first visit includes a comprehensive exam, digital X-rays if needed, and a discussion of your goals. Plan for about 60–90 minutes.",
    keywords: ["first visit", "exam"],
  },
  {
    id: "running-late",
    category: "appointments",
    question: "What if I am running late?",
    answer:
      "Please call if you expect to be more than 10 minutes late. We may need to shorten your visit or reschedule to avoid delaying other patients.",
    keywords: ["late", "delay"],
  },
  {
    id: "accepted-insurance",
    category: "insurance",
    question: "Which insurance plans do you accept?",
    answer:
      "We accept most major PPO plans including Delta Dental, Cigna, Aetna, MetLife, and Guardian. Contact us to verify your benefits.",
    keywords: ["insurance", "ppo"],
  },
  {
    id: "payment-options",
    category: "insurance",
    question: "What payment options are available?",
    answer:
      "We accept cash, credit cards, HSA/FSA, and offer financing through CareCredit for larger treatments.",
    keywords: ["payment", "financing"],
  },
  {
    id: "cost-estimate",
    category: "insurance",
    question: "Can I get a cost estimate before treatment?",
    answer:
      "Absolutely. After your exam, we provide a written treatment plan with itemized costs and estimated insurance coverage.",
    keywords: ["cost", "estimate"],
  },
  {
    id: "no-insurance",
    category: "insurance",
    question: "Do you see patients without insurance?",
    answer:
      "Yes. We offer a membership plan with cleanings, exams, and discounts on other services.",
    keywords: ["uninsured", "membership"],
  },
  {
    id: "cleaning-frequency",
    category: "procedures",
    question: "How often should I get a dental cleaning?",
    answer:
      "Most patients benefit from a cleaning every six months. Gum disease may require visits every three to four months.",
    keywords: ["cleaning", "frequency"],
  },
  {
    id: "teeth-whitening",
    category: "procedures",
    question: "Do you offer teeth whitening?",
    answer:
      "Yes — in-office whitening for fast results and custom take-home trays for gradual brightening.",
    keywords: ["whitening", "cosmetic"],
  },
  {
    id: "dental-implants",
    category: "procedures",
    question: "What are dental implants and am I a candidate?",
    answer:
      "Implants replace missing tooth roots with titanium posts. We use 3D imaging to evaluate candidacy and discuss all options.",
    keywords: ["implants", "missing teeth"],
  },
  {
    id: "braces-invisalign",
    category: "procedures",
    question: "Do you offer braces or Invisalign?",
    answer:
      "We provide Invisalign for mild to moderate cases. Complex cases may be referred to a trusted specialist.",
    keywords: ["invisalign", "orthodontics"],
  },
  {
    id: "knocked-out-tooth",
    category: "emergency",
    question: "What should I do if a tooth is knocked out?",
    answer:
      "Handle by the crown, rinse gently, try to reinsert or keep in milk. Call immediately — best chance within 30–60 minutes.",
    keywords: ["knocked out", "trauma"],
  },
  {
    id: "severe-pain",
    category: "emergency",
    question: "I have severe tooth pain. What should I do?",
    answer:
      "Call us right away. Rinse with warm salt water and use OTC pain relievers as directed. We prioritize same-day visits when possible.",
    keywords: ["pain", "toothache"],
  },
  {
    id: "after-hours",
    category: "emergency",
    question: "How do I reach you after hours?",
    answer:
      "Our after-hours line connects you to an on-call dentist for true emergencies. Non-urgent messages are returned next business day.",
    keywords: ["after hours", "emergency"],
  },
  {
    id: "first-pediatric-visit",
    category: "pediatric",
    question: "When should my child have their first dental visit?",
    answer:
      "By age one or within six months of the first tooth erupting, per AAPD guidelines.",
    keywords: ["child", "first visit"],
  },
  {
    id: "child-anxiety",
    category: "pediatric",
    question: "How do you help anxious children?",
    answer:
      "Tell-show-do approach, positive reinforcement, nitrous oxide, and parents welcome in the room.",
    keywords: ["anxiety", "children"],
  },
  {
    id: "fluoride-sealants",
    category: "pediatric",
    question: "Do you recommend fluoride treatments and sealants?",
    answer:
      "Yes, when appropriate. We tailor recommendations to age, cavity risk, and fluoride exposure.",
    keywords: ["fluoride", "sealants"],
  },
  {
    id: "x-rays-children",
    category: "pediatric",
    question: "Are dental X-rays safe for children?",
    answer:
      "Digital X-rays emit very low radiation. We follow ALARA principles and only image when clinically necessary.",
    keywords: ["x-rays", "safety"],
  },
];

export function getFaqItems(): FAQItem[] {
  return FAQ_ITEMS;
}

export function getFaqByIds(ids: string[]): FAQItem[] {
  return FAQ_ITEMS.filter((item) => ids.includes(item.id));
}

export const insuranceProviders = [
  "Delta Dental",
  "Cigna",
  "Aetna",
  "MetLife",
  "Guardian",
  "Blue Cross",
  "United Healthcare",
];

export const whyUsItems = [
  {
    title: "Same-day emergencies",
    description:
      "We reserve daily slots for urgent pain, trauma, and swelling — call and we'll do our best to see you today.",
    icon: "Siren",
  },
  {
    title: "Digital X-rays & 3D imaging",
    description:
      "Lower radiation, faster results, and precise planning for implants and Invisalign.",
    icon: "Scan",
  },
  {
    title: "Sedation options",
    description:
      "Nitrous oxide and oral sedation for anxious patients. Your comfort is never an afterthought.",
    icon: "Heart",
  },
  {
    title: "Transparent estimates",
    description:
      "Written treatment plans with insurance breakdown before you commit to any procedure.",
    icon: "FileText",
  },
];

export const aboutContent = {
  story:
    "Bright Smile Dental began in 2010 when Dr. Sarah Chen saw a gap in Austin: practices that were either impersonal chains or intimidating specialty offices. She built a clinic where advanced technology meets human warmth — where you're greeted by name and leave understanding your options.",
  mission:
    "To deliver exceptional dental care that reduces anxiety, respects your time, and earns your trust visit after visit.",
  technology: [
    "Digital X-rays (90% less radiation)",
    "iTero intraoral scanner (no messy impressions)",
    "CBCT 3D imaging for implant planning",
    "Intraoral cameras so you see what we see",
    "Paperless charting and online forms",
  ],
  certifications: [
    "ADA Member Practice",
    "OSHA & CDC infection control compliant",
    "HIPAA-compliant records",
    "Continuing education — 40+ hours annually per provider",
  ],
};
