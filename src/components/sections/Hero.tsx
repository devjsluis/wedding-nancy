import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-[#f8f5ef]">
      {/* Fotografía */}
      <div className="relative h-[72svh] min-h-[560px] w-full overflow-hidden md:h-[82svh]">
        <Image
          src="/images/hero.webp"
          alt="Jesús y Valeria"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_25%] scale-[1.12]"
        />

        {/* Oscurecimiento muy ligero para conservar detalle */}
        <div className="absolute inset-0 bg-black/10" />

        {/* Difuminado/degradado de la fotografía hacia el fondo crema */}
        <div className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-b from-transparent via-[#f8f5ef]/65 to-[#f8f5ef]" />
      </div>

      {/* Información principal */}
      <div className="relative z-10 -mt-24 px-6 pb-20 text-center sm:-mt-28 md:-mt-32">
        <p className="mx-auto max-w-xl font-serif text-xl italic leading-relaxed text-[#6a424c]/80 sm:text-2xl">
          Un instante, una promesa, toda una vida
        </p>

        <h1 className="mt-7 font-serif text-5xl leading-[0.95] text-[#6a424c] sm:text-6xl md:text-8xl">
          Valeria &amp; Jesús
        </h1>

        <div className="mx-auto mt-8 flex items-center justify-center gap-4 text-[#42594a]/70">
          <span className="h-px w-10 bg-[#6a424c]/30" />
          <p className="text-xs tracking-[0.38em] sm:text-sm">
            19 · 12 · 2026
          </p>
          <span className="h-px w-10 bg-[#6a424c]/30" />
        </div>
      </div>
    </section>
  );
}
