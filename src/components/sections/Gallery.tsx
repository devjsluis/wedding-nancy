import Image from "next/image";

const photos = [
  "/images/gallery-1.webp",
  "/images/gallery-2.webp",
  "/images/gallery-3.webp",
  "/images/gallery-4.webp",
  "/images/gallery-5.webp",
  "/images/gallery-6.webp",
];

export function Gallery() {
  return (
    <section className="bg-white py-32">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center uppercase tracking-[0.4em] text-[#6a424c]">
          Galería
        </p>

        <h2 className="mt-4 text-center text-5xl text-[#42594a]">
          Algunos momentos nuestros
        </h2>

        <div className="mt-16 columns-1 gap-6 md:columns-2 lg:columns-3">
          {photos.map((photo) => (
            <div key={photo} className="mb-6 overflow-hidden rounded-3xl">
              <Image
                src={photo}
                alt="Jesús y Valeria"
                width={800}
                height={1200}
                className={`w-full transition duration-500 hover:scale-105 ${
                  photo === "/images/gallery-2.webp"
                    ? "h-[823px] object-cover"
                    : ""
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
