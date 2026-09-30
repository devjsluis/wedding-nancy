"use client";

import { motion } from "framer-motion";
import {
  Church,
  Martini,
  UtensilsCrossed,
  Music2,
  MoonStar,
} from "lucide-react";

const events = [
  {
    time: "5:00 p.m.",
    title: "Ceremonia",
    icon: Church,
  },
  {
    time: "6:00 p.m.",
    title: "Cóctel de bienvenida",
    icon: Martini,
  },
  {
    time: "8:30 p.m.",
    title: "Cena",
    icon: UtensilsCrossed,
  },
  {
    time: "10:00 p.m.",
    title: "Fiesta",
    icon: Music2,
  },
  {
    time: "2:00 a.m.",
    title: "Fin de la noche",
    icon: MoonStar,
  },
];

export function Timeline() {
  return (
    <section className="relative overflow-hidden bg-[#f8f5ef] py-24 md:py-32">
      {/* Decoración de fondo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-44 top-28 h-80 w-80 rounded-full border border-[#6a424c]/[0.08]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 bottom-20 h-96 w-96 rounded-full border border-[#6a424c]/[0.08]"
      />

      <div className="relative mx-auto max-w-4xl px-6">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="text-[10px] uppercase tracking-[0.5em] text-[#6a424c]/60 sm:text-xs">
            Nuestro gran día
          </p>

          <h2 className="mt-6 font-serif text-5xl font-light text-[#42594a] sm:text-6xl md:text-7xl">
            Orden del
            <span className="ml-3 italic text-[#6a424c]">día</span>
          </h2>

          <div className="mx-auto mt-8 flex max-w-[150px] items-center gap-3">
            <span className="h-px flex-1 bg-[#6a424c]/20" />
            <span className="font-serif text-lg text-[#6a424c]/50">♡</span>
            <span className="h-px flex-1 bg-[#6a424c]/20" />
          </div>
        </motion.div>

        {/* Línea de tiempo */}
        <div className="relative mx-auto mt-16 max-w-2xl md:mt-20">
          <div
            aria-hidden="true"
            className="absolute bottom-8 left-1/2 top-8 w-px -translate-x-1/2 bg-[#6a424c]/20"
          />

          <div className="space-y-14 md:space-y-16">
            {events.map((event, index) => {
              const Icon = event.icon;
              const left = index % 2 === 0;

              return (
                <motion.div
                  key={`${event.time}-${event.title}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.45 }}
                  transition={{
                    duration: 0.65,
                    delay: index * 0.06,
                  }}
                  className="relative grid grid-cols-[1fr_64px_1fr] items-center md:grid-cols-[1fr_80px_1fr]"
                >
                  {/* Lado izquierdo */}
                  <div className="pr-4 text-right md:pr-8">
                    {left ? (
                      <>
                        <p className="font-serif text-2xl italic text-[#6a424c] sm:text-3xl">
                          {event.time}
                        </p>
                        <p className="mt-2 text-[10px] uppercase tracking-[0.28em] text-[#42594a]/60 sm:text-xs">
                          {event.title}
                        </p>
                      </>
                    ) : (
                      <IconBlock Icon={Icon} />
                    )}
                  </div>

                  {/* Centro */}
                  <div className="relative z-10 flex justify-center">
                    <div className="h-3 w-3 rounded-full border-[3px] border-[#f8f5ef] bg-[#6a424c] shadow-[0_0_0_1px_rgba(106,66,76,0.22)]" />
                  </div>

                  {/* Lado derecho */}
                  <div className="pl-4 text-left md:pl-8">
                    {left ? (
                      <IconBlock Icon={Icon} />
                    ) : (
                      <>
                        <p className="font-serif text-2xl italic text-[#6a424c] sm:text-3xl">
                          {event.time}
                        </p>
                        <p className="mt-2 text-[10px] uppercase tracking-[0.28em] text-[#42594a]/60 sm:text-xs">
                          {event.title}
                        </p>
                      </>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Cierre */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 text-center font-serif text-xl italic text-[#6a424c]/70 md:text-2xl"
        >
          Celebremos juntos cada momento.
        </motion.p>
      </div>
    </section>
  );
}

function IconBlock({
  Icon,
}: {
  Icon: React.ComponentType<{
    size?: number;
    strokeWidth?: number;
    className?: string;
  }>;
}) {
  return (
    <div className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#6a424c]/15 text-[#6a424c]/70 md:h-16 md:w-16">
      <Icon size={24} strokeWidth={1.25} />
    </div>
  );
}
