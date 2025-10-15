"use client";

import { useEffect } from "react";

/**
 * Componente para registrar el Service Worker
 * Debe ser usado en el layout principal o en páginas específicas
 */
export function PWAInstaller() {
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
    let deferredPrompt: BeforeInstallPromptEvent | null = null;

    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevenir que Chrome muestre el prompt automáticamente
      e.preventDefault();
      // Guardar el evento para mostrarlo más tarde
      deferredPrompt = e as BeforeInstallPromptEvent;

      console.log("💾 PWA instalable detectada");

      // Podrías mostrar un banner personalizado aquí
      // Por ejemplo: mostrar un botón "Instalar App"
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Detectar cuando la PWA fue instalada
    window.addEventListener("appinstalled", () => {
      console.log("✅ PWA instalada exitosamente");
      deferredPrompt = null;
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  return null; // Este componente no renderiza nada
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
