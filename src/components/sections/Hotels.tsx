export function Hotels() {
  const hotels = [
    {
      number: "01",
      name: "Hotel Mesón de Santa Elena",
      description: "Una opción céntrica para disfrutar de Mascota y descansar cerca de la celebración.",
      maps: "https://www.google.com/maps/search/?api=1&query=Hotel+Meson+de+Santa+Elena+Mascota+Jalisco",
    },
    {
      number: "02",
      name: "Hotel Rancho La Esmeralda",
      description: "Un espacio tranquilo, rodeado de naturaleza y del encanto de la sierra.",
      maps: "https://www.google.com/maps/search/?api=1&query=Hotel+Rancho+La+Esmeralda+Mascota+Jalisco",
    },
    {
      number: "03",
      name: "Posadas y Airbnb",
      description: "También encontrarás distintas opciones de hospedaje para elegir la que mejor se adapte a tu visita.",
      maps: "https://www.google.com/maps/search/?api=1&query=hospedaje+Mascota+Jalisco",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#f8f5ef] py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">

        {/* Encabezado */}
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.5em] text-[#6a424c] md:text-sm">
            Hospedaje
          </p>

          <div className="mx-auto mt-6 h-px w-14 bg-[#6a424c]/35" />

          <h2 className="mt-8 font-serif text-5xl font-light text-[#42594a] md:text-6xl">
            Para quienes
            <span className="block italic text-[#6a424c]">
              nos visitan
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-[#42594a]/70 md:text-lg">
            Si vienes de fuera, queremos que tu estancia sea parte de una
            experiencia inolvidable. Estas son algunas opciones de hospedaje
            en Mascota, Jalisco.
          </p>
        </div>

        {/* Opciones */}
        <div className="mx-auto mt-16 grid max-w-5xl md:mt-20 md:grid-cols-3">
          {hotels.map((hotel, index) => (
            <article
              key={hotel.name}
              className={[
                "group relative flex flex-col items-center px-7 py-10 text-center md:min-h-[330px] md:px-10 md:py-4",
                index > 0
                  ? "border-t border-[#6a424c]/15 md:border-l md:border-t-0"
                  : "",
              ].join(" ")}
            >
              <p className="text-[10px] tracking-[0.4em] text-[#6a424c]/45">
                {hotel.number}
              </p>

              <div className="mt-5 font-serif text-xl text-[#6a424c]/55">
                ◇
              </div>

              <h3 className="mt-5 font-serif text-3xl font-light leading-tight text-[#42594a] md:text-[2rem]">
                {hotel.name}
              </h3>

              <p className="mt-5 max-w-xs text-sm leading-7 text-[#42594a]/65 md:text-[15px]">
                {hotel.description}
              </p>

              <div className="mt-auto pt-8">
                <a
                  href={hotel.maps}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 border-b border-[#6a424c]/30 pb-1 text-[10px] uppercase tracking-[0.3em] text-[#6a424c] transition duration-300 hover:border-[#6a424c] md:text-[11px]"
                >
                  Ver ubicación
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Cierre */}
        <div className="mx-auto mt-16 max-w-xl text-center md:mt-20">
          <div className="mx-auto flex max-w-[170px] items-center gap-3">
            <span className="h-px flex-1 bg-[#6a424c]/20" />
            <span className="font-serif text-lg text-[#6a424c]/50">♡</span>
            <span className="h-px flex-1 bg-[#6a424c]/20" />
          </div>

          <p className="mt-6 font-serif text-lg italic text-[#6a424c]/75 md:text-xl">
            Te recomendamos reservar con anticipación.
          </p>
        </div>
      </div>
    </section>
  );
}
