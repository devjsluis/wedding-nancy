export function Hotels() {
  const hotels = [
    {
      name: "Hotel Mesón de Santa Elena",
      description: "Opción céntrica en Mascota.",
      maps: "https://www.google.com/maps/search/?api=1&query=Hotel+Meson+de+Santa+Elena+Mascota+Jalisco",
    },
    {
      name: "Hotel Rancho La Esmeralda",
      description: "Ambiente tranquilo y rodeado de naturaleza.",
      maps: "https://www.google.com/maps/search/?api=1&query=Hotel+Rancho+La+Esmeralda+Mascota+Jalisco",
    },
    {
      name: "Posadas y Airbnb en Mascota",
      description: "Recomendamos reservar con anticipación.",
      maps: "https://www.google.com/maps/search/?api=1&query=hospedaje+Mascota+Jalisco",
    },
  ];

  return (
    <section className="bg-[#f8f5ef] py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="uppercase tracking-[0.4em] text-[#6a424c]">Hospedaje</p>

          <h2 className="mt-4 text-5xl text-[#42594a]">
            Para quienes nos visitan
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#42594a]/75">
            Si vienes de fuera, te sugerimos considerar hospedaje en Mascota,
            Jalisco. Te recomendamos reservar con anticipación.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {hotels.map((hotel) => (
            <a
              key={hotel.name}
              href={hotel.maps}
              target="_blank"
              rel="noreferrer"
              className="rounded-3xl border border-[#42594a]/10 bg-white p-8 shadow-sm transition hover:-translate-y-1"
            >
              <h3 className="text-2xl text-[#42594a]">{hotel.name}</h3>
              <p className="mt-4 text-[#42594a]/70">{hotel.description}</p>
              <p className="mt-8 text-sm uppercase tracking-[0.25em] text-[#6a424c]">
                Ver ubicación
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
