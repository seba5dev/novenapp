import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import { PWAInstaller } from "@/components/PWAInstaller";
import "./globals.css";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Novenapp — Tu novena digital 2025",
  description: "Une a tu familia desde cualquier lugar. Personaliza, comparte y celebra tu novena de aguinaldos digital del 16 al 24 de diciembre.",
  keywords: ["novena", "navidad", "aguinaldos", "digital", "familia", "diciembre"],
  authors: [{ name: "Bigle Technology", url: "https://bigle.com.co" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Novenapp",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: "Novenapp — Tu novena digital 2025",
    description: "Crea y comparte tu propia novena de aguinaldos digital. Una experiencia navideña única.",
    type: "website",
    locale: "es_CO",
    siteName: "Novenapp",
  },
  twitter: {
    card: "summary_large_image",
    title: "Novenapp — Tu novena digital 2025",
    description: "Une a tu familia con tu novena de aguinaldos digital",
  },
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  themeColor: "#16a34a",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Novenapp" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#16a34a" />
      </head>
      <body
        className={`${raleway.variable} font-sans antialiased`}
      >
        <PWAInstaller />
        {children}
      </body>
    </html>
  );
}
