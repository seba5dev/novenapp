import type { Metadata } from "next";
import { Raleway } from "next/font/google";
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
  authors: [{ name: "Bigle Technology" }],
  openGraph: {
    title: "Novenapp — Tu novena digital 2025",
    description: "Crea y comparte tu propia novena de aguinaldos digital. Una experiencia navideña única.",
    type: "website",
    locale: "es_ES",
    siteName: "Novenapp",
  },
  twitter: {
    card: "summary_large_image",
    title: "Novenapp — Tu novena digital 2025",
    description: "Une a tu familia con tu novena de aguinaldos digital",
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
        {children}
      </body>
    </html>
  );
}
