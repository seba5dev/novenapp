"use client";

import Link from "next/link";
import { Sparkles, Share2, Calendar } from "lucide-react";
import Snowfall from "@/components/Snowfall";
import Countdown from "@/components/Countdown";
import { Button } from "@/components/ui/button";

/**
 * Página principal de Novenapp
 * Landing page emocional para crear novenas digitales navideñas
 * 
 * Características:
 * - Hero section con título impactante
 * - Contador regresivo al 1 de diciembre
 * - Animación de nieve de fondo
 * - Sección de características (personalizar, compartir, celebrar)
 * - CTA principal para crear novena
 * - Footer con branding de Bigle Technology
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7f3ef] via-[#fdfbf7] to-[#f5f1ed] relative overflow-hidden">
      {/* Animación de nieve de fondo */}
      <Snowfall />

      {/* Contenido principal */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16 md:py-20">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            {/* Título principal */}
            <div className="space-y-4 animate-fade-in">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 leading-tight">
                Tu novena digital
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
                  esta Navidad
                </span>{" "}
                <span className="inline-block animate-bounce">🎄</span>
              </h1>
            </div>

            {/* Subtítulo emocional */}
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed animate-fade-in-up">
              Une a tu familia desde cualquier lugar. Personaliza, comparte y
              celebra cada día del 16 al 24 de diciembre.
            </p>

            {/* CTA principal */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-200">
              <Link href="/crear">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white text-lg px-8 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                  aria-label="Crear novena digital personalizada"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Crea tu novena
                </Button>
              </Link>
            </div>

            {/* Contador regresivo */}
            <div className="mt-16 space-y-6 animate-fade-in-up animation-delay-400">
              <div className="inline-block px-6 py-2 bg-gradient-to-r from-green-600/10 to-emerald-500/10 rounded-full border border-green-600/20">
                <p className="text-sm md:text-base font-medium text-gray-800">
                  ⏰ Tiempo restante para el 1 de diciembre
                </p>
              </div>
              <Countdown />
            </div>
          </div>
        </section>

        {/* Sección de características */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
              Tu novena, a tu manera
            </h2>

            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              {/* Característica 1: Personaliza */}
              <div className="text-center space-y-4 p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-500 to-emerald-400 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Personaliza</h3>
                <p className="text-gray-600 leading-relaxed">
                  Crea una novena única con el nombre de tu familia y una
                  dedicatoria especial que llegará al corazón.
                </p>
              </div>

              {/* Característica 2: Comparte */}
              <div className="text-center space-y-4 p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-500 to-yellow-400 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Share2 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Comparte</h3>
                <p className="text-gray-600 leading-relaxed">
                  Envía tu novena por WhatsApp, email o redes sociales. Une a
                  tu familia sin importar la distancia.
                </p>
              </div>

              {/* Característica 3: Celebra */}
              <div className="text-center space-y-4 p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-red-500 to-pink-400 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Celebra</h3>
                <p className="text-gray-600 leading-relaxed">
                  Sigue cada día del 16 al 24 de diciembre con oraciones,
                  villancicos y reflexiones especiales.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA secundario */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Comienza la tradición hoy
            </h2>
            <p className="text-xl text-gray-700">
              Miles de familias ya crearon su novena digital. ¡Únete a ellos!
            </p>
            <Link href="/crear">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white text-lg px-8 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                aria-label="Crear mi novena digital personalizada gratis"
              >
                Crear mi novena gratis
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
