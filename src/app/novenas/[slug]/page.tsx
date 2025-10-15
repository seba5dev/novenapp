"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Suspense, useState, useEffect } from "react";
import { ArrowLeft, Share2, Calendar, Heart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Interface para los datos de la novena
 */
interface NovenaData {
  nombre: string;
  dedicatoria: string;
  ciudad: string;
}

/**
 * Contenido de la novena personalizada
 */
function NovenaPersonalizadaContent() {
  const params = useParams();
  const slug = params.slug as string;

  const [currentDay, setCurrentDay] = useState(1);
  const [novenaData, setNovenaData] = useState<NovenaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar datos de la novena desde la API
  useEffect(() => {
    async function fetchNovenaData() {
      try {
        setLoading(true);
        const response = await fetch(`/api/novena/${slug}`);

        if (!response.ok) {
          if (response.status === 404) {
            setError("Novena no encontrada");
          } else {
            setError("Error al cargar la novena");
          }
          return;
        }

        const result = await response.json();

        if (result.ok && result.data) {
          setNovenaData(result.data);
        } else {
          setError("No se pudieron cargar los datos");
        }
      } catch (err) {
        console.error("Error al cargar novena:", err);
        setError("Error de conexión");
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchNovenaData();
    }
  }, [slug]);

  // Extraer el nombre del slug como fallback
  const nombreFromSlug = slug
    ?.split('-')
    .slice(0, -1)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ') || 'Familia';

  // Usar el nombre de la API o el del slug como fallback
  const nombreDisplay = novenaData?.nombre || nombreFromSlug;

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Novena de ${nombreDisplay}`,
          text: `¡Únete a nuestra novena de aguinaldos digital del 16 al 24 de diciembre!`,
          url: url,
        });
      } catch (err) {
        console.log("Error al compartir:", err);
      }
    } else {
      navigator.clipboard.writeText(url);
      alert("¡Link copiado al portapapeles!");
    }
  };

  const dias = [
    { numero: 1, fecha: "16 de diciembre", tema: "El anuncio del Ángel a María" },
    { numero: 2, fecha: "17 de diciembre", tema: "La visita de María a su prima Isabel" },
    { numero: 3, fecha: "18 de diciembre", tema: "El nacimiento de Juan el Bautista" },
    { numero: 4, fecha: "19 de diciembre", tema: "La anunciación del nacimiento de Jesús a José" },
    { numero: 5, fecha: "20 de diciembre", tema: "El viaje de María y José a Belén" },
    { numero: 6, fecha: "21 de diciembre", tema: "El nacimiento del Niño Jesús" },
    { numero: 7, fecha: "22 de diciembre", tema: "La adoración de los pastores" },
    { numero: 8, fecha: "23 de diciembre", tema: "La presentación del Niño Jesús en el templo" },
    { numero: 9, fecha: "24 de diciembre", tema: "La adoración de los Reyes Magos" },
  ];

  // Mostrar loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f7f3ef] via-[#fdfbf7] to-[#f5f1ed] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto mb-4" />
          <p className="text-gray-600">Cargando tu novena...</p>
        </div>
      </div>
    );
  }

  // Mostrar error
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f7f3ef] via-[#fdfbf7] to-[#f5f1ed] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">😔 {error}</h2>
          <p className="text-gray-600 mb-6">
            No pudimos encontrar esta novena. Por favor verifica el enlace.
          </p>
          <Link href="/">
            <Button
              className="bg-green-600 hover:bg-green-700 text-white cursor-pointer"
              aria-label="Volver a la página de inicio"
            >
              Volver al inicio
            </Button>
          </Link>
        </div>
      </div>
    );
  }

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

          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Novena de Aguinaldos 🎄
            </h1>
            <p className="text-2xl text-green-600 font-semibold mb-2">
              {nombreDisplay}
            </p>

            {/* Mostrar dedicatoria si existe */}
            {novenaData?.dedicatoria && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 mb-4 border border-green-100">
                <Heart className="inline-block h-5 w-5 text-green-600 mb-1" />
                <p className="text-gray-700 italic">
                  &ldquo;{novenaData.dedicatoria}&rdquo;
                </p>
              </div>
            )}

            <p className="text-gray-600 mb-6">
              Del 16 al 24 de diciembre • 9 días de oración y reflexión
            </p>

            {/* Botón compartir */}
            <Button
              onClick={handleShare}
              className="bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white cursor-pointer"
              aria-label="Compartir esta novena por WhatsApp, email o redes sociales"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Compartir esta novena
            </Button>
          </div>
        </div>

        {/* Selector de días */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            <Calendar className="inline-block mr-2 h-6 w-6" />
            Selecciona el día
          </h2>

          <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
            {dias.map((dia) => (
              <button
                key={dia.numero}
                onClick={() => setCurrentDay(dia.numero)}
                className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${currentDay === dia.numero
                  ? 'border-green-600 bg-green-50 text-green-600'
                  : 'border-gray-200 hover:border-green-300'
                  }`}
                aria-label={`Seleccionar día ${dia.numero} - ${dia.fecha}`}
                aria-pressed={currentDay === dia.numero}
              >
                <div className="text-lg font-bold">Día {dia.numero}</div>
                <div className="text-xs text-gray-600 mt-1">
                  {dia.fecha.split(' ')[0]}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Contenido del día seleccionado */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          <div className="text-center border-b border-gray-200 pb-6">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              Día {currentDay}
            </h3>
            <p className="text-lg text-gray-600">
              {dias[currentDay - 1].fecha}
            </p>
            <p className="text-xl text-green-600 font-semibold mt-4">
              {dias[currentDay - 1].tema}
            </p>
          </div>

          {/* Oración para todos los días */}
          <section className="space-y-4">
            <h4 className="text-2xl font-bold text-gray-900">
              Oración para todos los días
            </h4>
            <p className="text-gray-700 leading-relaxed">
              Benignísimo Dios de infinita caridad, que tanto amasteis a los hombres,
              que les dísteis en vuestro hijo la prenda de vuestro amor, para que hecho
              hombre en las entrañas de una Virgen naciese en un pesebre para nuestra
              salud y remedio; yo, en nombre de todos los mortales, os doy infinitas
              gracias por tan soberano beneficio.
            </p>
            <p className="text-gray-700 leading-relaxed">
              En retorno de él os ofrezco la pobreza, humildad y demás virtudes de vuestro
              hijo humanado, suplicándoos por sus divinos méritos, por las incomodidades
              en que nació y por las tiernas lágrimas que derramó en el pesebre, que
              dispongáis nuestros corazones con humildad profunda, con amor encendido,
              con tal desprecio de todo lo terreno, para que Jesús recién nacido tenga
              en ellos su cuna y more eternamente. Amén.
            </p>
            <p className="text-center text-sm text-gray-500 italic">
              (Se reza tres veces Gloria al Padre)
            </p>
          </section>

          {/* Consideración del día */}
          <section className="space-y-4 bg-green-50 p-6 rounded-lg">
            <h4 className="text-2xl font-bold text-gray-900">
              Consideración del Día {currentDay}
            </h4>
            <p className="text-gray-700 leading-relaxed">
              {getConsideracion(currentDay)}
            </p>
          </section>

          {/* Villancico */}
          <section className="space-y-4 bg-amber-50 p-6 rounded-lg">
            <h4 className="text-2xl font-bold text-gray-900">
              🎵 Villancico del día
            </h4>
            <p className="text-gray-600 italic">
              Canta con tu familia para celebrar este día especial
            </p>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {getVillancico(currentDay)}
            </p>
          </section>

          {/* Navegación entre días */}
          <div className="flex justify-between pt-6 border-t border-gray-200">
            <Button
              onClick={() => setCurrentDay(Math.max(1, currentDay - 1))}
              disabled={currentDay === 1}
              variant="outline"
              className="cursor-pointer disabled:cursor-not-allowed"
              aria-label="Ir al día anterior"
            >
              ← Día anterior
            </Button>
            <Button
              onClick={() => setCurrentDay(Math.min(9, currentDay + 1))}
              disabled={currentDay === 9}
              className="bg-green-600 hover:bg-green-700 text-white cursor-pointer disabled:cursor-not-allowed"
              aria-label="Ir al día siguiente"
            >
              Día siguiente →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Función helper para obtener la consideración de cada día
 */
function getConsideracion(dia: number): string {
  const consideraciones = [
    "Meditemos en el anuncio del Ángel Gabriel a María. Con humildad y fe, María acepta la voluntad de Dios y se convierte en la Madre del Salvador.",
    "Reflexionemos sobre la visita de María a su prima Isabel. Con caridad y servicio, María lleva a Jesús en su vientre para compartir la alegría de la salvación.",
    "Contemplemos el nacimiento de Juan el Bautista, quien preparó el camino del Señor. Que nosotros también preparemos nuestros corazones para recibir a Jesús.",
    "Meditemos en cómo el Ángel anuncia a José el nacimiento de Jesús. Con fe y obediencia, José acepta su misión de ser padre adoptivo del Salvador.",
    "Acompañemos a María y José en su viaje a Belén. A pesar de las dificultades, confían en Dios y cumplen su voluntad.",
    "Adoremos al Niño Jesús recién nacido en el pesebre. El Hijo de Dios se hace pequeño y pobre por amor a nosotros.",
    "Imitemos a los pastores que adoraron al Niño Jesús. Con sencillez y alegría, reconocemos en Él a nuestro Salvador.",
    "Reflexionemos sobre la presentación de Jesús en el templo. María y José cumplen la ley y ofrecen a su Hijo a Dios.",
    "Contemplemos la adoración de los Reyes Magos. Desde lejanas tierras vienen a adorar al Rey de reyes, ofreciéndole sus dones más preciosos.",
  ];

  return consideraciones[dia - 1] || "";
}

/**
 * Función helper para obtener el villancico de cada día
 */
function getVillancico(dia: number): string {
  const villancicos = [
    "A la nanita nana\nNanita ella, nanita ella\nMi Jesús tiene sueño\nBendito sea, bendito sea",
    "Los peces en el río\nLa Virgen se está peinando\nEntre cortina y cortina\nSus cabellos son de oro\nY el peine de plata fina",
    "Noche de paz\nNoche de amor\nTodo duerme en derredor\nSolo velan en la oscuridad\nLos pastores que en el campo están",
    "Ven a cantar\nQue ya nació el niñito\nVen a rezar al pie del portalito\nQue todo es un amor\nQue todo es un cantar",
    "Vamos, pastores, vamos\nVamos a Belén\nA ver en aquel niño\nLa gloria del Edén",
    "Mi burrito sabanero\nVa camino de Belén\nSi me ven, si me ven\nVoy camino de Belén",
    "Campana sobre campana\nY sobre campana una\nAsómate a la ventana\nVerás el Niño en la cuna",
    "Los pastores a Belén\nCorren presurosos\nLlevan de tanto correr\nLos zapatos rotos",
    "Venid, adoremos\nVenid, adoremos\nVenid, adoremos a Cristo el Señor",
  ];

  return villancicos[dia - 1] || "Canta tu villancico favorito";
}

/**
 * Página de novena personalizada con slug único
 */
export default function NovenaPersonalizadaPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p>Cargando tu novena...</p>
      </div>
    }>
      <NovenaPersonalizadaContent />
    </Suspense>
  );
}
