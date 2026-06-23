import { FAQPageContent } from "@/components/faq/FAQPageContent";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/constants";

export const metadata = createPageMetadata({
  title: "FAQ",
  description: `Frequently asked questions about ${siteConfig.name} — appointments, insurance, procedures, emergencies, and pediatric care.`,
  path: "/faq",
});

export default function FAQPage() {
  return (
    <main id="main-content">
      <FAQPageContent />
    </main>
  );
}
