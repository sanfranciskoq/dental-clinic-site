import { BookForm } from "@/components/forms/BookForm";
import { Container } from "@/components/layout/Container";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/constants";

export const metadata = createPageMetadata({
  title: "Book Appointment",
  description: `Request an appointment at ${siteConfig.name}. We'll confirm within 24 hours. New patients welcome.`,
  path: "/book",
});

interface BookPageProps {
  searchParams: Promise<{ service?: string }>;
}

export default async function BookPage({ searchParams }: BookPageProps) {
  const { service } = await searchParams;

  return (
    <main id="main-content" className="py-12 md:py-16">
      <Container className="max-w-2xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Book Appointment
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Request your visit
          </h1>
          <p className="mt-4 text-muted-foreground">
            Fill out the form below and we&apos;ll call you within 24 hours to
            confirm your appointment. For emergencies, please{" "}
            <a
              href={siteConfig.phoneHref}
              className="font-semibold text-primary underline"
            >
              call us directly
            </a>
            .
          </p>
        </div>

        <div className="mt-10 rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <BookForm defaultService={service} />
        </div>
      </Container>
    </main>
  );
}
