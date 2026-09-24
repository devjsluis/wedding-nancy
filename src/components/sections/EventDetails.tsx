import Image from "next/image";

const MAP_URL = "https://maps.app.goo.gl/RPWU2QoGTuWsQLMF6";

/**
 * Forma de arco (ventana de capilla).
 * Se usa radio elíptico en % para que el arco sea un semicírculo perfecto
 * y las esquinas de abajo no se "aplasten" (con rounded-t-full el navegador
 * reduce también los radios inferiores).
 * 40% = mitad del ancho / alto para aspect 4/5 · 45% para aspect 9/10.
 */
const ARCH =
  "rounded-[50%_50%_2rem_2rem/40%_40%_2rem_2rem] md:rounded-[50%_50%_2.5rem_2.5rem/45%_45%_2.5rem_2.5rem]";

export function EventDetails() {
  return (
    <section className="relative overflow-hidden bg-[#f3ebe8]">
      {/* Cúpula superior que enlaza con la sección anterior */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-24 bg-[#f8f5ef] [clip-path:ellipse(70%_55%_at_50%_0%)] md:h-32"
      />

      <div className="relative mx-auto max-w-6xl px-5 pb-24 pt-32 md:px-8 md:pb-32 md:pt-44">
        {/* Encabezado */}
        <div className="text-center">
          <h2 className="mt-5 font-serif text-5xl font-light leading-[1.05] text-[#42594a] sm:text-6xl md:text-7xl">
            Ceremonia y recepción
          </h2>
        </div>

        {/* Composición: arco + tarjeta vino */}
        <div className="mx-auto mt-16 max-w-5xl md:mt-20 md:grid md:grid-cols-12 md:items-center md:pb-10">
          {/* FOTO EN ARCO */}
          <div className="relative w-[88%] md:col-span-7 md:col-start-1 md:row-start-1 md:w-auto">
            {/* Contorno desfasado: da profundidad sin sombras pesadas */}
            <div
              aria-hidden="true"
              className={`absolute inset-0 -translate-x-3 -translate-y-3 border border-[#42594a]/30 md:-translate-x-4 md:-translate-y-4 ${ARCH}`}
            />

            <div
              className={`relative aspect-[4/5] overflow-hidden md:aspect-[9/10] ${ARCH}`}
            >
              <Image
                src="/images/la-yerbabuena.webp"
                alt="Quinta El Pedregal, Jardín de Eventos"
                fill
                sizes="(max-width: 768px) 88vw, 555px"
                className="object-cover"
              />

              {/* Velo inferior para que la foto "aterrice" en la tarjeta */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#2f2228]/35 to-transparent"
              />
            </div>
          </div>

          {/* TARJETA VINO */}
          <div className="relative z-10 -mt-24 ml-auto w-[92%] md:col-span-5 md:col-start-8 md:row-start-1 md:mt-0 md:w-auto md:-ml-24 md:translate-y-10">
            <div className="relative overflow-hidden rounded-[2.5rem_2.5rem_5rem_2.5rem] bg-[#6a424c] px-8 pb-14 pt-20 text-center text-white md:rounded-[7rem_2.5rem_5rem_2.5rem] md:px-10 md:pb-16 md:pt-16">
              {/* Círculos decorativos sutiles */}
              <div
                aria-hidden="true"
                className="absolute -left-24 -top-24 h-64 w-64 rounded-full border border-white/10"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-32 -right-28 h-72 w-72 rounded-full border border-white/10"
              />

              <div className="relative">
                <p className="text-[11px] uppercase tracking-[0.36em] text-white/60">
                  Nos vemos en
                </p>

                <h3 className="mt-5 font-serif text-4xl font-light leading-[0.95] sm:text-5xl md:text-[3rem]">
                  Quinta
                  <span className="mt-1 block italic">El Pedregal</span>
                </h3>

                <p className="mt-4 text-[10px] uppercase tracking-[0.32em] text-white/55">
                  Jardín de Eventos
                </p>

                <div
                  aria-hidden="true"
                  className="mx-auto my-7 flex max-w-[140px] items-center gap-3"
                >
                  <span className="h-px flex-1 bg-white/25" />
                  <span className="font-serif text-base text-white/60">♡</span>
                  <span className="h-px flex-1 bg-white/25" />
                </div>

                <p className="text-[11px] uppercase tracking-[0.3em] text-white/60">
                  Mascota · Jalisco
                </p>

                <p className="mt-7 font-serif text-5xl italic leading-none">
                  5:00 <span className="text-2xl">p.m.</span>
                </p>

                <p className="mt-3 text-[11px] uppercase tracking-[0.3em] text-white/55">
                  Ceremonia religiosa
                </p>

                <a
                  href={MAP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-9 inline-flex items-center gap-3 rounded-full border border-white/40 px-7 py-3.5 text-[11px] uppercase tracking-[0.26em] text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-[#6a424c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  Ver ubicación
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                  >
                    →
                  </span>
                  <span className="sr-only">
                    (se abre en una pestaña nueva)
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Cierre */}
        <div className="mt-16 flex flex-col items-center gap-5 md:mt-24">
          <span aria-hidden="true" className="h-12 w-px bg-[#6a424c]/25" />
          <p className="max-w-xs text-center font-serif text-xl italic leading-snug text-[#6a424c]/85 md:max-w-lg md:text-3xl">
            Aquí comienza nuestro gran día
          </p>
        </div>
      </div>
    </section>
  );
}
