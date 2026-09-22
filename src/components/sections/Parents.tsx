"use client";

import { motion } from "framer-motion";

export function Parents() {
  return (
    <section className="relative overflow-hidden bg-[#f8f5ef] px-6 py-24 md:py-32">
      {/* Decoración sutil */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-36 top-16 h-72 w-72 rounded-full border border-[#6a424c]/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-36 bottom-10 h-72 w-72 rounded-full border border-[#6a424c]/10"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative mx-auto max-w-4xl text-center"
      >
        <h2 className="font-serif text-5xl font-light text-[#42594a] sm:text-6xl">
          Nuestros padres
        </h2>

        <div className="mx-auto mt-8 flex max-w-[180px] items-center gap-3">
          <span className="h-px flex-1 bg-[#6a424c]/25" />
          <span className="font-serif text-lg text-[#6a424c]/55">♡</span>
          <span className="h-px flex-1 bg-[#6a424c]/25" />
        </div>

        <div className="mx-auto mt-14 grid max-w-3xl gap-12 md:grid-cols-2 md:gap-8">
          <ParentGroup
            label="Padres de la novia"
            names={["Juan Carlos Nuño", "Angélica María Pérez"]}
          />

          <ParentGroup
            label="Padres del novio"
            names={["Ricardo Salcedo", "Sandra Luz Rosas"]}
          />
        </div>
      </motion.div>
    </section>
  );
}

function ParentGroup({ label, names }: { label: string; names: string[] }) {
  return (
    <div className="relative">
      <p className="font-serif text-2xl italic text-[#6a424c]/75 sm:text-3xl">
        {label}
      </p>

      <div className="mt-6 space-y-3">
        {names.map((name) => (
          <p
            key={name}
            className="font-serif text-2xl leading-tight text-[#42594a] sm:text-3xl"
          >
            {name}
          </p>
        ))}
      </div>
    </div>
  );
}
