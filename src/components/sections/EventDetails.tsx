const MAP_URL = "https://maps.app.goo.gl/RPWU2QoGTuWsQLMF6";

export function EventDetails() {
  return (
    <section className="relative overflow-hidden border-t border-[#42594a]/10 bg-[#f8f5ef] py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6 text-center">

        {/* Encabezado */}
        <p className="text-xs uppercase tracking-[0.45em] text-[#6a424c] md:text-sm">
          El gran día
        </p>

        <h2 className="mt-5 font-serif text-4xl text-[#42594a] sm:text-5xl md:text-6xl">
          19 de diciembre de 2026
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#42594a]/70 md:text-lg md:leading-8">
          Nos reuniremos en La Yerbabuena, Mascota, Jalisco, para celebrar
          una tarde llena de amor, familia y momentos inolvidables.
        </p>

        <Ornament />

        {/* Ceremonia */}
        <EventBlock
          icon="♢"
          label="Ceremonia religiosa"
          time="5:00 p.m."
          place="La Yerbabuena"
          address="Mascota, Jalisco"
        />

        <Ornament />

        {/* Recepción */}
        <EventBlock
          icon="✦"
          label="Recepción"
          time="Después de la misa"
          place="La Yerbabuena"
          address="Mascota, Jalisco"
        />

        <Ornament />

        <p className="font-serif text-lg italic text-[#6a424c]/80 md:text-xl">
          Los esperamos para celebrar juntos
        </p>
      </div>
    </section>
  );
}

function EventBlock({
  icon,
  label,
  time,
  place,
  address,
}: {
  icon: string;
  label: string;
  time: string;
  place: string;
  address: string;
}) {
  return (
    <div className="mx-auto max-w-2xl py-3 text-center">
      <div
        aria-hidden="true"
        className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-[#6a424c]/25 font-serif text-xl text-[#6a424c]"
      >
        {icon}
      </div>

      <h3 className="font-serif text-4xl italic text-[#42594a] md:text-5xl">
        {label}
      </h3>

      <p className="mt-5 font-serif text-2xl text-[#42594a] md:text-3xl">
        {time}
      </p>

      <p className="mt-6 text-sm uppercase tracking-[0.18em] text-[#42594a] md:text-base md:tracking-[0.22em]">
        {place}
      </p>

      <p className="mt-2 text-sm text-[#42594a]/65 md:text-base">
        {address}
      </p>

      <a
        href={MAP_URL}
        target="_blank"
        rel="noreferrer"
        className="mt-7 inline-flex items-center justify-center rounded-full bg-[#6a424c] px-7 py-3 text-[11px] uppercase tracking-[0.22em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#59363f]"
      >
        Ver ubicación
      </a>
    </div>
  );
}

function Ornament() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto my-12 flex max-w-[190px] items-center gap-3 md:my-16"
    >
      <span className="h-px flex-1 bg-[#6a424c]/25" />
      <span className="font-serif text-lg text-[#6a424c]/55">◇</span>
      <span className="h-px flex-1 bg-[#6a424c]/25" />
    </div>
  );
}
