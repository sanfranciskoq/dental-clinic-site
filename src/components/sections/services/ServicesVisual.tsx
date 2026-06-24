import Image from "next/image";

const SERVICES_IMAGE = {
  src: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=1400&h=1750&fit=crop&q=90",
  alt: "Dentist providing gentle, comprehensive dental care to a patient",
} as const;

export function ServicesVisual() {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <Image
        src={SERVICES_IMAGE.src}
        alt={SERVICES_IMAGE.alt}
        fill
        className="object-cover object-center"
        sizes="(max-width: 1024px) 100vw, 33vw"
        priority={false}
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent"
        aria-hidden
      />
    </div>
  );
}
