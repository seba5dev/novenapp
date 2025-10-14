import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "NovenApp - Tu Novena de Navidad Digital",
  description: "Crea y comparte tu propia novena de aguinaldos digital. Una experiencia navideña única creada por Bigle Technology.",
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
