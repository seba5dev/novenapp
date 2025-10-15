"use client";

import { useEffect, useState } from "react";
import { X, Download } from "lucide-react";

/**
 * Componente para registrar el Service Worker y mostrar banner de instalación
 * Debe ser usado en el layout principal o en páginas específicas
 */
export function PWAInstaller() {
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      process.env.NODE_ENV === "production"
    ) {
      // Registrar service worker
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("✅ Service Worker registrado:", registration.scope);

          // Verificar actualizaciones cada 1 hora
          setInterval(() => {
            registration.update();
          }, 60 * 60 * 1000);
        })
        .catch((error) => {
          console.error("❌ Error al registrar Service Worker:", error);
        });

      // Detectar cuando hay una actualización disponible
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        console.log("🔄 Nueva versión de la app disponible");
        // Podrías mostrar una notificación al usuario aquí
      });
    }
  }, []);

  // Manejar el evento beforeinstallprompt para mostrar el prompt de instalación
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevenir que Chrome muestre el prompt automáticamente
      e.preventDefault();

      // Guardar el evento para usarlo después
      setDeferredPrompt(e);

      // Mostrar nuestro banner personalizado
      setShowInstallBanner(true);

      console.log("💾 PWA instalable detectada");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Detectar cuando la PWA fue instalada
    window.addEventListener("appinstalled", () => {
      console.log("✅ PWA instalada exitosamente");
      setShowInstallBanner(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  // Manejar clic en el botón de instalar
  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Mostrar el prompt nativo de instalación
    const promptEvent = deferredPrompt as BeforeInstallPromptEvent;
    promptEvent.prompt();

    // Esperar la respuesta del usuario
    const { outcome } = await promptEvent.userChoice;
    console.log(`Usuario ${outcome === "accepted" ? "aceptó" : "rechazó"} la instalación`);

    // Ocultar el banner
    setShowInstallBanner(false);
    setDeferredPrompt(null);
  };

  // Manejar cierre del banner
  const handleCloseBanner = () => {
    setShowInstallBanner(false);
    // Guardar en localStorage que el usuario cerró el banner
    localStorage.setItem("pwa-banner-closed", "true");
  };

  // Verificar si el usuario ya cerró el banner anteriormente
  useEffect(() => {
    const bannerClosed = localStorage.getItem("pwa-banner-closed");
    if (bannerClosed === "true") {
      setShowInstallBanner(false);
    }
  }, []);

  return (
    <>
      {/* Banner de instalación */}
      {showInstallBanner && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 animate-slide-up">
          <div className="bg-white rounded-lg shadow-2xl border-2 border-green-500 p-4 flex items-start gap-3">
            {/* Icono */}
            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-500 rounded-lg flex items-center justify-center">
              <Download className="h-5 w-5 text-white" />
            </div>

            {/* Contenido */}
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-1">
                ¡Instala Novenapp! 🎄
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Instala nuestra app y accede más rápido a tu novena de aguinaldos
              </p>

              {/* Botones */}
              <div className="flex gap-2">
                <button
                  onClick={handleInstallClick}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-500 text-white text-sm font-medium px-4 py-2 rounded-lg hover:from-green-700 hover:to-emerald-600 transition-all cursor-pointer"
                  aria-label="Instalar aplicación"
                >
                  Instalar
                </button>
                <button
                  onClick={handleCloseBanner}
                  className="px-3 py-2 text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label="Cerrar banner de instalación"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Tipos para TypeScript
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}
