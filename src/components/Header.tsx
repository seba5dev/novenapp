"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from "@/assets/logo/logo-novenapp.png";

/**
 * Header/Navbar centralizado para toda la aplicación
 * Muestra logo, nombre del sitio y navegación básica
 */
export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo y nombre */}
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            aria-label="Ir a la página de inicio de Novenapp"
          >
            <Image
              src={logo}
              alt="Logo de Novenapp"
              width={50}
              height={50}
              className="object-contain"
              priority
            />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-900">Novenapp</h1>
              <p className="text-xs text-gray-500">Tu novena digital</p>
            </div>
          </Link>

          {/* Navegación */}
          <nav className="flex items-center gap-4">
            <Link
              href="/crear"
              className={`text-sm font-medium transition-colors ${pathname === "/crear"
                ? "text-green-600"
                : "text-gray-600 hover:text-green-600"
                }`}
              aria-label="Crear nueva novena"
            >
              Crear novena
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
