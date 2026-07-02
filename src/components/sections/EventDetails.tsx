// import { weddingConfig } from "@/lib/wedding";

export function EventDetails() {
  return (
    <section className="border-t border-[#42594a]/10 bg-[#f8f5ef] py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="uppercase tracking-[0.4em] text-[#6a424c]">
            El gran día
          </p>

          <h2 className="mt-4 text-5xl text-[#42594a]">
            19 de diciembre de 2026
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#42594a]/75">
            Nos reuniremos en La Yerbabuena, en Mascota, Jalisco, para celebrar
            una tarde llena de amor, familia y momentos inolvidables.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <EventCard
            label="Ceremonia"
            title="Misa"
            time="5:00 p.m."
            place="La Yerbabuena"
            address="Mascota, Jalisco"
          />

          <EventCard
            label="Recepción"
            title="Celebración"
            time="Después de la misa"
            place="La Yerbabuena"
            address="Mascota, Jalisco"
          />
        </div>

        <div className="mt-12 rounded-3xl border border-[#42594a]/10 bg-white p-8 text-center shadow-sm">
          <p className="text-sm uppercase tracking-[0.3em] text-[#6a424c]">
            Ubicación
          </p>

          <h3 className="mt-4 text-3xl text-[#42594a]">
            La Yerbabuena, Mascota, Jalisco
          </h3>

          <a
            href="https://www.google.com/maps/search/?api=1&query=La+Yerbabuena+Mascota+Jalisco"
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex rounded-full bg-[#6a424c] px-8 py-4 text-sm uppercase tracking-[0.25em] text-white transition hover:scale-105"
          >
            Abrir mapa
          </a>
        </div>
      </div>
    </section>
  );
}

function EventCard({
  label,
  title,
  time,
  place,
  address,
}: {
  label: string;
  title: string;
  time: string;
  place: string;
  address: string;
}) {
  return (
    <div className="rounded-3xl border border-[#42594a]/10 bg-white p-8 shadow-sm">
      <p className="uppercase tracking-[0.3em] text-[#6a424c]">{label}</p>
      <h3 className="mt-4 text-4xl text-[#42594a]">{title}</h3>
      <p className="mt-6 text-xl text-[#42594a]">{time}</p>
      <p className="mt-6 text-[#42594a]/75">{place}</p>
      <p className="mt-2 text-[#42594a]/60">{address}</p>
    </div>
  );
}
