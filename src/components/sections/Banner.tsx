import Image from "next/image";

export function Banner() {
  return (
    <section className="relative h-[70vh] overflow-hidden">
      <Image
        src="/images/banner.webp"
        alt="Jesús y Valeria"
        fill
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/35" />

      <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
        <div>
          <p className="text-4xl text-white md:text-6xl">
            Cada historia de amor es hermosa,
          </p>

          <p className="mt-4 text-4xl text-white md:text-6xl">
            pero la nuestra es nuestra favorita.
          </p>
        </div>
      </div>
    </section>
  );
}
