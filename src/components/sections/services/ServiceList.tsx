"use client";

import { useCallback, useRef } from "react";
import { useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { Service } from "@/types/service";

interface ServiceListProps {
  services: Service[];
  activeIndex: number;
  onActiveChange: (index: number) => void;
}

export function ServiceList({
  services,
  activeIndex,
  onActiveChange,
}: ServiceListProps) {
  const router = useRouter();
  const listRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent, index: number) => {
      let nextIndex: number | null = null;

      if (event.key === "ArrowDown") {
        event.preventDefault();
        nextIndex = Math.min(index + 1, services.length - 1);
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        nextIndex = Math.max(index - 1, 0);
      } else if (event.key === "Home") {
        event.preventDefault();
        nextIndex = 0;
      } else if (event.key === "End") {
        event.preventDefault();
        nextIndex = services.length - 1;
      }

      if (nextIndex !== null) {
        onActiveChange(nextIndex);
        const buttons = listRef.current?.querySelectorAll<HTMLButtonElement>(
          '[role="option"]',
        );
        buttons?.[nextIndex]?.focus();
      }
    },
    [onActiveChange, services.length],
  );

  return (
    <div
      ref={listRef}
      role="listbox"
      aria-label="Services"
      className="flex flex-col"
    >
      {services.map((service, index) => {
        const isActive = activeIndex === index;
        const number = String(index + 1).padStart(2, "0");

        return (
          <div key={service.slug}>
            <button
              type="button"
              role="option"
              aria-selected={isActive}
              aria-label={`${number} ${service.title}`}
              onMouseEnter={() => onActiveChange(index)}
              onFocus={() => onActiveChange(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              onClick={() => router.push(`/services/${service.slug}`)}
              className={cn(
                "group flex w-full items-start gap-4 border-l-[3px] py-4 pr-2 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
                isActive
                  ? "border-l-primary translate-x-2"
                  : "border-l-transparent hover:translate-x-2 hover:border-l-primary/60",
              )}
            >
              <span
                className={cn(
                  "min-w-[2.5rem] text-2xl font-bold tabular-nums transition-colors duration-300 sm:text-3xl",
                  isActive
                    ? "text-primary"
                    : "text-primary/35 group-hover:text-primary/70",
                )}
              >
                {number}
              </span>
              <span className="min-w-0 flex-1">
                <span
                  className={cn(
                    "block text-xl font-semibold text-white transition-colors duration-300 sm:text-2xl",
                    isActive ? "text-white" : "text-white/85 group-hover:text-white",
                  )}
                >
                  {service.title}
                </span>
                <span
                  className={cn(
                    "mt-1 block text-sm leading-relaxed text-white/70 transition-all duration-300 sm:text-base",
                    isActive
                      ? "max-h-24 opacity-100"
                      : "max-h-0 overflow-hidden opacity-0 group-hover:max-h-24 group-hover:opacity-100 md:max-h-24 md:overflow-visible md:opacity-80",
                  )}
                >
                  {service.shortDescription}
                </span>
              </span>
            </button>
            {index < services.length - 1 && (
              <div className="ml-14 border-t border-white/15" aria-hidden />
            )}
          </div>
        );
      })}
    </div>
  );
}
