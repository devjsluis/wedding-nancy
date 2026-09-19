"use client";

import { useEffect, useEffectEvent, useState } from "react";
import { AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  LoaderCircle,
  RefreshCw,
  Search,
} from "lucide-react";

import { InvitationCover } from "@/components/InvitationCover";

import { Hero } from "@/components/sections/Hero";
import { Countdown } from "@/components/sections/Countdown";
import { EventDetails } from "@/components/sections/EventDetails";
import { Story } from "@/components/sections/Story";
import { Gallery } from "@/components/sections/Gallery";
import { DressCode } from "@/components/sections/DressCode";
import { Hotels } from "@/components/sections/Hotels";
import { Banner } from "@/components/sections/Banner";
import { RSVP } from "@/components/sections/RSVP";
import { Footer } from "@/components/sections/Footer";

import { getInvitationByCode } from "@/lib/invitations";
import type { Invitation } from "@/types/invitation";

type InvitationResolution =
  | "checking"
  | "public"
  | "valid"
  | "not-found"
  | "error";

export function WeddingInvitation() {
  const [opened, setOpened] = useState(false);

  const [resolution, setResolution] =
    useState<InvitationResolution>("checking");

  const [invitation, setInvitation] =
    useState<Invitation | null>(null);

  const [requestedCode, setRequestedCode] =
    useState<string | null>(null);

  async function resolveInvitation() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("i")?.trim().toUpperCase();

    if (!code) {
      setRequestedCode(null);
      setInvitation(null);
      setResolution("public");
      return;
    }

    setRequestedCode(code);
    setResolution("checking");

    try {
      const response = await getInvitationByCode(code);

      setInvitation(response.data);
      setResolution("valid");
    } catch (error: unknown) {
      setInvitation(null);

      const status =
        typeof error === "object" &&
        error !== null &&
        "response" in error
          ? (
              error as {
                response?: {
                  status?: number;
                };
              }
            ).response?.status
          : undefined;

      if (status === 404) {
        setResolution("not-found");
      } else {
        setResolution("error");
      }
    }
  }

  const resolveInitialInvitation = useEffectEvent(async () => {
    await resolveInvitation();
  });

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void resolveInitialInvitation();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  function openPublicInvitation() {
    window.history.replaceState(
      {},
      "",
      window.location.pathname,
    );

    setRequestedCode(null);
    setInvitation(null);
    setResolution("public");
    setOpened(false);
  }

  if (resolution === "checking") {
    return <InvitationChecking />;
  }

  if (resolution === "not-found") {
    return (
      <InvitationProblem
        type="not-found"
        code={requestedCode}
        onRetry={() => void resolveInvitation()}
        onPublic={openPublicInvitation}
      />
    );
  }

  if (resolution === "error") {
    return (
      <InvitationProblem
        type="error"
        code={requestedCode}
        onRetry={() => void resolveInvitation()}
        onPublic={openPublicInvitation}
      />
    );
  }

  return (
    <>
      <AnimatePresence>
        {!opened && (
          <InvitationCover
            onOpen={() => setOpened(true)}
          />
        )}
      </AnimatePresence>

      <main className="min-h-screen bg-[#f8f5ef] text-[#42594a]">
        <Hero />
        <Countdown />
        <EventDetails />
        <Story />
        <Gallery />
        <DressCode />
        <Hotels />
        <Banner />

        <RSVP
          initialInvitation={invitation}
          initialCode={requestedCode}
        />

        <Footer />
      </main>
    </>
  );
}

function InvitationChecking() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f8f5ef] px-6 text-[#42594a]">
      <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full border border-[#6a424c]/8" />
      <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full border border-[#6a424c]/8" />

      <div className="relative text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
          <LoaderCircle
            size={23}
            className="animate-spin text-[#6a424c]"
          />
        </div>

        <p className="mt-7 text-[10px] uppercase tracking-[0.45em] text-[#6a424c]">
          Valeria &amp; Jesús
        </p>

        <p className="mt-3 font-serif text-2xl">
          Preparando tu invitación
        </p>

        <p className="mt-3 text-xs text-[#42594a]/40">
          Un momento, por favor...
        </p>
      </div>
    </main>
  );
}

function InvitationProblem({
  type,
  code,
  onRetry,
  onPublic,
}: {
  type: "not-found" | "error";
  code: string | null;
  onRetry: () => void;
  onPublic: () => void;
}) {
  const notFound = type === "not-found";

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f8f5ef] px-5 py-12 text-[#42594a]">
      <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full border border-[#6a424c]/8" />
      <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full border border-[#6a424c]/8" />

      <div className="relative w-full max-w-lg text-center">
        <p className="text-[10px] uppercase tracking-[0.45em] text-[#6a424c]">
          Valeria &amp; Jesús
        </p>

        <div className="mx-auto mt-8 flex h-16 w-16 items-center justify-center rounded-full bg-[#6a424c]/8 text-[#6a424c]">
          {notFound ? (
            <Search size={25} strokeWidth={1.5} />
          ) : (
            <AlertCircle
              size={25}
              strokeWidth={1.5}
            />
          )}
        </div>

        <h1 className="mt-7 font-serif text-4xl font-light sm:text-5xl">
          {notFound
            ? "Invitación no encontrada"
            : "No pudimos verificar tu invitación"}
        </h1>

        <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#42594a]/60">
          {notFound
            ? "Este enlace puede haber cambiado, haber expirado o la invitación ya no está disponible. Revisa que hayas abierto el enlace completo que recibiste."
            : "Parece que tuvimos un problema de conexión. Tu invitación podría seguir siendo válida; intenta nuevamente en unos momentos."}
        </p>

        {code && (
          <div className="mx-auto mt-6 inline-flex rounded-full border border-[#42594a]/10 bg-white px-5 py-2.5">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#42594a]/45">
              Código&nbsp;
            </span>

            <span className="text-[10px] font-medium tracking-[0.15em] text-[#6a424c]">
              {code}
            </span>
          </div>
        )}

        <div className="mx-auto mt-9 flex max-w-sm flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onRetry}
            className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[#42594a]/15 bg-white px-6 py-3.5 text-sm transition hover:bg-[#f3eee6]"
          >
            <RefreshCw size={15} />
            Intentar nuevamente
          </button>

          <button
            type="button"
            onClick={onPublic}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#6a424c] px-6 py-3.5 text-sm text-white transition hover:bg-[#583740]"
          >
            Ver invitación general
            <ArrowRight size={15} />
          </button>
        </div>

        <p className="mt-10 font-serif text-sm italic text-[#6a424c]/50">
          19 · 12 · 26
        </p>
      </div>
    </main>
  );
}
