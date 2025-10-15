import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { PopupProvider } from "@/contexts/popup-context";
import { ContactPopupWrapper } from "@/components/contact-popup-wrapper";
import "./globals.css";
import "react-international-phone/style.css";

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
    default: "ГК Море — профессиональный оператор апарт-отелей в Сочи",
    template: "%s | ГК Море",
  },
  description:
    "Профессиональный оператор апарт-отелей в Сочи. Обеспечиваем собственникам стабильную доходность и прозрачность управления. Модель ревшара 30%.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
    nocache: true,
  },
  openGraph: {
    title: "ГК Море — профессиональный оператор апарт-отелей в Сочи",
    description:
      "Профессиональный оператор апарт-отелей в Сочи. Обеспечиваем собственникам стабильную доходность и прозрачность управления.",
    url: "/",
    siteName: "ГК Море",
    images: [
      { url: "/og.png", width: 1200, height: 630, alt: "ГК Море" },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ГК Море — профессиональный оператор апарт-отелей в Сочи",
    description:
      "Профессиональный оператор апарт-отелей в Сочи. Обеспечиваем собственникам стабильную доходность и прозрачность управления.",
    images: ["/og.png"],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  },
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
