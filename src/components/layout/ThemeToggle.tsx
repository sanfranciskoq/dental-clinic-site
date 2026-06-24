"use client";

import { useEffect, useState } from "react";
import { Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { cn } from "@/lib/utils";

const toggleClassName = cn(
  "inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors",
  "hover:bg-accent hover:text-accent-foreground",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
);

function ThemeTogglePlaceholder({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={cn(toggleClassName, className)}
      aria-label="Toggle theme"
      disabled
      suppressHydrationWarning
    >
      <Moon aria-hidden />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !resolvedTheme) {
    return <ThemeTogglePlaceholder className={className} />;
  }

  return (
    <AnimatedThemeToggler
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      onThemeChange={setTheme}
      className={cn(toggleClassName, className)}
    />
  );
}
