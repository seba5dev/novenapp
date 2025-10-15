"use client";

import Link from "next/link";
import Image from "next/image";
import bigleLogo from "@/assets/logo/logo-bigle.png";

/**
 * Footer centralizado para toda la aplicación
 * Muestra branding de Bigle Technology y enlace a Términos y Condiciones
 */
export default function Footer() {
  return (
    <footer className="py-8 px-4 text-center bg-white/30 backdrop-blur-sm border-t border-gray-200">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Branding con logo */}
        <div className="flex items-center justify-center gap-2 text-gray-700 text-base flex-wrap">
          <span className="inline-flex items-center gap-1">
            <span className="inline-block animate-pulse">💚</span>
            Hecho con cariño por
          </span>
          <a
            href="https://bigle.com.co"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center font-bold hover:opacity-80 transition-opacity group"
            aria-label="Visitar sitio web de Bigle Technology"
          >
            <Image
              src={bigleLogo}
              alt="Logo de Bigle Technology"
              width={80}
              height={24}
              className="object-contain group-hover:scale-105 transition-transform"
            />
          </a>
        </div>

        {/* Términos y Condiciones */}
        <p className="text-gray-500 text-sm">
          <Link
            href="/terminos"
            className="hover:text-green-600 transition-colors underline decoration-gray-300 hover:decoration-green-400"
          >
            Términos y Condiciones
          </Link>
        </p>
      </div>
    </footer>
  );
}
