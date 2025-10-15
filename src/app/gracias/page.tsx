"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { CheckCircle, Share2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Contenido de la página de agradecimiento
 */
function GraciasContent() {
  const searchParams = useSearchParams();
  const nombreFamilia = searchParams.get("nombre") || "tu familia";
  const slug = searchParams.get("slug") || "";

  const novenUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/novenas/${slug}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Novena de ${nombreFamilia}`,
          text: `¡Únete a nuestra novena de aguinaldos digital!`,
          url: novenUrl,
        });
      } catch (err) {
        console.log("Error al compartir:", err);
      }
    } else {
      // Fallback: copiar al portapapeles
      navigator.clipboard.writeText(novenUrl);
      alert("¡Link copiado al portapapeles!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7f3ef] via-[#fdfbf7] to-[#f5f1ed] py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Ícono de éxito */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6 animate-bounce">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            ¡Tu novena está lista! 🎄
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Gracias por crear tu novena digital, {nombreFamilia}
          </p>
        </div>

        {/* Tarjeta principal */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6 mb-8">
          {/* Mensaje de confirmación */}
          <div className="text-center space-y-4 pb-6 border-b border-gray-200">
            <Mail className="w-8 h-8 text-green-600 mx-auto" />
            <p className="text-lg text-gray-700">
              Hemos enviado el link de tu novena a tu correo electrónico.
            </p>
            <p className="text-sm text-gray-500">
              Revisa tu bandeja de entrada (y la carpeta de spam por si acaso)
            </p>
          </div>

          {/* Link para compartir */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 text-center">
              Comparte tu novena
            </h2>

            {/* Input con el link */}
            <div className="flex gap-2">
              <input
                type="text"
                value={novenUrl}
                readOnly
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 text-sm"
              />
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(novenUrl);
                  alert("¡Link copiado!");
                }}
                className="bg-gray-600 hover:bg-gray-700 text-white"
              >
                Copiar
              </Button>
            </div>

            {/* Botones de acción */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                onClick={handleShare}
                className="bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Compartir novena
              </Button>

              <Link href={novenUrl}>
                <Button
                  variant="outline"
                  className="w-full border-green-600 text-green-600 hover:bg-green-50"
                >
                  Ver mi novena
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Sección de Bigle Technology */}
        <div className="bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg p-8 text-center space-y-4">
          <h3 className="text-2xl font-bold text-gray-900">
            ¿Te gustó esta experiencia?
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Esta novena digital fue creada con cariño por{" "}
            <span className="font-bold text-green-600">Bigle Technology</span>,
            expertos en crear soluciones digitales que conectan personas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a
              href="https://bigle.co"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white">
                Conoce Bigle Technology
              </Button>
            </a>
            <Link href="/">
              <Button variant="outline" className="border-gray-300 text-gray-700">
                Volver al inicio
              </Button>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600">
          <p>
            Hecho con cariño por{" "}
            <a
              href="https://bigle.co"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-green-600 hover:text-green-700"
            >
              Bigle Technology
            </a>{" "}
            💚
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Página de agradecimiento después de crear una novena
 * Muestra confirmación, link para compartir y CTA de Bigle
 */
export default function GraciasPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    }>
      <GraciasContent />
    </Suspense>
  );
}
