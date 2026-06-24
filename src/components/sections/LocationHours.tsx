import { MapPin, Clock, Car } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { getSiteConfig } from "@/lib/i18n/content";
import { Container } from "@/components/layout/Container";
import type { Locale } from "@/i18n/routing";

export async function LocationHours() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("home.location");
  const tc = await getTranslations("common");
  const site = getSiteConfig(locale);

  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              {t("eyebrow")}
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t("title", { city: site.city })}
            </h2>

            <div className="mt-8 space-y-6">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                <div>
                  <p className="font-semibold text-foreground">{tc("address")}</p>
                  <p className="text-muted-foreground">{site.address.full}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Clock className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                <div>
                  <p className="font-semibold text-foreground">{tc("hours")}</p>
                  <ul className="mt-1 space-y-1 text-muted-foreground">
                    {site.hours.map((h) => (
                      <li key={h.day}>
                        {h.day}: {h.time}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex gap-3">
                <Car className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                <div>
                  <p className="font-semibold text-foreground">{tc("parking")}</p>
                  <p className="text-muted-foreground">{site.parkingNote}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-border shadow-sm">
            <iframe
              title={tc("mapTitle", { name: site.name })}
              src={site.mapEmbedUrl}
              className="aspect-[4/3] w-full min-h-[280px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
