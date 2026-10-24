"use client";

import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Copy,
  Check,
  Plus,
  Minus,
  ArrowUpRight,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Hotel = {
  number: string;
  name: string;
  address: string;
  phones: {
    label: string;
    value: string;
    href: string;
  }[];
  email: string | null;
  website: string | null;
  code: string | null;
};

const hotels: Hotel[] = [
  {
    number: "01",
    name: "Hotel Los Arcos",
    address: "López Cotilla #239, Mascota, Jalisco",
    phones: [
      {
        label: "Teléfono",
        value: "(01 388) 386 1582",
        href: "tel:013883861582",
      },
      {
        label: "Celular",
        value: "388 101 0120",
        href: "tel:+523881010120",
      },
    ],
    email: "hotellosarcosmascota@gmail.com",
    website: null,
    code: null,
  },
  {
    number: "02",
    name: "Mesón San José",
    address: "Av. Hidalgo 135, Centro, 46900 Mascota, Jal.",
    phones: [
      {
        label: "Reservaciones",
        value: "388 103 3744",
        href: "tel:+523881033744",
      },
    ],
    email: null,
    website: null,
    code: "BODAVJ2026",
  },
  {
    number: "03",
    name: "Hotel Copa de Oro",
    address: "C. Ramón Corona 75, Centro, 46900 Mascota, Jal.",
    phones: [
      {
        label: "Reservaciones",
        value: "388 103 3473",
        href: "tel:+523881033473",
      },
    ],
    email: null,
    website: "https://www.hotelcopadeoro.com/",
    code: "BODAVJ2026",
  },
];

function HotelDetails({ hotel }: { hotel: Hotel }) {
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    if (!hotel.code) return;

    try {
      await navigator.clipboard.writeText(hotel.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  const mapsUrl =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(`${hotel.name}, ${hotel.address}`);

  return (
    <div className="pb-7 pt-2 sm:pl-12">
      {/* Dirección */}
      <div className="flex items-start gap-3 text-[#42594a]/75">
        <MapPin size={15} className="mt-1 shrink-0" />
        <p className="text-sm leading-6">{hotel.address}</p>
      </div>

      {/* Teléfonos */}
      <div className="mt-5 flex flex-wrap gap-x-8 gap-y-4">
        {hotel.phones.map((phone) => (
          <div key={phone.value}>
            <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-[#6a424c]/60">
              {phone.label}
            </p>

            <a
              href={phone.href}
              className="inline-flex items-center gap-2 text-sm text-[#42594a] transition hover:text-[#6a424c]"
            >
              <Phone size={14} />
              {phone.value}
            </a>
          </div>
        ))}
      </div>

      {/* Correo */}
      {hotel.email && (
        <div className="mt-5">
          <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-[#6a424c]/60">
            Correo electrónico
          </p>
          <a
            href={`mailto:${hotel.email}`}
            className="inline-flex max-w-full items-center gap-2 break-all text-xs text-[#42594a] hover:text-[#6a424c]"
          >
            <Mail size={14} className="shrink-0" />
            {hotel.email}
          </a>
        </div>
      )}

      {/* Código de reservación */}
      {hotel.code && (
        <div className="mt-5 inline-flex max-w-full flex-col gap-2">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#6a424c]/60">
            Código de reservación
          </p>

          <button
            type="button"
            onClick={copyCode}
            aria-label={`Copiar código ${hotel.code}`}
            className="inline-flex items-center gap-3 self-start border border-[#6a424c]/20 px-4 py-3 text-[#42594a] transition hover:border-[#6a424c]/50"
          >
            <span className="font-wedding-body text-base tracking-wider">
              {hotel.code}
            </span>
            {copied ? <Check size={15} /> : <Copy size={15} />}
          </button>

          <p className="text-xs italic text-[#42594a]/60">
            Menciona este código al reservar
          </p>
        </div>
      )}

      {/* Enlaces */}
      <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-4">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border-b border-[#6a424c]/30 pb-1 text-[10px] uppercase tracking-[0.18em] text-[#6a424c] transition hover:border-[#6a424c]"
        >
          Ver ubicación
          <ArrowUpRight size={14} />
        </a>

        {hotel.website && (
          <a
            href={hotel.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-b border-[#6a424c]/30 pb-1 text-[10px] uppercase tracking-[0.18em] text-[#6a424c] transition hover:border-[#6a424c]"
          >
            <Globe size={14} />
            Sitio web
            <ArrowUpRight size={14} />
          </a>
        )}
      </div>
    </div>
  );
}

export function Hotels() {
  const [activeHotel, setActiveHotel] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  function toggleHotel(index: number) {
    setActiveHotel((current) => (current === index ? null : index));
  }

  return (
    <section
      id="hospedaje"
      className="relative overflow-hidden bg-[#f8f5ef] py-16 md:py-28"
    >
      {/* Decoración sutil */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-48 top-0 h-96 w-96 rounded-full border border-[#6a424c]/[0.06]"
      />

      <div className="relative mx-auto max-w-5xl px-6">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#6a424c]">
            Hospedaje
          </p>

          <div className="mx-auto mt-5 h-px w-12 bg-[#6a424c]/35" />

          <h2 className="mt-7 font-wedding-title text-4xl font-light leading-tight text-[#42594a] sm:text-5xl md:text-6xl">
            Para quienes
            <span className="block italic text-[#6a424c]">nos visitan</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#42594a]/70 sm:text-base">
            Opciones de hospedaje para acompañarnos en Mascota, Jalisco.
          </p>
        </motion.div>

        {/* Directorio de hoteles */}
        <div className="mx-auto mt-10 max-w-3xl border-t border-[#6a424c]/20 md:mt-14">
          {hotels.map((hotel, index) => {
            const isOpen = activeHotel === index;
            const panelId = `hotel-panel-${index}`;

            return (
              <div key={hotel.number} className="border-b border-[#6a424c]/20">
                <button
                  type="button"
                  onClick={() => toggleHotel(index)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="group flex min-h-[84px] w-full items-center gap-4 py-5 text-left sm:gap-7"
                >
                  <span className="shrink-0 font-wedding-body text-sm text-[#6a424c]/45">
                    {hotel.number}
                  </span>

                  <span className="flex-1 font-wedding-script text-xl font-light text-[#42594a] transition-colors group-hover:text-[#6a424c] sm:text-2xl">
                    {hotel.name}
                  </span>

                  <span
                    className={[
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors",
                      isOpen
                        ? "border-[#6a424c] bg-[#6a424c] text-white"
                        : "border-[#6a424c]/25 text-[#6a424c] group-hover:border-[#6a424c]",
                    ].join(" ")}
                  >
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      key="details"
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.35,
                        ease: "easeInOut",
                      }}
                      className="overflow-hidden"
                    >
                      <HotelDetails hotel={hotel} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Cierre */}
        <div className="mx-auto mt-12 text-center">
          <div className="mx-auto flex max-w-[150px] items-center gap-3">
            <span className="h-px flex-1 bg-[#6a424c]/20" />
            <span className="font-wedding-body text-lg text-[#6a424c]/50">♡</span>
            <span className="h-px flex-1 bg-[#6a424c]/20" />
          </div>

          <p className="mt-5 font-wedding-body text-sm italic text-[#6a424c]/65">
            Pregunta por disponibilidad
          </p>
        </div>
      </div>
    </section>
  );
}
