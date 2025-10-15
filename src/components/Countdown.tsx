"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/**
 * Contador regresivo al 1 de diciembre
 * Muestra días, horas, minutos y segundos restantes
 */
export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const calculateTimeLeft = (): TimeLeft => {
      const now = new Date();
      const currentYear = now.getFullYear();
      const nextYear = now.getMonth() === 11 ? currentYear + 1 : currentYear;
      const targetDate = new Date(nextYear, 11, 1); // 1 de diciembre

      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="flex gap-4 justify-center">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="text-center">
            <div className="bg-gradient-to-br from-green-600 to-emerald-500 rounded-xl p-4 min-w-[80px] shadow-lg">
              <div className="text-3xl md:text-5xl font-bold text-white">--</div>
            </div>
            <p className="text-sm mt-2 text-gray-700">---</p>
          </div>
        ))}
      </div>
    );
  }

  const timeUnits = [
    { value: timeLeft.days, label: "Días" },
    { value: timeLeft.hours, label: "Horas" },
    { value: timeLeft.minutes, label: "Minutos" },
    { value: timeLeft.seconds, label: "Segundos" },
  ];

  return (
    <div className="flex gap-3 md:gap-4 justify-center flex-wrap">
      {timeUnits.map((unit, index) => (
        <div key={index} className="text-center">
          <div className="bg-gradient-to-br from-green-600 to-emerald-500 rounded-xl p-3 md:p-4 min-w-[70px] md:min-w-[80px] shadow-lg border border-green-700/20 transition-transform hover:scale-105 hover:shadow-xl">
            <div className="text-3xl md:text-5xl font-bold text-white tabular-nums">
              {String(unit.value).padStart(2, "0")}
            </div>
          </div>
          <p className="text-xs md:text-sm mt-2 text-gray-800 font-semibold">
            {unit.label}
          </p>
        </div>
      ))}
    </div>
  );
}
