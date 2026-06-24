import { DM_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { MotionProvider } from "@/components/providers/MotionProvider";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${dmSans.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col overflow-x-hidden pb-20 antialiased md:pb-0">
        <ThemeProvider>
          <MotionProvider>{children}</MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
