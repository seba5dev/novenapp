import type { Metadata, Viewport } from "next";
import { Raleway } from "next/font/google";
import { PWAInstaller } from "@/components/PWAInstaller";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#16a34a",
};

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${raleway.variable} font-sans antialiased`}
      >
        <PWAInstaller />
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
