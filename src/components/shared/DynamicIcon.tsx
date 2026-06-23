import { getIcon } from "@/lib/icons";
import type { LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {};

const ICON_NAMES = [
  "Sparkles",
  "Sun",
  "CircleDot",
  "AlignCenter",
  "Siren",
  "Baby",
  "Scan",
  "Heart",
  "FileText",
] as const;

for (const name of ICON_NAMES) {
  ICON_MAP[name] = getIcon(name);
}

interface DynamicIconProps {
  name: string;
  className?: string;
}

export function DynamicIcon({ name, className }: DynamicIconProps) {
  const Icon = ICON_MAP[name] ?? ICON_MAP.Sparkles;
  return <Icon className={className} aria-hidden />;
}
