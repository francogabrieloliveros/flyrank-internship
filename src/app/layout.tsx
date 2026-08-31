import type { Metadata } from "next";
import { Bodoni_Moda, Roboto } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/data";
import { Calico } from "@/components/Calico";

// Placeholder for "Florilst Realik" (not a licensed web font). Bodoni Moda is
// a high-contrast didone serif in the same family of feeling — swap this for
// next/font/local pointing at the real font file once you have a license.
// See README.md for instructions.
const displayFace = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-display-face",
  display: "swap",
});

// Roboto tops out at weight 100/300 via next/font — 300 (Light) is the
// closest match to "Roboto ExtraLight" available from Google Fonts.
const bodyFace = Roboto({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-body-face",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.name} — ${site.role}`,
  description: site.claim,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${displayFace.variable} ${bodyFace.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <Calico />
      </body>
    </html>
  );
}
