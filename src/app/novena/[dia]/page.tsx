// No se necesita useRouter ni "use client" para Server Components

import Link from "next/link";

// Esta es una plantilla básica. Deberás crear contenido específico para cada día.
// Cambiamos la firma para recibir params como un Server Component
const DiaDeNovena = async ({ params }: { params: { dia: string } }) => {
  // dia contendrá 'dia-1', 'dia-2', etc. directamente de los parámetros de la ruta
  const { dia } = params;

  // Extraer el número del día para mostrarlo o usarlo en la lógica
  const numeroDia = dia ? parseInt(String(dia).split('-')[1]) : null;

  if (!numeroDia) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Día no encontrado</h1>
        <p>Por favor, selecciona un día válido de la novena.</p>
        <Link href="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-4 sm:p-8 bg-black text-white font-[family-name:var(--font-geist-sans)]">
      <header className="w-full max-w-3xl text-center py-8 mb-8">
        <Link href="/" className="text-lg hover:underline mb-4 inline-block">← Volver al Inicio</Link>
        <h1 className="text-4xl sm:text-5xl font-extrabold">Novena de Aguinaldos - Día {numeroDia}</h1>
      </header>

      <main className="w-full max-w-3xl bg-gray-900 p-6 sm:p-8 rounded-lg shadow-xl mb-8">
        {/* Aquí irá el contenido específico de cada día de la novena */}
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Oraciones para el Día {numeroDia}</h2>
        
        <div className="space-y-6 text-left">
          <section>
            <h3 className="text-xl font-semibold mb-2">Oración para todos los días</h3>
            <p className="text-base sm:text-lg leading-relaxed">
              Benignísimo Dios de infinita caridad, que tanto amasteis a los hombres, que les dísteis en vuestro hijo la prenda de vuestro amor, para que hecho hombre en las entrañas de una Virgen naciese en un pesebre para nuestra salud y remedio; yo, en nombre de todos los mortales, os doy infinitas gracias por tan soberano beneficio. En retorno de él os ofrezco la pobreza, humildad y demás virtudes de vuestro hijo humanado, suplicándoos por sus divinos méritos, por las incomodidades en que nació y por las tiernas lágrimas que derramó en el pesebre, que dispongáis nuestros corazones con humildad profunda, con amor encendido, con tal desprecio de todo lo terreno, para que Jesús recién nacido tenga en ellos su cuna y more eternamente. Amén. (Se reza tres veces Gloria al Padre).
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2">Consideración del Día {numeroDia}</h3>
            {/* TODO: Añadir el texto específico de la consideración para el día {numeroDia} */}
            <p className="text-base sm:text-lg leading-relaxed">
              Contenido de la consideración del día {numeroDia}...
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2">Oración a la Santísima Virgen</h3>
            <p className="text-base sm:text-lg leading-relaxed">
              Soberana María, que por vuestras grandes virtudes y especialmente por vuestra humildad, merecisteis que todo un Dios os escogiese por madre suya, os suplico que vos misma preparéis y dispongáis mi alma y la de todos los que en este tiempo hiciesen esta novena, para el nacimiento espiritual de vuestro adorado hijo. ¡Oh dulcísima madre!, comunicadme algo del profundo recogimiento y divina ternura con que lo aguardasteis vos, para que nos hagáis menos indignos de verle, amarle y adorarle por toda la eternidad. Amén. (Se reza tres veces Dios te salve María).
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2">Oración a San José</h3>
            <p className="text-base sm:text-lg leading-relaxed">
              ¡Oh santísimo José, esposo de María y padre adoptivo de Jesús! Infinitas gracias doy a Dios porque os escogió para tan soberanos ministerios y os adornó con todos los dones proporcionados a tan excelente grandeza. Os ruego, por el amor que tuvisteis al Divino Niño, me abraséis en fervorosos deseos de verle y recibirle sacramentalmente, mientras en su divina esencia le veo y le gozo en el cielo. Amén. (Se reza un Padrenuestro, un Avemaría y un Gloria).
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2">Gozos</h3>
            {/* TODO: Añadir los gozos aquí */}
            <p className="text-base sm:text-lg leading-relaxed">
              Dulce Jesús mío, mi niño adorado ¡Ven a nuestras almas! ¡Ven no tardes tanto!
              <br />
              (Coro)
              <br />
              ¡Oh, Sapiencia suma del Dios soberano, que a infantil alcance te rebajas sacro! ¡Oh, Divino Niño, ven para enseñarnos la prudencia que hace verdaderos sabios! 
              <br />
              (Coro)
              {/* ... y así sucesivamente para todos los gozos ... */}
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2">Oración al Niño Jesús</h3>
            <p className="text-base sm:text-lg leading-relaxed">
              Acordaos, ¡oh dulcísimo Niño Jesús!, que dijisteis a la venerable Margarita del santísimo Sacramento, y en persona suya a todos vuestros devotos, estas palabras tan consoladoras para nuestra pobre humanidad agobiada y doliente: “Todo lo que quieras pedir, pídelo por los méritos de mi infancia y nada te será negado”. Llenos de confianza en vos, ¡oh Jesús!, que sois la misma verdad, venimos a exponeros toda nuestra miseria. Ayúdanos a llevar una vida santa, para conseguir una eternidad bienaventurada. Concédenos, por los méritos infinitos de vuestra infancia, la gracia de la cual necesitamos tanto. Nos entregamos a vos, ¡oh Niño omnipotente!, seguros de que no quedará frustrada nuestra esperanza, y de que, en virtud de vuestra divina promesa, acogeréis y despacharéis favorablemente nuestra súplica. Amén.
            </p>
          </section>
        </div>
      </main>

      <footer className="w-full max-w-3xl text-center py-6 mt-8">
        <p>&copy; {new Date().getFullYear()} NovenApp. </p>
      </footer>
    </div>
  );
};

export default DiaDeNovena;
