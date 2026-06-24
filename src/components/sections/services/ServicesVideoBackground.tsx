"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import {
  servicesBackgroundPoster,
  servicesBackgroundVideo,
} from "@/lib/services-assets";

interface ServicesVideoBackgroundProps {
  className?: string;
}

export function ServicesVideoBackground({ className }: ServicesVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const [preferStatic, setPreferStatic] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPreferStatic(media.matches || reduceMotion === true);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [reduceMotion]);

  useEffect(() => {
    if (preferStatic) return;

    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(video);

    const onVisibility = () => {
      if (document.hidden) {
        video.pause();
      } else if (video.getBoundingClientRect().top < window.innerHeight) {
        void video.play().catch(() => undefined);
      }
    };

    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [preferStatic]);

  if (preferStatic) {
    return (
      <div
        className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,#0f766e_0%,#042f2e_55%,#021716_100%)] ${className ?? ""}`}
        aria-hidden
      />
    );
  }

  return (
    <div className={`absolute inset-0 overflow-hidden ${className ?? ""}`} aria-hidden>
      <video
        ref={videoRef}
        className="services-video-zoom absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={servicesBackgroundPoster}
      >
        <source src={servicesBackgroundVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/55" />
    </div>
  );
}
