"use client";

import { motion } from "framer-motion";

const suggestedColors = [
  "#42594a",
  "#263b32",
  "#6a424c",
  "#8b5f69",
  "#b78a78",
  "#c6a56b",
  "#283445",
  "#5e6572",
];

export function DressCode() {
  return (
    <section className="relative overflow-hidden bg-[#6a424c] py-24 text-white md:py-32">
      {/* Decoración sutil */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-44 -top-44 h-[28rem] w-[28rem] rounded-full border border-white/[0.07]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-52 -right-44 h-[34rem] w-[34rem] rounded-full border border-white/[0.07]"
      />

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[10px] uppercase tracking-[0.5em] text-white/55 sm:text-xs">
            Código de vestimenta sugerido
          </p>

          <h2 className="mt-7 font-serif text-5xl font-light italic text-[#f8f5ef] sm:text-6xl md:text-7xl">
            Elegante formal
          </h2>

          <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-white/65 sm:text-base">
            Queremos que este día se sienta tan especial como lo hemos
            imaginado. Te invitamos a acompañarnos con vestimenta formal.
          </p>
        </motion.div>

        {/* Paleta sugerida */}
        <div className="mt-12">
          <p className="text-[9px] uppercase tracking-[0.35em] text-white/40 sm:text-[10px]">
            Inspiración de color
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {suggestedColors.map((color, index) => (
              <motion.span
                key={color}
                initial={{ opacity: 0, y: 18, scale: 0.75 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
                className="h-9 w-9 rounded-full border border-white/20 shadow-sm sm:h-11 sm:w-11"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <div
          aria-hidden="true"
          className="mx-auto my-12 flex max-w-[190px] items-center gap-3 md:my-16"
        >
          <span className="h-px flex-1 bg-white/20" />
          <span className="font-serif text-xl text-white/50">◇</span>
          <span className="h-px flex-1 bg-white/20" />
        </div>

        {/* Blanco reservado */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto mt-14 max-w-2xl border-t border-white/15 pt-10 md:mt-16"
        >
          <p className="text-[9px] uppercase tracking-[0.4em] text-white/40 sm:text-[10px]">
            Una pequeña consideración
          </p>

          <p className="mt-5 font-serif text-2xl italic leading-relaxed text-[#f8f5ef] sm:text-3xl">
            Nos reservamos el blanco para la novia.
          </p>
        </motion.div>

        {/* Solo adultos */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mt-20 max-w-2xl border-t border-white/15 pt-16 md:mt-24"
        >
          <p className="font-serif text-2xl italic text-white/70 sm:text-3xl">
            Después del &ldquo;sí&rdquo;, comienza la fiesta
          </p>

          <div className="mx-auto mt-7 flex max-w-[180px] items-center gap-3">
            <span className="h-px flex-1 bg-white/25" />
            <span className="text-sm text-white/50">♡</span>
            <span className="h-px flex-1 bg-white/25" />
          </div>

          <p className="mt-7 text-xs font-medium uppercase tracking-[0.5em] text-white sm:text-sm">
            Solo adultos
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function DressColumn({
  title,
  items,
  bordered = false,
}: {
  title: string;
  items: string[];
  bordered?: boolean;
}) {
  return (
    <div
      className={[
        "px-6 py-9 text-center md:px-12 md:py-5",
        bordered
          ? "border-t border-white/15 md:border-l md:border-t-0"
          : "",
      ].join(" ")}
    >
      <h3 className="font-serif text-3xl italic text-[#f8f5ef] md:text-4xl">
        {title}
      </h3>

      <div className="mx-auto mt-5 h-px w-8 bg-white/25" />

      <ul className="mt-7 space-y-4 text-sm tracking-wide text-white/65 md:text-base">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
