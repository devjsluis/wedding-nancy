"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";

const photos = [
  {
    src: "/images/gallery-1.webp",
    alt: "Jesús y Valeria compartiendo un momento especial",
  },
  {
    src: "/images/gallery-2.webp",
    alt: "Jesús y Valeria juntos",
  },
  {
    src: "/images/gallery-3.webp",
    alt: "Un recuerdo de Jesús y Valeria",
  },
  {
    src: "/images/gallery-4.webp",
    alt: "Jesús y Valeria disfrutando juntos",
  },
  {
    src: "/images/gallery-5.webp",
    alt: "Momento especial de Jesús y Valeria",
  },
  {
    src: "/images/gallery-6.webp",
    alt: "Recuerdo de Jesús y Valeria",
  },
];

export function Gallery() {
  const [autoplayPlugin] = useState(() =>
    Autoplay({
      delay: 4500,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      skipSnaps: false,
    },
    [autoplayPlugin],
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;

    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;

    emblaApi.scrollPrev();
    autoplayPlugin.reset();
  }, [emblaApi, autoplayPlugin]);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;

    emblaApi.scrollNext();
    autoplayPlugin.reset();
  }, [emblaApi, autoplayPlugin]);

  const scrollTo = useCallback(
    (index: number) => {
      if (!emblaApi) return;

      emblaApi.scrollTo(index);
      autoplayPlugin.reset();
    },
    [emblaApi, autoplayPlugin],
  );

  return (
    <section className="overflow-hidden bg-[#fdfbf8] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="px-6 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-[#6a424c]">
            Galería
          </p>

          <h2 className="mt-4 font-serif text-4xl text-[#42594a] sm:text-5xl lg:text-6xl">
            Algunos momentos nuestros
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#6b716c]">
            Recuerdos que cuentan nuestra historia y nos acompañarán para
            siempre.
          </p>
        </div>

        <div className="relative mt-14 sm:mt-20">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex touch-pan-y">
              {photos.map((photo, index) => {
                const isSelected = index === selectedIndex;

                return (
                  <div
                    key={photo.src}
                    className="
                      min-w-0
                      flex-[0_0_88%]
                      px-2
                      transition-all
                      duration-500
                      sm:flex-[0_0_68%]
                      sm:px-3
                      lg:flex-[0_0_46%]
                    "
                  >
                    <div
                      className={`
                        relative overflow-hidden rounded-4xl
                        transition-all duration-700 ease-out
                        ${
                          isSelected
                            ? "scale-100 opacity-100 shadow-[0_30px_80px_rgba(66,89,74,0.22)]"
                            : "scale-[0.9] opacity-45"
                        }
                      `}
                    >
                      <div className="relative aspect-4/5 sm:aspect-5/6">
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          sizes="
                            (max-width: 640px) 88vw,
                            (max-width: 1024px) 68vw,
                            46vw
                          "
                          className="object-cover transition-transform duration-1200 ease-out hover:scale-105"
                          priority={index === 0}
                        />

                        <div className="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent" />

                        <div
                          className={`
                            absolute right-0 bottom-0 left-0
                            flex items-end justify-between
                            p-6 text-white
                            transition-all duration-700
                            sm:p-8
                            ${
                              isSelected
                                ? "translate-y-0 opacity-100"
                                : "translate-y-4 opacity-0"
                            }
                          `}
                        >
                          <span className="font-serif text-2xl italic sm:text-3xl">
                            Nuestro recuerdo
                          </span>

                          <span className="text-sm tracking-[0.25em]">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Ver fotografía anterior"
            className="
              absolute top-1/2 left-4 z-10
              hidden size-13 -translate-y-1/2
              items-center justify-center rounded-full
              border border-white/60 bg-white/90
              text-[#42594a] shadow-lg backdrop-blur-md
              transition
              hover:scale-110 hover:bg-white
              focus-visible:ring-2
              focus-visible:ring-[#6a424c]
              focus-visible:outline-none
              md:flex lg:left-10
            "
          >
            <ChevronLeft className="size-5" />
          </button>

          <button
            type="button"
            onClick={scrollNext}
            aria-label="Ver fotografía siguiente"
            className="
              absolute top-1/2 right-4 z-10
              hidden size-13 -translate-y-1/2
              items-center justify-center rounded-full
              border border-white/60 bg-white/90
              text-[#42594a] shadow-lg backdrop-blur-md
              transition
              hover:scale-110 hover:bg-white
              focus-visible:ring-2
              focus-visible:ring-[#6a424c]
              focus-visible:outline-none
              md:flex lg:right-10
            "
          >
            <ChevronRight className="size-5" />
          </button>
        </div>

        <div className="mt-10 flex items-center justify-center gap-3 px-6">
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Ver fotografía anterior"
            className="
              flex size-11 items-center justify-center
              rounded-full border border-[#42594a]/20
              text-[#42594a] transition
              hover:border-[#42594a] hover:bg-[#42594a]
              hover:text-white md:hidden
            "
          >
            <ChevronLeft className="size-5" />
          </button>

          <div className="flex items-center gap-2">
            {photos.map((photo, index) => (
              <button
                key={photo.src}
                type="button"
                onClick={() => scrollTo(index)}
                aria-label={`Ir a la fotografía ${index + 1}`}
                aria-current={index === selectedIndex ? "true" : undefined}
                className={`
                  h-2 rounded-full transition-all duration-300
                  ${
                    index === selectedIndex
                      ? "w-8 bg-[#6a424c]"
                      : "w-2 bg-[#6a424c]/25 hover:bg-[#6a424c]/50"
                  }
                `}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={scrollNext}
            aria-label="Ver fotografía siguiente"
            className="
              flex size-11 items-center justify-center
              rounded-full border border-[#42594a]/20
              text-[#42594a] transition
              hover:border-[#42594a] hover:bg-[#42594a]
              hover:text-white md:hidden
            "
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
