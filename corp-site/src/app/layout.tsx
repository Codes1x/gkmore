import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { PopupProvider } from "@/contexts/popup-context";
import { ContactPopupWrapper } from "@/components/contact-popup-wrapper";
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
  metadataBase: new URL("https://example.com"),
  title: {
    default: "Corp — современный корпоративный сайт",
    template: "%s | Corp",
  },
  description:
    "Современный быстрый корпоративный лендинг: услуги, преимущества, кейсы и контакты.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
    nocache: true,
  },
  openGraph: {
    title: "Corp — современный корпоративный сайт",
    description:
      "Современный быстрый корпоративный лендинг: услуги, преимущества, кейсы и контакты.",
    url: "/",
    siteName: "Corp",
    images: [
      { url: "/og.png", width: 1200, height: 630, alt: "Corp" },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Corp — современный корпоративный сайт",
    description:
      "Современный быстрый корпоративный лендинг: услуги, преимущества, кейсы и контакты.",
    images: ["/og.png"],
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        {/* Дополнительная защита от индексации */}
        <meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex, nocache" />
        <meta name="googlebot" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
        <meta name="bingbot" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
        <meta name="yandexbot" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
        <meta name="slurp" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
        <meta httpEquiv="X-Robots-Tag" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PopupProvider>
          <SmoothScrollProvider offset={80}>
            {children}
          </SmoothScrollProvider>
          <ContactPopupWrapper />
        </PopupProvider>
        <Analytics />
      </body>
    </html>
  );
}
