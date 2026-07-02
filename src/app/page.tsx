import { Banner } from "@/components/sections/Banner";
import { Countdown } from "@/components/sections/Countdown";
import { DressCode } from "@/components/sections/DressCode";
import { EventDetails } from "@/components/sections/EventDetails";
import { Footer } from "@/components/sections/Footer";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { Hotels } from "@/components/sections/Hotels";
import { RSVP } from "@/components/sections/RSVP";
import { Story } from "@/components/sections/Story";

export default function Home() {
  return (
    <main className="bg-[#f8f5ef] text-[#42594a] min-h-screen">
      {/* <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#a8b3a2_0%,transparent_36%)] opacity-40" />

        <div className="relative z-10 max-w-4xl text-center">
          <p className="mb-6 text-sm uppercase tracking-[0.45em] text-[#6a424c]">
            We're getting married
          </p>

          <h1 className="font-serif text-7xl leading-none md:text-9xl">
            Jesús <span className="italic">&</span> Valeria
          </h1>

          <p className="mt-8 text-lg tracking-[0.25em] text-[#42594a]/80">
            PRÓXIMAMENTE
          </p>

          <div className="mx-auto mt-10 h-px w-32 bg-[#6a424c]/40" />

          <p className="mx-auto mt-10 max-w-xl text-lg leading-8 text-[#42594a]/75">
            Una celebración íntima, elegante y llena de amor para compartir el
            inicio de esta nueva historia.
          </p>

          <a
            href="#rsvp"
            className="mt-12 inline-flex rounded-full bg-[#6a424c] px-8 py-4 text-sm uppercase tracking-[0.25em] text-white transition hover:scale-105"
          >
            Confirmar asistencia
          </a>
        </div>
      </section> */}
      <Hero />
      <Countdown />
      <EventDetails />
      <Story />
      <Gallery />
      <DressCode />
      <Hotels />
      <Banner />
      {/* <RSVP /> */}
      <Footer />
    </main>
  );
}
