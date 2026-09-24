"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, X } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

/* ---------- Datos ---------- */

type GiftMethod = {
  id: string;
  label: string;
  service: string;
  fieldLabel: string;
  /** Lo que se copia al portapapeles (sin formato, listo para pegar en la app del banco) */
  copyValue: string;
  /** Lo que se muestra en pantalla */
  displayValue: string;
  owner: string;
};

// Se formatean desde el valor crudo para no mantener dos copias que puedan desincronizarse
const formatClabe = (v: string) =>
  v.replace(/^(\d{3})(\d{3})(\d{11})(\d)$/, "$1 $2 $3 $4");
const formatPhone = (v: string) =>
  v.replace(/^(\d{3})(\d{3})(\d{4})$/, "($1) $2-$3");

const CLABE = "012180027082873175";
const ZELLE_PHONE = "7606015347";

const METHODS: GiftMethod[] = [
  {
    id: "bbva",
    label: "Transferencia bancaria",
    service: "BBVA",
    fieldLabel: "CLABE",
    copyValue: CLABE,
    displayValue: formatClabe(CLABE),
    owner: "Jesús Rafael Salcedo Rosas",
  },
  {
    id: "zelle",
    label: "Transferencia",
    service: "Zelle",
    fieldLabel: "Teléfono",
    copyValue: ZELLE_PHONE,
    displayValue: formatPhone(ZELLE_PHONE),
    owner: "Nancy Nuño Pérez",
  },
];

/* ---------- Utilidades ---------- */

/** Copia con la Clipboard API y, si no está disponible (http, webviews, Safari viejo), usa un textarea temporal. */
async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // seguimos al fallback
  }

  try {
    const el = document.createElement("textarea");
    el.value = text;
    el.setAttribute("readonly", "");
    el.style.position = "fixed";
    el.style.opacity = "0";
    document.body.appendChild(el);
    el.select();
    el.setSelectionRange(0, text.length); // iOS
    const ok = document.execCommand("copy");
    document.body.removeChild(el);
    return ok;
  } catch {
    return false;
  }
}

/** Props de animación de entrada; si el usuario pide menos movimiento, solo hace fade. */
function reveal(reduceMotion: boolean | null, delay = 0, amount = 0.3) {
  return {
    initial: { opacity: 0, y: reduceMotion ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount },
    transition: { duration: reduceMotion ? 0.3 : 0.7, delay },
  };
}

/* ---------- Sección ---------- */

export function GiftRegistry() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="mesa-de-regalos"
      aria-labelledby="mesa-de-regalos-titulo"
      className="relative overflow-hidden bg-[#6a424c] py-24 md:py-32"
    >
      {/* Elementos decorativos */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-24 h-80 w-80 rounded-full border border-white/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 bottom-10 h-96 w-96 rounded-full border border-white/10"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Encabezado */}
        <motion.div
          {...reveal(reduceMotion)}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-[11px] uppercase tracking-[0.4em] text-white/70 sm:text-xs">
            Mesa de regalos
          </p>

          <h2
            id="mesa-de-regalos-titulo"
            className="mt-6 font-serif text-5xl font-light leading-none text-[#f8f5ef] sm:text-6xl md:text-7xl"
          >
            El mejor regalo
            <span className="mt-2 block italic text-[#f1ded9]">
              es compartir este día
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-sm leading-7 text-white/80 sm:text-base sm:leading-8">
            Su presencia y cariño ya es nuestro mejor regalo. Si desean sumarse
            a este comienzo, ponemos a su disposición las siguientes opciones.
          </p>
        </motion.div>

        {/* Opciones: lista semántica; los divisores los pone `divide-*` */}
        <ul className="mx-auto mt-16 grid max-w-4xl divide-y divide-white/15 md:mt-20 md:grid-cols-2 md:divide-x md:divide-y-0">
          {METHODS.map((method, i) => (
            <GiftOption
              key={method.id}
              method={method}
              reduceMotion={reduceMotion}
              delay={i * 0.12}
            />
          ))}
        </ul>

        {/* Cierre */}
        <div
          aria-hidden="true"
          className="mx-auto mt-16 flex max-w-[190px] items-center gap-3"
        >
          <span className="h-px flex-1 bg-white/20" />
          <span className="font-serif text-xl text-white/60">♡</span>
          <span className="h-px flex-1 bg-white/20" />
        </div>

        <p className="mt-6 text-center font-serif text-xl italic text-[#f1ded9]/80">
          Gracias por acompañarnos en este comienzo.
        </p>
      </div>
    </section>
  );
}

/* ---------- Opción de pago ---------- */

type CopyState = "idle" | "copied" | "error";

function GiftOption({
  method,
  reduceMotion,
  delay,
}: {
  method: GiftMethod;
  reduceMotion: boolean | null;
  delay: number;
}) {
  const { label, service, fieldLabel, copyValue, displayValue, owner } = method;
  const [state, setState] = useState<CopyState>("idle");
  const timeoutRef = useRef<number | null>(null);

  // Evita setState en un componente desmontado
  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  async function handleCopy() {
    const ok = await copyToClipboard(copyValue);
    setState(ok ? "copied" : "error");

    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setState("idle"), 2000);
  }

  return (
    <motion.li
      {...reveal(reduceMotion, delay, 0.25)}
      className="relative px-4 py-10 text-center sm:px-10 md:px-14 md:py-6"
    >
      <p className="text-[11px] uppercase tracking-[0.3em] text-white/60">
        {label}
      </p>

      <h3 className="mt-5 font-serif text-5xl font-light italic text-[#f1ded9]">
        {service}
      </h3>

      <div aria-hidden="true" className="mx-auto my-8 h-px w-10 bg-white/25" />

      <p className="text-[11px] uppercase tracking-[0.3em] text-white/65">
        {fieldLabel}
      </p>

      {/* select-all: con un toque largo se selecciona todo si el botón fallara */}
      <p className="mx-auto mt-4 select-all break-words font-serif text-2xl leading-relaxed tabular-nums text-[#f8f5ef] sm:text-3xl">
        {displayValue}
      </p>

      <button
        type="button"
        onClick={handleCopy}
        aria-label={`Copiar ${fieldLabel} de ${service}`}
        className="mt-3 inline-flex min-h-11 min-w-[9.5rem] items-center justify-center gap-2 border-b border-white/30 px-2 text-[11px] uppercase tracking-[0.22em] text-white/85 transition hover:border-white hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      >
        {state === "copied" && (
          <>
            <Check size={14} aria-hidden="true" />
            Copiado
          </>
        )}
        {state === "error" && (
          <>
            <X size={14} aria-hidden="true" />
            Cópialo a mano
          </>
        )}
        {state === "idle" && (
          <>
            <Copy size={14} aria-hidden="true" />
            Copiar
          </>
        )}
      </button>

      {/* Anuncio para lectores de pantalla */}
      <span role="status" aria-live="polite" className="sr-only">
        {state === "copied" && `${fieldLabel} de ${service} copiado`}
        {state === "error" && `No se pudo copiar el ${fieldLabel}`}
      </span>

      <div className="mt-8">
        <p className="text-[11px] uppercase tracking-[0.28em] text-white/60">
          A nombre de
        </p>

        <p className="mt-3 font-serif text-xl italic leading-relaxed text-white/90 sm:text-2xl">
          {owner}
        </p>
      </div>
    </motion.li>
  );
}
