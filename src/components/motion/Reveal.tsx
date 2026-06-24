"use client";

import { motion, useReducedMotion } from "motion/react";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

const DEFAULT_STAGGER = 0.08;

const revealTransition = {
  duration: 0.4,
  ease: [0.22, 1, 0.36, 1] as const,
};

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
};

/** Layout wrapper for grouped reveal items. */
export function RevealGroup({ children, className }: RevealGroupProps) {
  return <div className={className}>{children}</div>;
}

type RevealItemProps = {
  children: ReactNode;
  className?: string;
  /** Explicit delay in seconds. */
  delay?: number;
  /** Use with `stagger` for automatic index-based delay. */
  index?: number;
  /** Delay multiplier when `index` is set. Defaults to 0.08s. */
  stagger?: number;
};

export function RevealItem({
  children,
  className,
  delay,
  index,
  stagger = DEFAULT_STAGGER,
}: RevealItemProps) {
  const reduceMotion = useReducedMotion();
  const resolvedDelay =
    delay ?? (index !== undefined ? index * stagger : 0);

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn("motion-safe", className)}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -40px 0px" }}
      transition={{ ...revealTransition, delay: resolvedDelay }}
    >
      {children}
    </motion.div>
  );
}
