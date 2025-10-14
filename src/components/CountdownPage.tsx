"use client";

import { useState, useEffect } from 'react';

const CountdownPage = () => {
  const [timeLeft, setTimeLeft] = useState<{ days?: number; hours?: number; minutes?: number; seconds?: number }>({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Este efecto se ejecuta solo una vez para indicar que el componente se ha montado en el cliente.
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return; // No ejecutar la lógica del contador en el servidor

    const calculateTimeLeft = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      // El objetivo es el 1 de Diciembre del año actual
      const decemberFirst = new Date(currentYear, 11, 1); // Mes 11 es Diciembre

      const difference = decemberFirst.getTime() - now.getTime();
      let newTimeLeft = {};

      if (difference > 0) {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      } else {
        // Si la diferencia no es positiva, significa que ya es 1 de Diciembre o una fecha posterior.
        // El componente padre (page.tsx) se encarga de no renderizar CountdownPage en este caso.
        // Aquí, simplemente reseteamos el contador a 0.
        newTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      return newTimeLeft;
    };

    // Cálculo inicial del tiempo restante
    setTimeLeft(calculateTimeLeft());

    // Configurar un intervalo para actualizar el contador cada segundo
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(timer);
  }, [isClient]); // La dependencia [isClient] asegura que el efecto se ejecute cuando isClient cambie a true

  if (!isClient) {
    // Durante el renderizado del lado del servidor o antes de la hidratación del cliente,
    // muestra un estado de carga para el contador.
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-8 bg-gradient-to-br from-green-400 to-blue-500 text-white">
        <h1 className="text-5xl sm:text-7xl font-extrabold mb-4">NovenApp</h1>
        <p className="text-xl sm:text-2xl mb-8">Cargando contador para la Navidad...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-8 bg-gradient-to-br from-green-500 via-teal-500 to-blue-600 text-white">
      {/* Estilos en línea para los items del contador. Podrían moverse a un archivo CSS global. */}
      <style jsx global>{`
        .countdown-item-value {
          background-color: rgba(255, 255, 255, 0.1);
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          margin: 0 0.25rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          display: inline-block;
          min-width: 50px; /* Asegura un ancho mínimo */
        }
        .countdown-label {
          font-size: 0.75rem; /* 12px */
          display: block;
          margin-top: 0.25rem;
          color: rgba(255,255,255,0.8);
        }
        /* Clases de animación (deberían definirse en globals.css) */
        @keyframes fadeInDown { 0% { opacity: 0; transform: translateY(-20px); } 100% { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-down { animation: fadeInDown 0.5s ease-out forwards; }
        @keyframes fadeInUp { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fadeInUp 0.5s ease-out forwards; }
        @keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
        .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-600 { animation-delay: 0.6s; }

      `}</style>
      <h1 className="text-5xl sm:text-7xl font-extrabold mb-4 animate-fade-in-down">NovenApp</h1>
      <p className="text-xl sm:text-2xl mb-8 animate-fade-in-up delay-200">
        ¡La magia de la Navidad se acerca! Las novenas de aguinaldos comenzarán pronto.
      </p>
      {/* Verifica que timeLeft.days no sea undefined antes de mostrar el contador */}
      {timeLeft.days !== undefined ? (
        (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) ? (
          <p className="text-3xl sm:text-4xl font-semibold animate-bounce">¡Es hora de las Novenas!</p>
        ) : (
          <div className="text-2xl sm:text-4xl font-mono bg-white/10 p-4 sm:p-6 rounded-lg shadow-xl backdrop-blur-sm animate-fade-in delay-400">
            <p className="text-lg sm:text-xl mb-3">Tiempo restante hasta el 1 de Diciembre:</p>
            <div className="flex justify-center items-start space-x-1 sm:space-x-2">
              <div><span className="countdown-item-value">{String(timeLeft.days).padStart(2, '0')}</span><span className="countdown-label">DÍAS</span></div>
              <span className="text-2xl pt-2 sm:pt-3">:</span>
              <div><span className="countdown-item-value">{String(timeLeft.hours).padStart(2, '0')}</span><span className="countdown-label">HRS</span></div>
              <span className="text-2xl pt-2 sm:pt-3">:</span>
              <div><span className="countdown-item-value">{String(timeLeft.minutes).padStart(2, '0')}</span><span className="countdown-label">MIN</span></div>
              <span className="text-2xl pt-2 sm:pt-3">:</span>
              <div><span className="countdown-item-value">{String(timeLeft.seconds).padStart(2, '0')}</span><span className="countdown-label">SEG</span></div>
            </div>
          </div>
        )
      ) : (
        // Muestra "Calculando..." si timeLeft.days es undefined (estado inicial)
        <p className="text-2xl sm:text-4xl font-mono bg-white/10 p-4 sm:p-6 rounded-lg shadow-xl backdrop-blur-sm animate-fade-in delay-400">Calculando...</p>
      )}
      <p className="mt-10 text-md sm:text-lg animate-fade-in-up delay-600">
        Mientras esperas, ¿por qué no preparas tu lista de villancicos y buñuelos? 🎄
      </p>
    </div>
  );
};

export default CountdownPage;
