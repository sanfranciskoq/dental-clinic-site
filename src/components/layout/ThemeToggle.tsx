"use client";

import { Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { cn } from "@/lib/utils";

const toggleClassName = cn(
  "inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors",
  "hover:bg-accent hover:text-accent-foreground",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
);

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  if (!resolvedTheme) {
    return (
      <button
        type="button"
        className={cn(toggleClassName, className)}
        aria-label="Toggle theme"
        disabled
      >
        <Moon className="size-4 opacity-50" />
      </button>
    );
  }

  return (
    <AnimatedThemeToggler
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      onThemeChange={setTheme}
      className={cn(toggleClassName, className)}
    />
  );
}
