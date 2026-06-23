import type { FAQCategory } from "@/types/faq";
import {
  HelpCircle,
  Calendar,
  Shield,
  Sparkles,
  AlertCircle,
  Baby,
  type LucideIcon,
} from "lucide-react";

export const CATEGORY_LABELS: Record<FAQCategory, string> = {
  general: "General",
  appointments: "Appointments",
  insurance: "Insurance & Payment",
  procedures: "Procedures",
  emergency: "Emergency",
  pediatric: "Pediatric",
};

export const CATEGORY_THEMES: Record<
  FAQCategory,
  { grid: string; icon: LucideIcon }
> = {
  general: {
    grid: "bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200",
    icon: HelpCircle,
  },
  appointments: {
    grid: "bg-sky-100 text-sky-700 hover:bg-sky-200 border-sky-200",
    icon: Calendar,
  },
  insurance: {
    grid: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-200",
    icon: Shield,
  },
  procedures: {
    grid: "bg-violet-100 text-violet-700 hover:bg-violet-200 border-violet-200",
    icon: Sparkles,
  },
  emergency: {
    grid: "bg-rose-100 text-rose-700 hover:bg-rose-200 border-rose-200",
    icon: AlertCircle,
  },
  pediatric: {
    grid: "bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-200",
    icon: Baby,
  },
};

export function getCategoryTheme(category: FAQCategory) {
  return CATEGORY_THEMES[category];
}
