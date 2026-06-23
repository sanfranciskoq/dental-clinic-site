"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";
import { ServicesSmileFallback } from "./ServicesSmileFallback";

const ServicesSmileScene = dynamic(
  () =>
    import("./ServicesSmileScene").then((mod) => mod.ServicesSmileScene),
  {
    ssr: false,
    loading: () => <ServicesSmileFallback />,
  },
);

function subscribeReducedMotion(callback: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function subscribeDesktop(callback: () => void) {
  const query = window.matchMedia("(min-width: 1024px)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getDesktopSnapshot() {
  return window.matchMedia("(min-width: 1024px)").matches;
}

function getServerSnapshot() {
  return false;
}

export function ServicesVisual() {
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getServerSnapshot,
  );
  const isDesktop = useSyncExternalStore(
    subscribeDesktop,
    getDesktopSnapshot,
    getServerSnapshot,
  );

  const showScene = isDesktop && !prefersReducedMotion;

  return (
    <div
      className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center lg:mx-0 lg:max-w-none"
      aria-hidden
    >
      {showScene ? <ServicesSmileScene /> : <ServicesSmileFallback />}
    </div>
  );
}
