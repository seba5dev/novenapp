"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";

/**
 * Página para crear una novena personalizada
 * Captura: nombre de familia, dedicatoria, email/teléfono y ciudad
 * Redirige a /novenas/[id] después de crear
 */
export default function CrearNovena() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nombre: "",
    dedicatoria: "",
    email: "",
    telefono: "",
    ciudad: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Generar un slug único ANTES de enviar (para incluirlo en el POST)
      const slug = `${formData.nombre
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')}-${Date.now()}`;

      // Enviar datos a la API para registrar el lead
      // Al hacer submit, automáticamente acepta los términos
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          dedicatoria: formData.dedicatoria,
          email: formData.email,
          telefono: formData.telefono,
          ciudad: formData.ciudad,
          slug: slug, // ✨ Incluir el slug
          acepta_terminos: true, // ✨ Aceptación implícita al crear
          utm_source: typeof window !== 'undefined'
            ? new URLSearchParams(window.location.search).get('utm_source') || 'direct'
            : 'direct',
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || 'Error al crear la novena');
      }

      // Redirigir a la página de gracias o a la novena creada
      router.push(`/gracias?slug=${slug}&nombre=${encodeURIComponent(formData.nombre)}`);
    } catch (error) {
      console.error("Error al crear novena:", error);
      const errorMessage = error instanceof Error ? error.message : "Hubo un error al crear tu novena. Por favor, intenta de nuevo.";
      setError(errorMessage);
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7f3ef] via-[#fdfbf7] to-[#f5f1ed] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Botón volver */}
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al inicio
        </Link>

        {/* Encabezado */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Crea tu novena digital 🎄
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Personaliza tu novena y compártela con tu familia
          </p>
          <p className="text-sm text-gray-500">
            Solo te tomará 2 minutos • Campos marcados con <span className="text-red-500">*</span> son requeridos
          </p>
        </div>

        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8 space-y-6"
        >
          {/* Mensaje de error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-start gap-3">
              <span className="text-xl">⚠️</span>
              <div className="flex-1">
                <p className="font-semibold">Error al crear la novena</p>
                <p className="text-sm mt-1">{error}</p>
              </div>
              <button
                type="button"
                onClick={() => setError(null)}
                className="text-red-600 hover:text-red-800"
              >
                ✕
              </button>
            </div>
          )}

          {/* Nombre */}
          <div>
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Tu nombre completo <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              required
              minLength={2}
              maxLength={100}
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej: Juan García Pérez"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Dedicatoria */}
          <div>
            <label
              htmlFor="dedicatoria"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Dedicatoria especial <span className="text-red-500">*</span>
            </label>
            <textarea
              id="dedicatoria"
              name="dedicatoria"
              required
              value={formData.dedicatoria}
              onChange={handleChange}
              rows={4}
              maxLength={500}
              placeholder="Ej: Con amor para toda nuestra familia, que esta Navidad nos une más que nunca..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.dedicatoria.length}/500 caracteres
            </p>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Correo electrónico <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
            <p className="text-xs text-gray-500 mt-1">
              Te enviaremos el link de tu novena
            </p>
          </div>

          {/* Teléfono (opcional) */}
          <div>
            <label
              htmlFor="telefono"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Teléfono <span className="text-gray-400 text-sm">(opcional)</span>
            </label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="+57 300 123 4567"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
            <p className="text-xs text-gray-500 mt-1">
              Para contactarte en caso de ser necesario
            </p>
          </div>

          {/* Ciudad */}
          <div>
            <label
              htmlFor="ciudad"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Ciudad <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="ciudad"
              name="ciudad"
              required
              value={formData.ciudad}
              onChange={handleChange}
              placeholder="Ej: Bogotá"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Botón submit */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white text-lg py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            aria-label={loading ? "Creando tu novena, por favor espera" : "Generar mi novena personalizada"}
          >
            {loading ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                Creando tu novena...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Generar mi novena
              </>
            )}
          </Button>

          {/* Aviso de términos y condiciones */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-gray-700 text-center leading-relaxed">
              ℹ️ Al hacer clic en "Generar mi novena", aceptas nuestros{" "}
              <Link
                href="/terminos"
                target="_blank"
                className="text-green-600 hover:text-green-700 underline font-medium"
              >
                términos y condiciones
              </Link>{" "}
              y autorizas el uso de tu información para crear y compartir tu novena
              digital. Tu información está protegida y no será compartida con terceros.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
