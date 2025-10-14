"use client";

import { useEffect, useState } from "react";

interface Snowflake {
  id: number;
  left: number;
  animationDuration: number;
  opacity: number;
  size: number;
}

/**
 * Componente de caída de nieve animada con CSS
 * Genera copos de nieve aleatorios que caen desde la parte superior
 */
export default function Snowfall() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    // Generar copos de nieve con propiedades aleatorias
    const flakes: Snowflake[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100, // Posición horizontal (%)
      animationDuration: Math.random() * 3 + 5, // Duración 5-8s
      opacity: Math.random() * 0.6 + 0.4, // Opacidad 0.4-1
      size: Math.random() * 4 + 2, // Tamaño 2-6px
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake absolute top-0 rounded-full bg-white"
          style={{
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
            animation: `fall ${flake.animationDuration}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-10vh) translateX(0);
          }
          100% {
            transform: translateY(110vh) translateX(${Math.random() * 100 - 50}px);
          }
        }
      `}</style>
    </div>
  );
}
