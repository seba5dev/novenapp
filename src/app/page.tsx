"use client";
import { useEffect, useState } from "react";
import CountdownPage from "@/components/CountdownPage";
import Link from "next/link";

// Agrega esta constante para forzar la vista de diciembre en desarrollo
const FORCE_DECEMBER_VIEW_IN_DEV = false; // Cambia a false para ver el contador

export default function Home() {
  const [isDecember, setIsDecember] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const date = new Date();

    // Comprueba si estamos en desarrollo y si la constante para forzar la vista está activa
    if (process.env.NODE_ENV === 'development' && FORCE_DECEMBER_VIEW_IN_DEV) {
      setIsDecember(true);
    } else if (date.getMonth() === 11) { // 11 es Diciembre
      setIsDecember(true);
    }
  }, []);

  if (!isClient) {
    // Renderizado del lado del servidor o antes de la hidratación,
    // puedes mostrar un loader genérico o nada hasta que se determine el estado.
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-8 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4">NovenApp</h1>
        <p className="text-lg sm:text-xl">Cargando...</p>
      </div>
    );
  }

  if (!isDecember) {
    return <CountdownPage />;
  }

  // Si es Diciembre, muestra el contenido original de la página de inicio.
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <header className="text-center mb-12">
        <h1 className="text-5xl sm:text-7xl font-extrabold">NovenApp</h1>
        <p className="text-xl sm:text-2xl mt-2">
          Tu guía para la Novena de Aguinaldos
        </p>
      </header>

      <main className="w-full max-w-2xl">
        <p className="text-lg text-center mb-8">
          ¡Bienvenido! Selecciona el día de la novena que deseas rezar:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 9 }, (_, i) => i + 1).map((dia) => (
            <Link
              key={dia}
              href={`/novena/dia-${dia}`}
              className="block p-6 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-300 ease-in-out text-center"
            >
              <h2 className="text-2xl font-semibold">Día {dia}</h2>
            </Link>
          ))}
        </div>
      </main>

      <footer className="mt-12 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} NovenApp. Todos los derechos reservados.</p>
        <p className="mt-1">Hecho con ❤️ para celebrar la Navidad.</p>
      </footer>
    </div>
  );
}
