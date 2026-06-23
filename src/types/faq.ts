export type FAQCategory =
  | "general"
  | "appointments"
  | "insurance"
  | "procedures"
  | "emergency"
  | "pediatric";

export interface FAQItem {
  id: string;
  category: FAQCategory;
  question: string;
  answer: string;
  keywords?: string[];
}
