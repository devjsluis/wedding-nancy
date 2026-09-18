import Image from "next/image";

export function Story() {
  return (
    <section className="relative overflow-hidden bg-[#6a424c] py-24 md:py-32 lg:py-36">
      {/* Decoración sutil de fondo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full border border-white/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -right-40 h-[30rem] w-[30rem] rounded-full border border-white/10"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        {/* Texto */}
        <div className="text-center lg:text-left">
          <p className="text-xs uppercase tracking-[0.5em] text-white/65 md:text-sm">
            Nuestra historia
          </p>

          <div className="mx-auto mt-6 h-px w-14 bg-white/35 lg:mx-0" />

          <h2 className="mt-8 font-serif text-5xl font-light leading-[1.08] text-white md:text-6xl lg:text-[4rem]">
            El comienzo
            <span className="mt-1 block italic text-[#f1ded9]">
              de algo para siempre
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-xl text-base leading-8 text-white/75 md:text-lg lg:mx-0">
            Cada historia tiene un comienzo, pero hay encuentros que parecen
            destinados a convertirse en algo para siempre. Hoy celebramos el
            camino recorrido y todo lo que aún nos queda por vivir juntos.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4 lg:justify-start">
            <span className="h-px w-10 bg-white/25" />

            <span className="font-serif text-2xl italic text-[#f1ded9]">
              Valeria &amp; Jesús
            </span>

            <span className="h-px w-10 bg-white/25" />
          </div>
        </div>

        {/* Fotografía */}
        <div className="relative mx-auto w-full max-w-2xl">
          <div className="border border-white/25 p-2 md:p-3">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/story.webp"
                alt="Jesús y Valeria"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />

              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent"
              />
            </div>
          </div>

          <div className="mt-5 flex items-center justify-center gap-4 text-white/60">
            <span className="h-px w-10 bg-white/25" />

            <span className="text-[10px] uppercase tracking-[0.35em]">
              19 · 12 · 2026
            </span>

            <span className="h-px w-10 bg-white/25" />
          </div>
        </div>
      </div>
    </section>
  );
}
