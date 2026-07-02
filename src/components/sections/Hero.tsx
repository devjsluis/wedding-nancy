import Image from "next/image";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 text-white">
      <Image
        src="/images/hero.webp"
        alt="Jesús y Valeria"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[50%_20%]"
      />

      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/45" />

      <div className="relative z-10 max-w-5xl text-center">
        <p className="mb-6 text-sm uppercase tracking-[0.45em] text-white/80">
          We are getting married
        </p>

        <h1 className="font-serif text-7xl leading-none md:text-9xl">
          Jesús <span className="italic">&</span> Valeria
        </h1>

        <p className="mt-8 text-lg tracking-[0.25em] text-white/85">
          19 DE DICIEMBRE · 2026
        </p>

        <div className="mx-auto mt-10 h-px w-32 bg-white/50" />

        <p className="mx-auto mt-10 max-w-xl text-lg leading-8 text-white/85">
          Una celebración íntima, elegante y llena de amor para compartir el
          inicio de esta nueva historia.
        </p>

        {/* <a
          href="#rsvp"
          className="mt-12 inline-flex rounded-full bg-[#6a424c] px-8 py-4 text-sm uppercase tracking-[0.25em] text-white transition hover:scale-105"
        >
          Confirmar asistencia
        </a> */}
      </div>
    </section>
  );
}
