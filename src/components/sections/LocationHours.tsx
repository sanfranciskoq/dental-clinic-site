import { MapPin, Clock, Car } from "lucide-react";
import { siteConfig } from "@/lib/constants";
import { Container } from "@/components/layout/Container";

export function LocationHours() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              Visit Us
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Conveniently located in downtown {siteConfig.city}
            </h2>

            <div className="mt-8 space-y-6">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                <div>
                  <p className="font-semibold text-foreground">Address</p>
                  <p className="text-muted-foreground">{siteConfig.address.full}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Clock className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                <div>
                  <p className="font-semibold text-foreground">Hours</p>
                  <ul className="mt-1 space-y-1 text-muted-foreground">
                    {siteConfig.hours.map((h) => (
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
                  <p className="font-semibold text-foreground">Parking</p>
                  <p className="text-muted-foreground">{siteConfig.parkingNote}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-border shadow-sm">
            <iframe
              title={`Map showing ${siteConfig.name} location`}
              src={siteConfig.mapEmbedUrl}
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
