"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createInvitation, getInvitations, getStats, login } from "@/lib/admin";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [groupName, setGroupName] = useState("");
  const [code, setCode] = useState("");
  const [maxGuests, setMaxGuests] = useState(2);

  const queryClient = useQueryClient();
  const [token, setToken] = useState<string | null>("loading");

  useEffect(() => {
    queueMicrotask(() => {
      setToken(localStorage.getItem("admin_token"));
    });
  }, []);

  const statsQuery = useQuery({
    queryKey: ["admin-stats", token],
    queryFn: () => getStats(token!),
    enabled: Boolean(token && token !== "loading"),
  });

  const invitationsQuery = useQuery({
    queryKey: ["admin-invitations", token],
    queryFn: () => getInvitations(token!),
    enabled: Boolean(token && token !== "loading"),
  });

  const createInvitationMutation = useMutation({
    mutationFn: () =>
      createInvitation(token!, {
        code,
        groupName,
        maxGuests,
      }),

    onSuccess: () => {
      toast.success("Invitación creada");

      setCode("");
      setGroupName("");
      setMaxGuests(2);

      queryClient.invalidateQueries({
        queryKey: ["admin-stats"],
      });

      queryClient.invalidateQueries({
        queryKey: ["admin-invitations"],
      });
    },

    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "No se pudo crear");
    },
  });

  if (token === "loading") {
    return null;
  }

  async function handleLogin() {
    try {
      const response = await login(password);
      localStorage.setItem("admin_token", response.token);
      setToken(response.token);
      toast.success("Bienvenido al panel");
    } catch {
      toast.error("Contraseña incorrecta");
    }
  }

  if (!token) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8f5ef] px-6 text-[#42594a]">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm">
          <p className="uppercase tracking-[0.35em] text-[#6a424c]">Admin</p>
          <h1 className="mt-4 text-4xl">Panel privado</h1>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="mt-8 w-full rounded-full border px-6 py-4 outline-none"
          />

          <button
            onClick={handleLogin}
            className="mt-6 w-full rounded-full bg-[#6a424c] px-6 py-4 text-white"
          >
            Entrar
          </button>
        </div>
      </main>
    );
  }

  const stats = statsQuery.data;
  const invitations = invitationsQuery.data ?? [];

  return (
    <main className="min-h-screen bg-[#f8f5ef] px-6 py-16 text-[#42594a]">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="uppercase tracking-[0.35em] text-[#6a424c]">Admin</p>
            <h1 className="mt-4 text-5xl">Panel de Jesús y Valeria</h1>
          </div>

          <button
            onClick={() => {
              localStorage.removeItem("admin_token");
              setToken(null);
            }}
            className="rounded-full border border-[#42594a]/20 px-6 py-3"
          >
            Salir
          </button>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-5">
          <Stat label="Invitaciones" value={stats?.total ?? 0} />
          <Stat label="Confirmadas" value={stats?.confirmed ?? 0} />
          <Stat label="Pendientes" value={stats?.pending ?? 0} />
          <Stat label="No asistirán" value={stats?.declined ?? 0} />
          <Stat label="Invitados" value={stats?.guests ?? 0} />
        </div>

        <div className="mt-10 rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl">Crear invitación</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <input
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Familia García"
              className="rounded-xl border px-4 py-3"
            />

            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="GARCIA01"
              className="rounded-xl border px-4 py-3"
            />

            <input
              type="number"
              value={maxGuests}
              onChange={(e) => setMaxGuests(Number(e.target.value))}
              className="rounded-xl border px-4 py-3"
            />
          </div>

          <button
            onClick={() => {
              if (!groupName.trim() || !code.trim() || maxGuests < 1) {
                toast.error("Completa grupo, código y pases");
                return;
              }

              createInvitationMutation.mutate();
            }}
            className="mt-6 rounded-full bg-[#6a424c] px-8 py-4 text-white"
          >
            Crear invitación
          </button>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#42594a] text-white">
              <tr>
                <th className="p-4">Código</th>
                <th className="p-4">Grupo</th>
                <th className="p-4">Status</th>
                <th className="p-4">Pases</th>
                <th className="p-4">Confirmados</th>
              </tr>
            </thead>
            <tbody>
              {invitations.map((invitation) => (
                <tr key={invitation.id} className="border-b">
                  <td className="p-4 font-medium">{invitation.code}</td>
                  <td className="p-4">{invitation.groupName}</td>
                  <td className="p-4">{invitation.status}</td>
                  <td className="p-4">{invitation.maxGuests}</td>
                  <td className="p-4">{invitation.guests.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <p className="text-sm uppercase tracking-[0.2em] text-[#6a424c]">
        {label}
      </p>
      <p className="mt-4 text-4xl">{value}</p>
    </div>
  );
}
