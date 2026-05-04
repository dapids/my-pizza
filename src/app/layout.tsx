import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Pizza - La Ricetta Italiana",
  description: "La mia ricetta della pizza open-source! Scopri come fare la vera pizza italiana con questo ricettario condiviso.",
  keywords: "pizza, ricetta, italiana, open-source, cucina",
  authors: [{ name: "Chef" }],
  creator: "Chef",
  metadataBase: new URL("https://my-pizza.example.com"),
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://my-pizza.example.com",
    siteName: "My Pizza",
    title: "My Pizza - La Ricetta Italiana",
    description: "La mia ricetta della pizza open-source! Scopri come fare la vera pizza italiana",
    images: [
      {
        url: "https://my-pizza.example.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "My Pizza",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "My Pizza - La Ricetta Italiana",
    description: "La mia ricetta della pizza open-source! Scopri come fare la vera pizza italiana",
    images: ["https://my-pizza.example.com/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
