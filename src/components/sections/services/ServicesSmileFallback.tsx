import Image from "next/image";

export function ServicesSmileFallback() {
  return (
    <div
      className="relative aspect-square w-full max-w-md overflow-hidden rounded-2xl border border-border/60 bg-secondary/30 lg:max-w-none"
      aria-hidden
    >
      <Image
        src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=900&h=900&fit=crop&q=85"
        alt=""
        fill
        className="object-cover object-[center_35%]"
        sizes="(max-width: 1024px) 80vw, 40vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/25 via-transparent to-background/10" />
    </div>
  );
}
