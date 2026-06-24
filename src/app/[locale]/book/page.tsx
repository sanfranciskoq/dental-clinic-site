import { setRequestLocale, getTranslations } from "next-intl/server";
import { BookForm } from "@/components/forms/BookForm";
import { Container } from "@/components/layout/Container";
import { createPageMetadata } from "@/lib/metadata";
import { getSiteConfig, getServices } from "@/lib/i18n/content";
import type { Locale } from "@/i18n/routing";

interface BookPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ service?: string }>;
}

export async function generateMetadata({ params }: BookPageProps) {
  const { locale } = await params;
  return createPageMetadata({
    locale,
    titleKey: "bookTitle",
    descriptionKey: "bookDescription",
    path: "/book",
  });
}

export default async function BookPage({ params, searchParams }: BookPageProps) {
  const { locale } = await params;
  const { service } = await searchParams;
  setRequestLocale(locale);

  const t = await getTranslations("pages.book");
  const site = getSiteConfig(locale as Locale);
  const services = getServices(locale as Locale);

  return (
    <main id="main-content" className="py-12 md:py-16">
      <Container className="max-w-2xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            {t("eyebrow")}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-muted-foreground">
            {t.rich("description", {
              callLink: (chunks) => (
                <a
                  href={site.phoneHref}
                  className="font-semibold text-primary underline"
                >
                  {chunks}
                </a>
              ),
            })}
          </p>
        </div>

        <div className="mt-10 rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <BookForm defaultService={service} services={services} />
        </div>
      </Container>
    </main>
  );
}
