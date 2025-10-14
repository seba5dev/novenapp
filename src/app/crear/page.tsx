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
  const [formData, setFormData] = useState({
    nombreFamilia: "",
    dedicatoria: "",
    email: "",
    telefono: "",
    ciudad: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Integrar con Supabase para guardar la novena
      // Por ahora, simular la creación con un delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Generar un ID único temporal (reemplazar con ID de Supabase)
      const novenId = `nov-${Date.now()}`;

      // Redirigir a la página de la novena creada
      router.push(`/novenas/${novenId}`);
    } catch (error) {
      console.error("Error al crear novena:", error);
      alert("Hubo un error al crear tu novena. Por favor, intenta de nuevo.");
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
            Crea tu novena digital
          </h1>
          <p className="text-lg text-gray-600">
            Personaliza tu novena y compártela con tu familia
          </p>
        </div>

        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8 space-y-6"
        >
          {/* Nombre de familia */}
          <div>
            <label
              htmlFor="nombreFamilia"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Nombre de tu familia <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="nombreFamilia"
              name="nombreFamilia"
              required
              value={formData.nombreFamilia}
              onChange={handleChange}
              placeholder="Ej: Familia García"
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
              placeholder="Ej: Con amor para toda nuestra familia, que esta Navidad nos una más que nunca..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
            />
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
              Teléfono (opcional)
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
            className="w-full bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white text-lg py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
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

          {/* Nota de privacidad */}
          <p className="text-xs text-gray-500 text-center">
            Al crear tu novena, aceptas que guardemos tu información para
            enviarte el link personalizado. No compartiremos tus datos.
          </p>
        </form>
      </div>
    </div>
  );
}
