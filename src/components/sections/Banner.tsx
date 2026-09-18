import Image from "next/image";

export function Banner() {
  return (
    <section className="relative h-[65vh] min-h-[520px] overflow-hidden md:h-[72vh]">
      <Image
        src="/images/banner.webp"
        alt="Jesús y Valeria"
        fill
        sizes="100vw"
        className="object-cover"
      />

      {/* Overlay para integrar la fotografía con el texto */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
        <div className="mx-auto max-w-4xl">
          <div className="mx-auto mb-7 flex max-w-[150px] items-center gap-3">
            <span className="h-px flex-1 bg-white/35" />
            <span className="font-serif text-lg text-white/65">♡</span>
            <span className="h-px flex-1 bg-white/35" />
          </div>

          <div className="mx-auto whitespace-nowrap">
            <p className="font-serif text-[clamp(1.45rem,5.6vw,3.4rem)] font-light leading-[1.2] text-white">
              Cada historia de amor es hermosa,
            </p>

            <p className="mt-3 font-serif text-[clamp(1.35rem,5.2vw,3.25rem)] font-light italic leading-[1.2] text-[#f1ded9] md:mt-4">
              pero la nuestra es nuestra favorita.
            </p>
          </div>

          <div className="mx-auto mt-8 h-px w-14 bg-white/40" />

          <p className="mt-6 text-[10px] uppercase tracking-[0.4em] text-white/65 md:text-xs">
            Valeria &amp; Jesús
          </p>
        </div>
      </div>
    </section>
  );
}
