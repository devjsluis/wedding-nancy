"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface InvitationCoverProps {
  onOpen: () => void;
}

export function InvitationCover({ onOpen }: InvitationCoverProps) {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const previousOverscrollBehavior = body.style.overscrollBehavior;
    const previousScrollRestoration = history.scrollRestoration;

    // La portada funciona como una pantalla cerrada:
    // no permitimos mover el contenido que está detrás.
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.overscrollBehavior = "none";
    history.scrollRestoration = "manual";

    // Si el navegador restauró una posición anterior, regresamos al inicio.
    window.scrollTo(0, 0);

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      body.style.overscrollBehavior = previousOverscrollBehavior;
      history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  function handleOpen() {
    // Dejamos preparada la invitación desde el inicio.
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });

    onOpen();

    // Después de desmontar la portada y devolver el scroll,
    // reafirmamos que la invitación comience arriba.
    requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    });
  }

  return (
    <motion.section
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.03,
        filter: "blur(4px)",
      }}
      transition={{
        duration: 0.8,
        ease: "easeInOut",
      }}
      className="fixed inset-0 z-50 flex h-[100dvh] touch-none items-center justify-center overflow-hidden bg-[#f4efe6] px-6"
    >
      {/* Textura sutil */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(0,0,0,.10) 0.5px, transparent 0.7px),
            radial-gradient(circle at 80% 60%, rgba(0,0,0,.08) 0.5px, transparent 0.7px)
          `,
          backgroundSize: "18px 18px, 23px 23px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Monograma */}
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
          }}
          className="relative"
        >
          <Image
            src="/images/monogram.png"
            alt="Monograma de Valeria y Jesús"
            width={500}
            height={500}
            priority
            className="h-auto w-[210px] object-contain sm:w-[240px] md:w-[270px]"
          />
        </motion.div>

        {/* Fecha */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.45,
          }}
          className="mt-4 text-[12px] tracking-[0.48em] text-[#29241f] sm:text-sm"
        >
          19 · 12 · 26
        </motion.p>

        {/* Botón */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.7,
          }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleOpen}
          className="
            mt-12
            cursor-pointer
            rounded-full
            bg-[#85283c]
            px-8
            py-3
            text-[13px]
            font-medium
            tracking-[0.18em]
            text-white
            shadow-sm
            transition-colors
            duration-300
            hover:bg-[#702132]
          "
        >
          Abrir invitación
        </motion.button>
      </div>

      {/* Detalle inferior */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 text-[9px] uppercase tracking-[0.35em] text-[#403a34]"
      >
        Valeria &amp; Jesús
      </motion.p>
    </motion.section>
  );
}
