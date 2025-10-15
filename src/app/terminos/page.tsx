"use client";

import Link from "next/link";
import { ArrowLeft, Shield, FileText, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Página de Términos y Condiciones de Novenapp
 */
export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7f3ef] via-[#fdfbf7] to-[#f5f1ed] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al inicio
          </Link>

          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-500 rounded-full mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Términos y Condiciones
            </h1>
            <p className="text-lg text-gray-600">
              Fecha de actualización: octubre de 2025
            </p>
          </div>
        </div>

        {/* Contenido */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-8">
          {/* Introducción */}
          <section className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Bienvenido(a) a <strong>Novenapp</strong>, una experiencia digital creada y administrada por{" "}
              <strong>Bigle Technology</strong>, registrada ante la Cámara de Comercio de Bogotá bajo
              matrícula mercantil vigente y <strong>NIT 1000048057-8</strong> (en adelante, "Bigle").
            </p>
            <p className="text-gray-700 leading-relaxed">
              El acceso y uso del sitio{" "}
              <a
                href="https://novenapp.com"
                className="text-green-600 hover:text-green-700 underline decoration-green-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://novenapp.com
              </a>{" "}
              implica la aceptación plena de estos Términos y Condiciones de Uso y de la Política de
              Privacidad aquí contenida. Si no está de acuerdo con ellos, por favor absténgase de utilizar el sitio.
            </p>
          </section>

          {/* Sección 1 */}
          <section className="space-y-4">
            <div className="flex items-start gap-3">
              <FileText className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  1. Responsable del tratamiento de datos personales
                </h2>
                <div className="bg-green-50 border-l-4 border-green-600 p-4 space-y-2">
                  <p className="font-semibold text-gray-900">Bigle Technology</p>
                  <p className="text-gray-700">
                    <strong>Matrícula Mercantil:</strong> vigente en la Cámara de Comercio de Bogotá
                  </p>
                  <p className="text-gray-700">
                    <strong>NIT:</strong> 1000048057-8
                  </p>
                  <p className="text-gray-700">
                    <strong>Correo de contacto:</strong>{" "}
                    <a
                      href="mailto:contacto@bigle.com.co"
                      className="text-green-600 hover:text-green-700 underline"
                    >
                      contacto@bigle.com.co
                    </a>
                  </p>
                  <p className="text-gray-700">
                    <strong>Ubicación:</strong> Bogotá, Colombia
                  </p>
                </div>
                <p className="text-gray-700 leading-relaxed mt-4">
                  Bigle es responsable del tratamiento de los datos personales recolectados a través del
                  sitio web novenapp.com.
                </p>
              </div>
            </div>
          </section>

          {/* Sección 2 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              2. Datos personales que se recopilan
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Durante el uso de Novenapp se podrá solicitar información como:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Nombre o apodo</li>
              <li>Correo electrónico</li>
              <li>Número de teléfono</li>
              <li>Ciudad</li>
              <li>Mensajes o dedicatorias ingresadas por el usuario</li>
              <li>Información técnica básica (navegador, dirección IP, cookies o métricas de uso)</li>
            </ul>
          </section>

          {/* Sección 3 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              3. Finalidad del tratamiento de los datos
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Los datos recolectados se utilizarán exclusivamente para:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Generar y personalizar la novena digital solicitada.</li>
              <li>Enviar mensajes o correos informativos relacionados con el uso del servicio.</li>
              <li>Mejorar la experiencia y funcionalidad del sitio mediante métricas de uso.</li>
              <li>
                Comunicar, de manera ocasional, proyectos o servicios desarrollados por Bigle que puedan
                resultar de interés, siempre con posibilidad de cancelar la suscripción en cualquier momento.
              </li>
            </ul>
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mt-4">
              <p className="text-gray-800 font-semibold">
                ⚠️ En ningún caso los datos serán vendidos, arrendados o compartidos con terceros ajenos a Bigle.
              </p>
            </div>
          </section>

          {/* Sección 4 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              4. Consentimiento
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Al ingresar información personal en el sitio, el usuario autoriza de forma libre, expresa e
              informada a Bigle para tratar sus datos personales conforme a las finalidades descritas.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Este consentimiento podrá revocarse en cualquier momento enviando una solicitud al correo{" "}
              <a
                href="mailto:contacto@bigle.com.co"
                className="text-green-600 hover:text-green-700 underline font-semibold"
              >
                contacto@bigle.com.co
              </a>
              .
            </p>
          </section>

          {/* Sección 5 */}
          <section className="space-y-4">
            <div className="flex items-start gap-3">
              <Lock className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  5. Derechos de los titulares de los datos
                </h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  El usuario podrá ejercer los derechos reconocidos en la <strong>Ley 1581 de 2012</strong> y
                  el <strong>Decreto 1377 de 2013</strong>, entre ellos:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Conocer, actualizar, rectificar o eliminar su información.</li>
                  <li>Solicitar prueba de la autorización otorgada.</li>
                  <li>Ser informado sobre el uso que se ha dado a sus datos.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-4">
                  Las solicitudes se atenderán en los plazos legales establecidos, a través del correo{" "}
                  <a
                    href="mailto:contacto@bigle.com.co"
                    className="text-green-600 hover:text-green-700 underline font-semibold"
                  >
                    contacto@bigle.com.co
                  </a>
                  .
                </p>
              </div>
            </div>
          </section>

          {/* Sección 6 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              6. Uso de cookies y herramientas de análisis
            </h2>
            <p className="text-gray-700 leading-relaxed">
              El sitio novenapp.com utiliza cookies y herramientas de análisis (como Google Analytics o
              Cloudflare Insights) con el fin de mejorar el funcionamiento del servicio.
            </p>
            <p className="text-gray-700 leading-relaxed">
              El usuario puede configurar su navegador para bloquear o eliminar las cookies cuando lo desee,
              entendiendo que esto podría afectar algunas funcionalidades del sitio.
            </p>
          </section>

          {/* Sección 7 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              7. Propiedad intelectual
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Todo el contenido de Novenapp —incluyendo el diseño, código fuente, imágenes, textos y elementos
              gráficos— es propiedad de Bigle Technology y está protegido por las leyes de derechos de autor
              vigentes en Colombia.
            </p>
            <p className="text-gray-700 leading-relaxed">
              El usuario no adquiere derecho alguno sobre dichos contenidos y se compromete a no reproducirlos,
              modificarlos o distribuirlos sin autorización expresa.
            </p>
          </section>

          {/* Sección 8 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              8. Limitación de responsabilidad
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Novenapp es una herramienta gratuita y temporal, ofrecida con fines culturales y recreativos.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Bigle no garantiza la disponibilidad continua del sitio ni se hace responsable por pérdidas de
              información, interrupciones del servicio o daños derivados del uso de la plataforma.
            </p>
          </section>

          {/* Sección 9 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              9. Modificaciones
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Bigle podrá modificar estos Términos y Condiciones o la Política de Privacidad en cualquier momento.
              Las actualizaciones se publicarán en esta misma página con su respectiva fecha de modificación.
            </p>
          </section>

          {/* Sección 10 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              10. Ley aplicable y jurisdicción
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Estos Términos se rigen por las leyes de la <strong>República de Colombia</strong>.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Cualquier disputa relacionada con el uso del sitio será resuelta ante los tribunales competentes
              de Bogotá D.C.
            </p>
          </section>

          {/* Footer interno */}
          <div className="border-t border-gray-200 pt-8 mt-12">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 text-center">
              <Mail className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                ¿Preguntas sobre estos términos?
              </h3>
              <p className="text-gray-700 mb-4">
                Contáctanos y con gusto te atenderemos
              </p>
              <a
                href="mailto:contacto@bigle.com.co"
                className="inline-block"
              >
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                  aria-label="Enviar correo a Bigle Technology"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  contacto@bigle.com.co
                </Button>
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center pt-8 border-t border-gray-200">
            <p className="text-gray-600 text-sm">
              © 2025 Bigle Technology — NIT 1000048057-8 — Todos los derechos reservados
            </p>
          </div>
        </div>

        {/* Botón volver */}
        <div className="text-center mt-8">
          <Link href="/">
            <Button
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50 cursor-pointer"
              aria-label="Volver a la página de inicio"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al inicio
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}
