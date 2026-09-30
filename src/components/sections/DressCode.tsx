"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function DressCode() {
  return (
    <section className="relative overflow-hidden bg-[#6a424c] py-24 text-white md:py-32">
      {/* Decoración de fondo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-44 -top-44 h-[28rem] w-[28rem] rounded-full border border-white/[0.07]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-52 -right-44 h-[34rem] w-[34rem] rounded-full border border-white/[0.07]"
      />

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        {/* Dress code */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[10px] uppercase tracking-[0.5em] text-white/55 sm:text-xs">
            Código de vestimenta
          </p>

          <h2 className="mt-7 font-serif text-5xl font-light italic text-[#f8f5ef] sm:text-6xl md:text-7xl">
            Elegante formal
          </h2>

          <div className="mx-auto mt-10 h-px w-14 bg-white/25" />
        </motion.div>

        {/* Ilustración */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mx-auto mt-10 max-w-2xl"
        >
          <div className="relative mx-auto h-[360px] max-w-2xl overflow-hidden rounded-[2rem] bg-[#f8f5ef] shadow-[0_20px_60px_rgba(0,0,0,0.12)] sm:h-[430px] md:h-[500px]">
            <Image
              src="/images/dress-code.png"
              alt="Referencia de vestimenta elegante formal"
              fill
              className="object-cover object-[center_45%]"
              sizes="(max-width: 768px) 90vw, 650px"
            />
          </div>
        </motion.div>

        {/* Solo adultos */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mt-16 max-w-2xl border-t border-white/15 pt-14 md:mt-20 md:pt-16"
        >
          <p className="font-serif text-2xl italic text-white/70 sm:text-3xl">
            Después del &ldquo;sí&rdquo;, comienza la fiesta
          </p>

          <div className="mx-auto mt-7 flex max-w-[180px] items-center gap-3">
            <span className="h-px flex-1 bg-white/25" />
            <span className="font-serif text-lg text-white/50">♡</span>
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
