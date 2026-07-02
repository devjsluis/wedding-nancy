"use client";

import { useState } from "react";
import { getInvitationByCode, submitRsvp } from "@/lib/invitations";
import type { Invitation } from "@/types/invitation";
type Guest = {
  name: string;
  isChild: boolean;
  dietaryRestrictions: string;
};

export function RSVP() {
  const [code, setCode] = useState("");
  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [message, setMessage] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSearch() {
    setLoading(true);
    setSuccess(false);

    try {
      const response = await getInvitationByCode(code.trim().toUpperCase());
      setInvitation(response.data);
      setGuests(
        Array.from({ length: response.data.maxGuests }, () => ({
          name: "",
          isChild: false,
          dietaryRestrictions: "",
        })),
      );
    } catch (error) {
      console.error(error);
      alert("No encontramos esa invitación.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(attending: boolean) {
    if (!invitation) return;

    const activeGuests = guests.filter((guest) => guest.name.trim());

    if (attending && activeGuests.length === 0) {
      alert("Agrega al menos un invitado.");
      return;
    }

    setLoading(true);

    try {
      await submitRsvp(invitation.code, {
        attending,
        contactName,
        contactPhone,
        message,
        guests: activeGuests,
      });

      setSuccess(true);
    } catch (error) {
      console.error(error);
      alert("No se pudo guardar tu confirmación.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="rsvp" className="bg-[#f8f5ef] px-6 py-32">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] bg-white shadow-sm lg:grid-cols-2">
        <div className="relative hidden min-h-[720px] lg:block">
          <img
            src="/images/rsvp.webp"
            alt="Jesús y Valeria"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="p-8 text-[#42594a] md:p-12">
          <p className="mb-4 uppercase tracking-[0.4em] text-[#6a424c]">RSVP</p>

          <h2 className="text-4xl md:text-5xl">Confirma tu asistencia</h2>

          <p className="mt-6 leading-7 text-[#42594a]/70">
            Ingresa tu código de invitación para confirmar si podrás
            acompañarnos en este día tan especial.
          </p>

          {!invitation && (
            <div className="mt-10">
              <label className="text-sm uppercase tracking-[0.25em]">
                Código de invitación
              </label>

              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Ingresa tu código"
                className="mt-4 w-full rounded-full border border-[#42594a]/20 px-6 py-4 outline-none"
              />

              <button
                onClick={handleSearch}
                disabled={loading || !code}
                className="mt-6 w-full rounded-full bg-[#6a424c] px-8 py-4 text-white disabled:opacity-50"
              >
                Buscar invitación
              </button>
            </div>
          )}

          {invitation && !success && (
            <div className="mt-10">
              <h3 className="text-3xl">{invitation.groupName}</h3>

              <p className="mt-2 text-[#42594a]/70">
                Tienen {invitation.maxGuests} pase(s) reservado(s).
              </p>

              <input
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Nombre de contacto"
                className="mt-8 w-full rounded-full border border-[#42594a]/20 px-6 py-4 outline-none"
              />

              <input
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="Teléfono / WhatsApp"
                className="mt-4 w-full rounded-full border border-[#42594a]/20 px-6 py-4 outline-none"
              />

              <div className="mt-8 space-y-4">
                {guests.map((guest, index) => (
                  <input
                    key={index}
                    value={guest.name}
                    onChange={(e) => {
                      const copy = [...guests];
                      copy[index].name = e.target.value;
                      setGuests(copy);
                    }}
                    placeholder={`Invitado ${index + 1}`}
                    className="w-full rounded-full border border-[#42594a]/20 px-6 py-4 outline-none"
                  />
                ))}
              </div>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Mensaje para Jesús & Valeria"
                className="mt-6 min-h-32 w-full rounded-3xl border border-[#42594a]/20 px-6 py-4 outline-none"
              />

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <button
                  onClick={() => handleSubmit(true)}
                  className="rounded-full bg-[#6a424c] px-8 py-4 text-white"
                >
                  Sí asistiremos
                </button>

                <button
                  onClick={() => handleSubmit(false)}
                  className="rounded-full border border-[#42594a]/30 px-8 py-4 text-[#42594a]"
                >
                  No podremos asistir
                </button>
              </div>
            </div>
          )}

          {success && (
            <div className="mt-12 rounded-3xl bg-[#f8f5ef] p-8 text-center">
              <h3 className="text-3xl">Confirmación recibida</h3>
              <p className="mt-4">
                Gracias por responder. Jesús & Valeria lo verán pronto ❤️
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
