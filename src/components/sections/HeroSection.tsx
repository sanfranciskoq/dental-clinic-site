import { Link } from "@/i18n/navigation";
import { heroBackgroundImage } from "@/lib/hero-assets";

interface HeroSectionProps {
  line1: string;
  line2: string;
  line3: string;
  subheadline: string;
  ctaLabel: string;
  ariaLabel: string;
}

export function HeroSection({
  line1,
  line2,
  line3,
  subheadline,
  ctaLabel,
  ariaLabel,
}: HeroSectionProps) {
  return (
    <section
      aria-label={ariaLabel}
      className="relative flex min-h-screen w-full items-center justify-center bg-cover bg-center bg-no-repeat max-lg:min-h-[calc(100dvh-6.5rem)]"
      style={{ backgroundImage: `url(${heroBackgroundImage})` }}
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_85%_75%_at_50%_50%,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.52)_32%,rgba(0,0,0,0.28)_58%,rgba(0,0,0,0.1)_78%,transparent_100%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center text-white max-lg:px-4 max-lg:py-16 max-lg:pb-28 sm:px-8">
        <h1 className="text-4xl font-bold leading-[1.1] tracking-tight max-lg:text-[1.75rem] sm:text-5xl md:text-6xl lg:text-7xl">
          {line1}
          <br />
          {line2}
          <br />
          {line3}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg md:mt-8">
          {subheadline}
        </p>

        <div className="mt-8 md:mt-10">
          <Link
            href="/book"
            className="white-pill-cta-label inline-flex min-h-12 items-center justify-center rounded-full bg-white px-8 text-base shadow-lg transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/20"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
