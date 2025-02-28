import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageSwitch";
import { Analytics } from "@vercel/analytics/react";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lucas Nordskov Anderson | Frontend Developer & UI/UX Designer",
  description:
    "Frontend udvikler med speciale i React, Next.js og moderne webteknologier. Se mine seneste projekter og erfaringer inden for webudvikling og UI/UX design.",
  keywords: [
    "Lucas Anderson",
    "Lucas Nordskov Anderson",
    "Frontend Developer",
    "UI/UX Designer",
    "React Developer",
    "Next.js Developer",
    "Portfolio",
    "Web Developer København",
    "Frontend Udvikler",
    "Webudvikler",
    "Portfolio Website",
    "Danish Developer",
  ],
  authors: [{ name: "Lucas Nordskov Anderson" }],
  creator: "Lucas Nordskov Anderson",
  publisher: "Lucas Nordskov Anderson",
  openGraph: {
    type: "website",
    locale: "da_DK",
    url: "https://lucasanderson.dk",
    title: "Lucas Nordskov Anderson | Frontend Developer & UI/UX Designer",
    description:
      "Frontend udvikler med speciale i React, Next.js og moderne webteknologier. Se mine seneste projekter og erfaringer inden for webudvikling og UI/UX design.",
    siteName: "Lucas Anderson Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lucas Anderson Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucas Nordskov Anderson | Frontend Developer & UI/UX Designer",
    description:
      "Frontend udvikler med speciale i React, Next.js og moderne webteknologier.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "din-google-verification-kode", // Du skal tilføje din egen verifikationskode her
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="da">
      <head>
        <link rel="canonical" href="https://lucasanderson.dk" />
      </head>
      <body className={inter.className}>
        <LanguageProvider>{children}</LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
