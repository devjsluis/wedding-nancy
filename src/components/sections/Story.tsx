import Image from "next/image";

export function Story() {
  return (
    <section className="bg-[#f8f5ef] py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-2">
        <div>
          <p className="uppercase tracking-[0.4em] text-[#6a424c]">
            Nuestra historia
          </p>

          <h2 className="mt-4 text-5xl text-[#42594a]">
            El comienzo de algo para siempre
          </h2>

          <p className="mt-8 text-lg leading-relaxed text-[#42594a]/80">
            Texto que quieras que ponga!!
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl">
          <Image
            src="/images/story.webp"
            alt="Jesús y Valeria"
            width={900}
            height={1200}
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
}
