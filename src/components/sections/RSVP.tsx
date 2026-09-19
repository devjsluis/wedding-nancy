"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Check,
  ChevronLeft,
  Heart,
  LoaderCircle,
  Search,
  UserRound,
  UsersRound,
} from "lucide-react";

import {
  getInvitationByCode,
  submitRsvp,
} from "@/lib/invitations";

import type { Invitation } from "@/types/invitation";

type GuestForm = {
  name: string;
  isChild: boolean;
  dietaryRestrictions: string;
};

type Answer = "YES" | "NO" | null;

function emptyGuest(): GuestForm {
  return {
    name: "",
    isChild: false,
    dietaryRestrictions: "",
  };
}

export function RSVP({
  initialInvitation = null,
  initialCode = null,
}: {
  initialInvitation?: Invitation | null;
  initialCode?: string | null;
}) {
  const [code, setCode] = useState(initialCode ?? "");
  const [invitation, setInvitation] =
    useState<Invitation | null>(initialInvitation);

  const [answer, setAnswer] = useState<Answer>(
    initialInvitation?.status === "CONFIRMED"
      ? "YES"
      : initialInvitation?.status === "DECLINED"
        ? "NO"
        : null,
  );

  const [contactName, setContactName] = useState(
    initialInvitation?.contactName ?? "",
  );
  const [contactPhone, setContactPhone] = useState(
    initialInvitation?.contactPhone ?? "",
  );
  const [contactEmail, setContactEmail] = useState(
    initialInvitation?.contactEmail ?? "",
  );
  const [message, setMessage] = useState(
    initialInvitation?.message ?? "",
  );

  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [searchError, setSearchError] = useState("");

  const initialGuests = initialInvitation
    ? Array.from(
        { length: initialInvitation.maxGuests },
        (_, index) => {
          const existing = initialInvitation.guests?.[index];

          return existing
            ? {
                name: existing.name,
                isChild: existing.isChild,
                dietaryRestrictions:
                  existing.dietaryRestrictions ?? "",
              }
            : emptyGuest();
        },
      )
    : [];

  const [guests, setGuestsWithInitial] = useState<GuestForm[]>(
    initialGuests,
  );

  function setGuests(
    value:
      | GuestForm[]
      | ((current: GuestForm[]) => GuestForm[]),
  ) {
    setGuestsWithInitial(value);
  }

  function prepareInvitation(data: Invitation) {
    setInvitation(data);
    setCode(data.code);

    setContactName(data.contactName ?? "");
    setContactPhone(data.contactPhone ?? "");
    setContactEmail(data.contactEmail ?? "");
    setMessage(data.message ?? "");

    setGuests(
      Array.from(
        { length: data.maxGuests },
        (_, index) => {
          const existing = data.guests?.[index];

          return existing
            ? {
                name: existing.name,
                isChild: existing.isChild,
                dietaryRestrictions:
                  existing.dietaryRestrictions ?? "",
              }
            : emptyGuest();
        },
      ),
    );

    if (data.status === "CONFIRMED") {
      setAnswer("YES");
    } else if (data.status === "DECLINED") {
      setAnswer("NO");
    } else {
      setAnswer(null);
    }
  }

  async function loadInvitation(
    invitationCode: string,
    showError = true,
  ) {
    const normalizedCode = invitationCode
      .trim()
      .toUpperCase();

    if (!normalizedCode) return false;

    setLoading(true);
    setSaved(false);
    setSearchError("");

    try {
      const response =
        await getInvitationByCode(normalizedCode);

      prepareInvitation(response.data);
      return true;
    } catch (error) {
      console.error(error);

      if (showError) {
        setSearchError(
          "No encontramos una invitación con ese código. Revísalo e intenta nuevamente.",
        );
      }

      return false;
    } finally {
      setLoading(false);
    }
  }

  function updateGuest(
    index: number,
    changes: Partial<GuestForm>,
  ) {
    setGuests((current) =>
      current.map((guest, guestIndex) =>
        guestIndex === index
          ? { ...guest, ...changes }
          : guest,
      ),
    );
  }

  async function handleSubmit() {
    if (!invitation || !answer) return;

    const activeGuests = guests
      .map((guest) => ({
        ...guest,
        name: guest.name.trim(),
        dietaryRestrictions:
          guest.dietaryRestrictions.trim(),
      }))
      .filter((guest) => guest.name);

    if (answer === "YES" && activeGuests.length === 0) {
      alert("Escribe el nombre de al menos una persona que asistirá.");
      return;
    }

    setLoading(true);

    try {
      const response = await submitRsvp(
        invitation.code,
        {
          attending: answer === "YES",
          contactName: contactName.trim(),
          contactPhone: contactPhone.trim(),
          contactEmail: contactEmail.trim(),
          message: message.trim(),
          guests:
            answer === "YES" ? activeGuests : [],
        },
      );

      prepareInvitation(response.data);
      setSaved(true);
    } catch (error) {
      console.error(error);
      alert(
        "No pudimos guardar tu respuesta. Intenta nuevamente.",
      );
    } finally {
      setLoading(false);
    }
  }

  function resetSearch() {
    setInvitation(null);
    setAnswer(null);
    setSaved(false);
    setCode("");
    setSearchError("");
  }

  return (
    <section
      id="rsvp"
      className="scroll-mt-6 bg-[#f3eee6] px-4 py-24 sm:px-6 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center md:mb-14">
          <p className="text-[10px] uppercase tracking-[0.45em] text-[#6a424c]">
            RSVP
          </p>

          <h2 className="mt-4 font-serif text-4xl font-light text-[#42594a] sm:text-5xl md:text-6xl">
            Confirma tu asistencia
          </h2>

          <div className="mx-auto mt-5 flex max-w-[130px] items-center gap-3">
            <span className="h-px flex-1 bg-[#6a424c]/25" />
            <Heart
              size={13}
              strokeWidth={1.5}
              className="text-[#6a424c]"
            />
            <span className="h-px flex-1 bg-[#6a424c]/25" />
          </div>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#42594a]/60 md:text-base">
            Tu presencia hará aún más especial este día.
            Ayúdanos confirmando si podrás acompañarnos.
          </p>
        </div>

        <div className="overflow-hidden rounded-[2rem] bg-[#fffdf9] shadow-[0_24px_80px_rgba(66,89,74,0.08)] lg:grid lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative hidden min-h-[760px] lg:block">
            <Image
              src="/images/rsvp.webp"
              alt="Jesús y Valeria"
              fill
              sizes="45vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#24191c]/55 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-10 text-white">
              <p className="text-xs uppercase tracking-[0.35em] text-white/70">
                19 · 12 · 26
              </p>

              <p className="mt-3 font-serif text-4xl">
                Jesús &amp; Valeria
              </p>
            </div>
          </div>

          <div className="flex min-h-[620px] flex-col justify-center p-6 sm:p-10 md:p-12">
            {!invitation ? (
              <InvitationSearch
                code={code}
                loading={loading}
                error={searchError}
                onCodeChange={(value) => {
                  setCode(value);
                  setSearchError("");
                }}
                onSearch={() => void loadInvitation(code)}
              />
            ) : saved ? (
              <SavedResponse
                invitation={invitation}
                onEdit={() => setSaved(false)}
              />
            ) : (
              <InvitationForm
                invitation={invitation}
                answer={answer}
                guests={guests}
                contactName={contactName}
                contactPhone={contactPhone}
                contactEmail={contactEmail}
                message={message}
                loading={loading}
                onAnswer={setAnswer}
                onGuestChange={updateGuest}
                onContactName={setContactName}
                onContactPhone={setContactPhone}
                onContactEmail={setContactEmail}
                onMessage={setMessage}
                onSubmit={() => void handleSubmit()}
                onBack={resetSearch}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function InvitationSearch({
  code,
  loading,
  error,
  onCodeChange,
  onSearch,
}: {
  code: string;
  loading: boolean;
  error: string;
  onCodeChange: (value: string) => void;
  onSearch: () => void;
}) {
  return (
    <div className="mx-auto w-full max-w-md text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#6a424c]/8 text-[#6a424c]">
        <Search size={22} strokeWidth={1.6} />
      </div>

      <p className="mt-7 text-[10px] uppercase tracking-[0.35em] text-[#6a424c]">
        Tu invitación
      </p>

      <h3 className="mt-3 font-serif text-3xl text-[#42594a] sm:text-4xl">
        Busca tu invitación
      </h3>

      <p className="mt-4 text-sm leading-7 text-[#42594a]/60">
        Si recibiste un enlace personalizado, esta parte se
        abrirá automáticamente. También puedes ingresar el
        código de tu invitación.
      </p>

      <div className="mt-8 text-left">
        <label className="text-[10px] uppercase tracking-[0.25em] text-[#42594a]/55">
          Código de invitación
        </label>

        <input
          value={code}
          onChange={(e) =>
            onCodeChange(e.target.value.toUpperCase())
          }
          onKeyDown={(e) => {
            if (e.key === "Enter" && code.trim()) {
              onSearch();
            }
          }}
          placeholder="Ej. GARCIA7K2P"
          className="mt-3 w-full rounded-2xl border border-[#42594a]/15 bg-white px-5 py-4 text-center uppercase tracking-[0.15em] outline-none transition placeholder:normal-case placeholder:tracking-normal placeholder:text-[#42594a]/30 focus:border-[#6a424c]/50"
        />

        {error && (
          <p className="mt-3 text-center text-sm leading-6 text-[#8a4655]">
            {error}
          </p>
        )}

        <button
          onClick={onSearch}
          disabled={loading || !code.trim()}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#6a424c] px-6 py-4 text-sm font-medium text-white transition hover:bg-[#583740] disabled:opacity-50"
        >
          {loading && (
            <LoaderCircle
              size={17}
              className="animate-spin"
            />
          )}

          {loading
            ? "Buscando..."
            : "Ver mi invitación"}
        </button>
      </div>
    </div>
  );
}

function InvitationForm({
  invitation,
  answer,
  guests,
  contactName,
  contactPhone,
  contactEmail,
  message,
  loading,
  onAnswer,
  onGuestChange,
  onContactName,
  onContactPhone,
  onContactEmail,
  onMessage,
  onSubmit,
  onBack,
}: {
  invitation: Invitation;
  answer: Answer;
  guests: GuestForm[];
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  message: string;
  loading: boolean;
  onAnswer: (answer: Answer) => void;
  onGuestChange: (
    index: number,
    changes: Partial<GuestForm>,
  ) => void;
  onContactName: (value: string) => void;
  onContactPhone: (value: string) => void;
  onContactEmail: (value: string) => void;
  onMessage: (value: string) => void;
  onSubmit: () => void;
  onBack: () => void;
}) {
  return (
    <div>
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-1 text-xs text-[#42594a]/45 transition hover:text-[#6a424c]"
      >
        <ChevronLeft size={15} />
        Usar otro código
      </button>

      <p className="text-[10px] uppercase tracking-[0.35em] text-[#6a424c]">
        Invitación para
      </p>

      <h3 className="mt-3 font-serif text-4xl leading-tight text-[#42594a] md:text-5xl">
        {invitation.groupName}
      </h3>

      <div className="mt-6 flex items-center gap-4 rounded-2xl bg-[#f8f5ef] px-5 py-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#6a424c]">
          <UsersRound size={19} strokeWidth={1.6} />
        </div>

        <div>
          <p className="text-sm font-medium text-[#42594a]">
            {invitation.maxGuests === 1
              ? "1 lugar reservado"
              : `${invitation.maxGuests} lugares reservados`}
          </p>

          <p className="mt-0.5 text-xs text-[#42594a]/45">
            Especialmente para ustedes
          </p>
        </div>
      </div>

      {invitation.status !== "PENDING" && (
        <div className="mt-4 rounded-2xl border border-[#6a424c]/10 px-5 py-4 text-sm leading-6 text-[#42594a]/60">
          Ya habías enviado una respuesta. Puedes
          actualizarla y volver a guardarla si tus planes
          cambiaron.
        </div>
      )}

      <div className="mt-8">
        <p className="font-serif text-2xl text-[#42594a]">
          ¿Podrán acompañarnos?
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <AnswerButton
            active={answer === "YES"}
            icon={<Heart size={18} strokeWidth={1.6} />}
            title="Sí, asistiremos"
            subtitle="Nos encantará estar ahí"
            onClick={() => onAnswer("YES")}
          />

          <AnswerButton
            active={answer === "NO"}
            icon={<ChevronLeft size={18} />}
            title="No podremos"
            subtitle="Estaremos con ustedes de corazón"
            onClick={() => onAnswer("NO")}
          />
        </div>
      </div>

      {answer === "YES" && (
        <div className="mt-9">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-serif text-2xl text-[#42594a]">
                ¿Quiénes asistirán?
              </p>

              <p className="mt-1 text-xs text-[#42594a]/45">
                Escribe únicamente a quienes podrán
                acompañarnos.
              </p>
            </div>

            <span className="shrink-0 text-xs text-[#6a424c]">
              Máx. {invitation.maxGuests}
            </span>
          </div>

          <div className="mt-5 space-y-3">
            {guests.map((guest, index) => (
              <div
                key={index}
                className="rounded-2xl border border-[#42594a]/10 bg-white p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f8f5ef] text-[#6a424c]">
                    <UserRound
                      size={16}
                      strokeWidth={1.6}
                    />
                  </div>

                  <input
                    value={guest.name}
                    onChange={(e) =>
                      onGuestChange(index, {
                        name: e.target.value,
                      })
                    }
                    placeholder={`Nombre del invitado ${index + 1}`}
                    className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#42594a]/30"
                  />
                </div>

                {guest.name.trim() && (
                  <label className="mt-3 flex cursor-pointer items-center gap-2 border-t border-[#42594a]/5 pt-3 text-xs text-[#42594a]/50">
                    <input
                      type="checkbox"
                      checked={guest.isChild}
                      onChange={(e) =>
                        onGuestChange(index, {
                          isChild: e.target.checked,
                        })
                      }
                      className="accent-[#6a424c]"
                    />
                    Es menor de edad
                  </label>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {answer && (
        <div className="mt-9 space-y-4">
          <p className="font-serif text-2xl text-[#42594a]">
            Datos de contacto
          </p>

          <input
            value={contactName}
            onChange={(e) =>
              onContactName(e.target.value)
            }
            placeholder="Nombre de contacto"
            className="w-full rounded-2xl border border-[#42594a]/10 bg-white px-5 py-4 text-sm outline-none transition focus:border-[#6a424c]/45"
          />

          <input
            value={contactPhone}
            onChange={(e) =>
              onContactPhone(e.target.value)
            }
            placeholder="Teléfono / WhatsApp"
            className="w-full rounded-2xl border border-[#42594a]/10 bg-white px-5 py-4 text-sm outline-none transition focus:border-[#6a424c]/45"
          />

          <input
            type="email"
            value={contactEmail}
            onChange={(e) =>
              onContactEmail(e.target.value)
            }
            placeholder="Correo electrónico"
            autoComplete="email"
            className="w-full rounded-2xl border border-[#42594a]/10 bg-white px-5 py-4 text-sm outline-none transition focus:border-[#6a424c]/45"
          />

          <textarea
            value={message}
            onChange={(e) => onMessage(e.target.value)}
            placeholder="Déjanos un mensaje (opcional)"
            className="min-h-28 w-full resize-none rounded-2xl border border-[#42594a]/10 bg-white px-5 py-4 text-sm outline-none transition focus:border-[#6a424c]/45"
          />

          <button
            onClick={onSubmit}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#6a424c] px-6 py-4 text-sm font-medium text-white transition hover:bg-[#583740] disabled:opacity-50"
          >
            {loading ? (
              <>
                <LoaderCircle
                  size={17}
                  className="animate-spin"
                />
                Guardando...
              </>
            ) : answer === "YES" ? (
              <>
                <Heart size={16} />
                Confirmar asistencia
              </>
            ) : (
              "Enviar respuesta"
            )}
          </button>

          <p className="text-center text-[11px] leading-5 text-[#42594a]/35">
            Podrás modificar tu respuesta después usando
            este mismo enlace.
          </p>
        </div>
      )}
    </div>
  );
}

function AnswerButton({
  active,
  icon,
  title,
  subtitle,
  onClick,
}: {
  active: boolean;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border p-4 text-left transition ${
        active
          ? "border-[#6a424c] bg-[#6a424c] text-white shadow-md shadow-[#6a424c]/10"
          : "border-[#42594a]/10 bg-white text-[#42594a] hover:border-[#6a424c]/30"
      }`}
    >
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-full ${
          active
            ? "bg-white/15"
            : "bg-[#f8f5ef] text-[#6a424c]"
        }`}
      >
        {icon}
      </div>

      <p className="mt-3 text-sm font-medium">
        {title}
      </p>

      <p
        className={`mt-1 text-[11px] leading-5 ${
          active
            ? "text-white/60"
            : "text-[#42594a]/45"
        }`}
      >
        {subtitle}
      </p>
    </button>
  );
}

function SavedResponse({
  invitation,
  onEdit,
}: {
  invitation: Invitation;
  onEdit: () => void;
}) {
  const attending =
    invitation.status === "CONFIRMED";

  return (
    <div className="mx-auto w-full max-w-md py-6 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#6a424c]/10 text-[#6a424c]">
        {attending ? (
          <Heart size={25} strokeWidth={1.5} />
        ) : (
          <Check size={25} strokeWidth={1.5} />
        )}
      </div>

      <p className="mt-7 text-[10px] uppercase tracking-[0.35em] text-[#6a424c]">
        Respuesta recibida
      </p>

      <h3 className="mt-3 font-serif text-4xl text-[#42594a]">
        {attending
          ? "¡Nos vemos en la boda!"
          : "Gracias por avisarnos"}
      </h3>

      <p className="mt-5 text-sm leading-7 text-[#42594a]/60">
        {attending
          ? `${invitation.groupName}, hemos guardado su confirmación. Nos hará muy felices compartir este día con ustedes.`
          : `${invitation.groupName}, gracias por hacernos saber que no podrán acompañarnos. Los tendremos presentes en este día tan especial.`}
      </p>

      {attending && invitation.guests.length > 0 && (
        <div className="mt-7 rounded-2xl bg-[#f8f5ef] p-5 text-left">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#6a424c]/70">
            Asistentes confirmados
          </p>

          <div className="mt-3 space-y-2">
            {invitation.guests.map((guest) => (
              <div
                key={guest.id}
                className="flex items-center gap-2 text-sm text-[#42594a]/70"
              >
                <Check
                  size={14}
                  className="text-[#6a424c]"
                />
                {guest.name}
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={onEdit}
        className="mt-7 rounded-full border border-[#42594a]/15 px-6 py-3 text-sm text-[#42594a] transition hover:bg-[#f8f5ef]"
      >
        Modificar mi respuesta
      </button>
    </div>
  );
}
