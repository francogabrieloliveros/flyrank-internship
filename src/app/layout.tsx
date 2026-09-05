import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/data";
import { Calico } from "@/components/Calico";

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
    <html lang="en" className={`${bodyFace.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <Calico />
      </body>
    </html>
  );
}
