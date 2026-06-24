import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { SkipLink } from "@/components/layout/SkipLink";
import { Header } from "@/components/layout/Header";
import { Footer, MobileCTA } from "@/components/layout/Footer";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { siteConfig } from "@/lib/constants";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | Dentist in ${siteConfig.city}, ${siteConfig.state}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} h-full`}>
      <body className="flex min-h-full flex-col pb-20 antialiased md:pb-0">
        <MotionProvider>
          <LocalBusinessJsonLd />
          <SkipLink />
          <Header />
          {children}
          <Footer />
          <MobileCTA />
          <Toaster position="top-center" richColors />
        </MotionProvider>
      </body>
    </html>
  );
}
