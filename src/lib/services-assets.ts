import { heroBackgroundImage } from "@/lib/hero-assets";

/** Self-hosted loop for the services showcase (public/video/services-bg.mp4). */
export const servicesBackgroundVideo = "/video/services-bg.mp4";

/** Poster while the video loads or when video is disabled. */
export const servicesBackgroundPoster = heroBackgroundImage;

/** Edge-to-edge header images for the services showcase panel. */
export const serviceHeaderImages = {
  cleanings: "/images/services/headers/cleanings.jpg",
  "teeth-whitening": "/images/services/headers/teeth-whitening.jpg",
  "dental-implants": "/images/services/headers/dental-implants.jpg",
  invisalign: "/images/services/headers/invisalign.jpg",
  "emergency-care": "/images/services/headers/emergency-care.jpg",
  "pediatric-dentistry": "/images/services/headers/pediatric-dentistry.jpg",
} as const;

export type ServiceHeaderImageSlug = keyof typeof serviceHeaderImages;

export function getServiceHeaderImage(slug: string): string {
  return (
    serviceHeaderImages[slug as ServiceHeaderImageSlug] ??
    serviceHeaderImages.cleanings
  );
}
