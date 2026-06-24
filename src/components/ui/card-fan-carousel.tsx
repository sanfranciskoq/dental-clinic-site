"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

export interface CardItem {
  imgUrl: string;
  alt?: string;
  linkUrl?: string;
  caption?: string;
  subcaption?: string;
}

interface CardFanCarouselProps {
  cards: CardItem[];
}

const MAX_VISIBLE = 8;
const CENTER_Z_INDEX = 40;
const HOVER_Z_INDEX = 50;
const ENTRANCE_SEEN_KEY = "dental-clinic-fan-carousel-intro-seen";

function getCenterSlot(visibleCount: number) {
  return Math.floor((visibleCount - 1) / 2);
}

function buildFanPositions(visibleCount: number) {
  const center = (visibleCount - 1) / 2;
  const centerSlot = getCenterSlot(visibleCount);

  return Array.from({ length: visibleCount }, (_, slot) => {
    const distance = center > 0 ? (slot - center) / center : 0;
    const absDistance = Math.abs(distance);
    const distFromCenter = Math.abs(slot - centerSlot);

    return {
      rot: distance * 21,
      scale: 1.0 - 0.2244 * absDistance * absDistance,
      x: distance * 30,
      y: absDistance * absDistance * 7.3,
      zIndex: CENTER_Z_INDEX - distFromCenter * 4,
    };
  });
}

function getSlotZIndex(slot: number, centerSlot: number, hoveredSlot: number | null) {
  if (hoveredSlot !== null && slot === hoveredSlot) return HOVER_Z_INDEX;
  if (slot === centerSlot) return CENTER_Z_INDEX;
  return CENTER_Z_INDEX - Math.abs(slot - centerSlot) * 4;
}

function getResponsiveMultiplier(width: number) {
  if (width < 480) return 0.28;
  if (width < 640) return 0.38;
  if (width < 768) return 0.5;
  if (width < 1024) return 0.75;
  return 1.0;
}

function getHeightMultiplier(width: number) {
  let idealPx: number;
  if (width < 480) idealPx = 22 * 16;
  else if (width < 640) idealPx = 26 * 16;
  else if (width < 768) idealPx = 28 * 16;
  else if (width < 1024) idealPx = 34 * 16;
  else idealPx = 38 * 16;

  const available = window.innerHeight * 0.7;
  if (available >= idealPx) return 1;
  return available / idealPx;
}

function getSlotConfig(positions: ReturnType<typeof buildFanPositions>, slot: number) {
  return positions[slot];
}

const ARROW_CLASSES =
  "relative flex items-center justify-center rounded-full border-[1.5px] border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 backdrop-blur-[16px] text-black/40 dark:text-white/55 cursor-pointer shrink-0 z-30 outline-none shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:border-black/25 dark:hover:border-white/25 hover:text-black/70 dark:hover:text-white/80 active:opacity-70 transition-colors duration-300 before:content-[''] before:absolute before:inset-[3px] before:rounded-full before:border before:border-black/[0.04] dark:before:border-white/[0.04] before:pointer-events-none";

function CardImage({ card, index }: { card: CardItem; index: number }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <img
        src={card.imgUrl}
        loading="lazy"
        alt={card.alt || `Card ${index}`}
        className="absolute inset-0 z-10 h-full w-full object-cover"
      />
      {(card.caption || card.subcaption) && (
        <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/75 via-black/40 to-transparent px-4 pb-4 pt-10">
          {card.caption && (
            <p className="text-sm font-semibold text-white">{card.caption}</p>
          )}
          {card.subcaption && (
            <p className="text-xs text-white/85">{card.subcaption}</p>
          )}
        </div>
      )}
    </div>
  );
}

export function CardFanCarousel({ cards }: CardFanCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const hasEntered = useRef(false);
  const directionRef = useRef<"left" | "right" | null>(null);
  const prevVisible = useRef<Set<number>>(new Set());

  const totalCards = cards.length;
  const visibleCount = Math.min(totalCards, MAX_VISIBLE);
  const centerSlot = getCenterSlot(visibleCount);
  const needsPagination = totalCards > 1;
  const [centerIndex, setCenterIndex] = useState(Math.floor(totalCards / 2));

  const getVisibleMap = useCallback(
    (center: number) => {
      const map = new Map<number, number>();

      for (let slot = 0; slot < visibleCount; slot++) {
        const cardIndex =
          ((center + slot - centerSlot) % totalCards + totalCards) % totalCards;
        map.set(cardIndex, slot);
      }

      return map;
    },
    [totalCards, visibleCount, centerSlot],
  );

  const selectCard = useCallback(
    (index: number) => {
      if (isAnimating.current || index === centerIndex) return;
      isAnimating.current = true;
      const forward = (index - centerIndex + totalCards) % totalCards;
      const backward = (centerIndex - index + totalCards) % totalCards;
      directionRef.current = forward <= backward ? "right" : "left";
      setCenterIndex(index);
    },
    [centerIndex, totalCards],
  );

  const cycle = useCallback(
    (direction: "left" | "right") => {
      if (isAnimating.current || totalCards <= 1) return;
      isAnimating.current = true;
      directionRef.current = direction;
      setCenterIndex((prev) =>
        direction === "right"
          ? (prev + 1) % totalCards
          : (prev - 1 + totalCards) % totalCards,
      );
    },
    [totalCards],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !totalCards) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const cardElements = Array.from(
      container.querySelectorAll<HTMLElement>(".fan-card"),
    );
    if (!cardElements.length) return;

    const visibleMap = getVisibleMap(centerIndex);
    const previouslyVisible = prevVisible.current;
    const direction = directionRef.current;
    const skipEntrance =
      typeof window !== "undefined" &&
      sessionStorage.getItem(ENTRANCE_SEEN_KEY) === "1";
    const isFirstMount = !hasEntered.current && !skipEntrance;
    const multiplier = getResponsiveMultiplier(window.innerWidth);
    const hMult = getHeightMultiplier(window.innerWidth);
    const fanPositions = buildFanPositions(visibleCount);
    const config = (slot: number) => getSlotConfig(fanPositions, slot);

    if (isFirstMount) isAnimating.current = true;

    let completedCount = 0;
    const animatedCardCount = visibleMap.size;
    const onCardDone = () => {
      if (++completedCount >= animatedCardCount) {
        isAnimating.current = false;
        if (isFirstMount) {
          hasEntered.current = true;
          sessionStorage.setItem(ENTRANCE_SEEN_KEY, "1");
        }
      }
    };

    cardElements.forEach((card, cardIndex) => {
      const slot = visibleMap.get(cardIndex);
      const wasVisible = previouslyVisible.has(cardIndex);

      if (slot !== undefined) {
        const { x, y, rot, scale } = config(slot);
        const zIndex = getSlotZIndex(slot, centerSlot, null);
        const target = {
          x: `${x * multiplier}rem`,
          y: `${y * hMult}rem`,
          rotation: rot,
          scale,
          opacity: 1,
          zIndex,
        };

        gsap.set(card, { zIndex, pointerEvents: "auto" });

        if (prefersReducedMotion) {
          gsap.set(card, target);
          onCardDone();
        } else if (isFirstMount) {
          gsap.set(card, {
            x: 0,
            y: `${12 * hMult}rem`,
            rotation: 0,
            scale: 0.5,
            opacity: 0,
          });
          gsap.to(card, {
            ...target,
            duration: 0.75,
            ease: "power3.out",
            delay: 0.2 + slot * 0.06,
            onComplete: onCardDone,
          });
        } else if (!wasVisible) {
          const enterX = direction === "right" ? 40 : -40;
          gsap.set(card, {
            x: `${enterX}rem`,
            y: `${y * hMult}rem`,
            rotation: direction === "right" ? 30 : -30,
            scale: 0.5,
            opacity: 0,
          });
          gsap.to(card, {
            ...target,
            duration: 0.6,
            ease: "power2.out",
            onComplete: onCardDone,
          });
        } else {
          gsap.to(card, {
            ...target,
            duration: 0.5,
            ease: "power2.out",
            onComplete: onCardDone,
          });
        }
      } else if (wasVisible) {
        const exitX = direction === "right" ? -40 : 40;
        gsap.set(card, { zIndex: 0, pointerEvents: "none" });
        if (prefersReducedMotion) {
          gsap.set(card, { opacity: 0, zIndex: 0 });
        } else {
          gsap.to(card, {
            x: `${exitX}rem`,
            opacity: 0,
            scale: 0.5,
            rotation: direction === "right" ? -30 : 30,
            duration: 0.4,
            ease: "power2.in",
            zIndex: 0,
          });
        }
      } else if (isFirstMount) {
        gsap.set(card, { opacity: 0, scale: 0.3, x: 0, y: 0, zIndex: 0, pointerEvents: "none" });
      } else {
        gsap.set(card, { opacity: 0, zIndex: 0, pointerEvents: "none" });
      }
    });

    prevVisible.current = new Set(visibleMap.keys());

    if (prefersReducedMotion) return;

    const visibleEntries: { el: HTMLElement; slot: number }[] = [];
    cardElements.forEach((el, i) => {
      const slot = visibleMap.get(i);
      if (slot !== undefined) visibleEntries.push({ el, slot });
    });
    visibleEntries.sort((a, b) => a.slot - b.slot);

    let activeSlot: number | null = null;
    let leaveTimer: ReturnType<typeof setTimeout> | null = null;
    const layoutCenterSlot = visibleEntries.length >> 1;

    const updateHoverLayout = (hoveredSlot: number | null) => {
      const mult = getResponsiveMultiplier(window.innerWidth);
      const hM = getHeightMultiplier(window.innerWidth);

      visibleEntries.forEach(({ el, slot }) => {
        const base = config(slot);
        let targetX = base.x * mult;
        let targetY = base.y * hM;
        let targetRot = base.rot;
        let targetScale = base.scale;
        let delay = 0;

        if (hoveredSlot !== null) {
          const distance = Math.abs(slot - hoveredSlot);
          delay = distance * 0.02;

          if (slot === hoveredSlot) {
            targetY -= 2.5 * hM;
            targetScale *= 1.08;
          } else {
            const normalized =
              layoutCenterSlot > 0
                ? (slot - layoutCenterSlot) / layoutCenterSlot
                : 0;
            const pushStrength =
              8 * (1 - Math.abs(normalized)) * (1 + 0.2 * Math.max(0, 3 - distance));

            if (slot < hoveredSlot) {
              targetX -= pushStrength * mult;
              targetRot -= 3 / (distance + 1);
            } else {
              targetX += pushStrength * mult;
              targetRot += 3 / (distance + 1);
            }

            if (
              slot === visibleEntries.length - 1 &&
              hoveredSlot < layoutCenterSlot
            ) {
              targetY -= 1 * hM;
            }
            if (slot === 0 && hoveredSlot > layoutCenterSlot) targetY -= 1 * hM;
          }
        } else {
          delay = Math.abs(slot - layoutCenterSlot) * 0.02;
        }

        gsap.to(el, {
          x: `${targetX}rem`,
          y: `${targetY}rem`,
          rotation: targetRot,
          scale: targetScale,
          duration: 0.5,
          delay,
          ease: "elastic.out(1,.75)",
          overwrite: "auto",
        });
        gsap.set(el, { zIndex: getSlotZIndex(slot, centerSlot, hoveredSlot) });
      });
    };

    const enterHandlers = visibleEntries.map(({ el, slot }) => {
      const handler = () => {
        if (isAnimating.current) return;
        if (leaveTimer) {
          clearTimeout(leaveTimer);
          leaveTimer = null;
        }
        if (activeSlot !== slot) {
          activeSlot = slot;
          updateHoverLayout(slot);
        }
      };
      el.addEventListener("mouseenter", handler);
      return { el, handler };
    });

    const onMouseLeave = () => {
      if (isAnimating.current) return;
      if (leaveTimer) clearTimeout(leaveTimer);
      leaveTimer = setTimeout(() => {
        activeSlot = null;
        updateHoverLayout(null);
      }, 50);
    };
    container.addEventListener("mouseleave", onMouseLeave);

    const onResize = () => {
      if (!isAnimating.current) updateHoverLayout(activeSlot);
    };
    window.addEventListener("resize", onResize);

    return () => {
      enterHandlers.forEach(({ el, handler }) =>
        el.removeEventListener("mouseenter", handler),
      );
      container.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
      if (leaveTimer) clearTimeout(leaveTimer);
    };
  }, [centerIndex, totalCards, getVisibleMap, visibleCount, centerSlot]);

  if (!totalCards) return null;

  const chevron = (direction: "left" | "right") => (
    <svg
      className="relative z-[2] h-4 w-4 md:h-5 md:w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline
        points={
          direction === "left" ? "15 18 9 12 15 6" : "9 18 15 12 9 6"
        }
      />
    </svg>
  );

  return (
    <section className="relative z-20 flex w-full flex-col items-center px-4 py-4 md:px-8 lg:py-8">
      <div className="flex w-full max-w-[90rem] items-center justify-center">
        <div
          ref={containerRef}
          className="fan-layout flex relative w-full max-w-[80rem] items-center justify-center"
        >
          {cards.map((card, index) => {
            const image = <CardImage card={card} index={index} />;
            return card.linkUrl ? (
              <a
                key={index}
                href={card.linkUrl}
                target={card.linkUrl.startsWith("http") ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="fan-card block cursor-pointer"
              >
                {image}
              </a>
            ) : (
              <div key={index} className="fan-card">
                {image}
              </div>
            );
          })}
        </div>
      </div>

      {needsPagination && (
        <div className="z-30 mt-4 flex items-center justify-center gap-4 md:mt-6">
          <button
            type="button"
            className={`${ARROW_CLASSES} h-10 w-10 md:h-12 md:w-12`}
            onClick={() => cycle("left")}
            aria-label="Previous team member"
          >
            {chevron("left")}
          </button>
          <div className="flex items-center gap-2">
            {cards.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => selectCard(i)}
                aria-label={`Show team member ${i + 1}`}
                aria-current={i === centerIndex ? "true" : undefined}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  i === centerIndex
                    ? "scale-[1.3] bg-black/70 dark:bg-white/80"
                    : "bg-black/15 hover:bg-black/35 dark:bg-white/15 dark:hover:bg-white/40"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            className={`${ARROW_CLASSES} h-10 w-10 md:h-12 md:w-12`}
            onClick={() => cycle("right")}
            aria-label="Next team member"
          >
            {chevron("right")}
          </button>
        </div>
      )}
    </section>
  );
}

export default CardFanCarousel;
