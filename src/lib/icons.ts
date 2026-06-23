import {
  Sparkles,
  Sun,
  CircleDot,
  AlignCenter,
  Siren,
  Baby,
  Scan,
  Heart,
  FileText,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  Sun,
  CircleDot,
  AlignCenter,
  Siren,
  Baby,
  Scan,
  Heart,
  FileText,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Sparkles;
}
