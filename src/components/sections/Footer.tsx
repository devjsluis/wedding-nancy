export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#6a424c] px-6 py-16 text-center text-white md:py-20">
      <div className="mx-auto max-w-4xl">

        {/* Ornamento */}
        <div className="mx-auto flex max-w-[150px] items-center gap-3">
          <span className="h-px flex-1 bg-white/25" />
          <span className="font-serif text-lg text-[#f0d4cf]/80">♡</span>
          <span className="h-px flex-1 bg-white/25" />
        </div>

        <p className="mt-8 text-[10px] uppercase tracking-[0.45em] text-white/60 md:text-xs">
          Gracias por acompañarnos
        </p>

        <h2 className="mt-6 whitespace-nowrap font-serif text-[clamp(2.7rem,10vw,4.5rem)] font-light leading-none">
          Valeria <span className="italic text-[#f0d4cf]">&amp;</span> Jesús
        </h2>

        <div className="mx-auto mt-8 h-px w-12 bg-white/25" />

        <p className="mt-7 text-sm font-light tracking-wide text-white/70 md:text-base">
          19 de diciembre de 2026
        </p>

        <p className="mt-2 text-xs uppercase tracking-[0.25em] text-white/45 md:text-sm">
          Mascota, Jalisco
        </p>

        <p className="mt-9 font-serif text-lg italic text-[#f0d4cf]/80 md:text-xl">
          Nos encantará compartir este día contigo.
        </p>
      </div>
    </footer>
  );
}
