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
      className="relative overflow-hidden bg-[#6a424c] py-16 md:py-28"
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

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
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
        <ul className="mx-auto mt-12 grid w-full max-w-4xl grid-cols-2 divide-x divide-white/20 md:mt-20">
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
      className="flex min-w-0 flex-col items-center px-2 py-4 text-center sm:px-8 md:px-14"
    >
      <p className="min-h-8 text-[9px] uppercase leading-4 tracking-[0.15em] text-white/60 sm:text-[11px] sm:tracking-[0.3em]">
        {label}
      </p>

      <h3 className="mt-3 font-serif text-3xl font-light italic text-[#f1ded9] sm:mt-5 sm:text-5xl">
        {service}
      </h3>

      <div
        aria-hidden="true"
        className="my-5 h-px w-8 bg-white/25 sm:my-8 sm:w-10"
      />

      <p className="text-[9px] uppercase tracking-[0.2em] text-white/65 sm:text-[11px]">
        {fieldLabel}
      </p>

      <p className="mt-3 w-full select-all break-all font-serif text-[clamp(0.85rem,3.4vw,1.5rem)] leading-relaxed tabular-nums text-[#f8f5ef] sm:mt-4 sm:break-words sm:text-2xl md:text-3xl">
        {displayValue}
      </p>

      <button
        type="button"
        onClick={handleCopy}
        aria-label={`Copiar ${fieldLabel} de ${service}`}
        className="mt-3 inline-flex min-h-10 items-center justify-center gap-1.5 border-b border-white/30 px-2 text-[9px] uppercase tracking-[0.15em] text-white/85 transition hover:border-white hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:min-h-11 sm:gap-2 sm:text-[11px]"
      >
        {state === "copied" ? (
          <>
            <Check size={13} aria-hidden="true" />
            Copiado
          </>
        ) : state === "error" ? (
          <>
            <X size={13} aria-hidden="true" />
            Error
          </>
        ) : (
          <>
            <Copy size={13} aria-hidden="true" />
            Copiar
          </>
        )}
      </button>

      <span role="status" aria-live="polite" className="sr-only">
        {state === "copied" && `${fieldLabel} de ${service} copiado`}
        {state === "error" && `No se pudo copiar el ${fieldLabel}`}
      </span>

      <div className="mt-6 w-full sm:mt-8">
        <p className="text-[9px] uppercase tracking-[0.15em] text-white/60 sm:text-[11px] sm:tracking-[0.28em]">
          A nombre de
        </p>

        <p className="mt-3 font-serif text-sm italic leading-relaxed text-white/90 sm:text-xl md:text-2xl">
          {owner}
        </p>
      </div>
    </motion.li>
  );
}
