"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Clipboard,
  Download,
  Edit3,
  Eye,
  EyeOff,
  ExternalLink,
  LogOut,
  Plus,
  Search,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { toast } from "sonner";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createInvitation,
  deleteInvitation,
  downloadInvitationsExcel,
  getInvitations,
  login,
  updateInvitation,
} from "@/lib/admin";

import type {
  Invitation,
  InvitationStatus,
} from "@/types/invitation";

type Filter = "ALL" | InvitationStatus;

function generateCode(groupName: string) {
  const base = groupName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 8);

  const suffix = Math.random()
    .toString(36)
    .slice(2, 6)
    .toUpperCase();

  return `${base || "INV"}${suffix}`;
}

function invitationUrl(code: string) {
  if (typeof window === "undefined") return "";
  return `${window.location.origin}/?i=${encodeURIComponent(code)}`;
}

export default function AdminPage() {
  const queryClient = useQueryClient();

  const [token, setToken] = useState<string | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setToken(localStorage.getItem("admin_token"));
      setAuthReady(true);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const [groupName, setGroupName] = useState("");
  const [maxGuests, setMaxGuests] = useState(2);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("ALL");

  const [editing, setEditing] = useState<Invitation | null>(null);
  const [deleting, setDeleting] = useState<Invitation | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const invitationsQuery = useQuery({
    queryKey: ["admin-invitations", token],
    queryFn: () => getInvitations(token as string),
    enabled: Boolean(token && token !== "loading"),
  });

  async function refreshData() {
    await queryClient.invalidateQueries({
      queryKey: ["admin-invitations"],
    });
  }

  const createMutation = useMutation({
    mutationFn: (payload: {
      code: string;
      groupName: string;
      maxGuests: number;
    }) => createInvitation(token as string, payload),

    onSuccess: async () => {
      setGroupName("");
      setMaxGuests(2);
      toast.success("Invitación creada");
      await refreshData();
    },

    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "No se pudo crear la invitación",
      );
    },
  });

  const updateMutation = useMutation({
    mutationFn: (payload: {
      id: string;
      groupName: string;
      maxGuests: number;
      contactName?: string;
      contactPhone?: string;
      contactEmail?: string;
    }) =>
      updateInvitation(token as string, payload.id, {
        groupName: payload.groupName,
        maxGuests: payload.maxGuests,
        contactName: payload.contactName,
        contactPhone: payload.contactPhone,
        contactEmail: payload.contactEmail,
      }),

    onSuccess: async () => {
      setEditing(null);
      toast.success("Invitación actualizada");
      await refreshData();
    },

    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "No se pudo actualizar",
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      deleteInvitation(token as string, id),

    onSuccess: async () => {
      toast.success("Invitación eliminada");
      await refreshData();
    },

    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "No se pudo eliminar",
      );
    },
  });

  const invitations = useMemo(
    () => invitationsQuery.data ?? [],
    [invitationsQuery.data],
  );
  const filteredInvitations = useMemo(() => {
    const query = search.trim().toLowerCase();

    return invitations.filter((invitation) => {
      const matchesStatus =
        filter === "ALL" || invitation.status === filter;

      const matchesSearch =
        !query ||
        invitation.groupName.toLowerCase().includes(query) ||
        invitation.code.toLowerCase().includes(query) ||
        invitation.contactName?.toLowerCase().includes(query) ||
        invitation.contactPhone?.toLowerCase().includes(query) ||
        invitation.guests.some((guest) =>
          guest.name.toLowerCase().includes(query),
        );

      return matchesStatus && matchesSearch;
    });
  }, [invitations, search, filter]);

  const totalPlaces = useMemo(
    () =>
      invitations.reduce(
        (total, invitation) => total + invitation.maxGuests,
        0,
      ),
    [invitations],
  );

  const attendanceMetrics = useMemo(() => {
    return invitations.reduce(
      (totals, invitation) => {
        if (invitation.status === "PENDING") {
          totals.pending += invitation.maxGuests;
          return totals;
        }

        if (invitation.status === "DECLINED") {
          totals.declined += invitation.maxGuests;
          return totals;
        }

        const confirmed = invitation.guests.length;

        totals.confirmed += confirmed;
        totals.declined += Math.max(
          0,
          invitation.maxGuests - confirmed,
        );

        return totals;
      },
      {
        confirmed: 0,
        pending: 0,
        declined: 0,
      },
    );
  }, [invitations]);

  async function handleLogin() {
    if (!password.trim()) return;

    try {
      const response = await login(password);
      localStorage.setItem("admin_token", response.token);
      setToken(response.token);
      setPassword("");
      toast.success("Bienvenidos al panel");
    } catch {
      toast.error("Contraseña incorrecta");
    }
  }

  function logout() {
    localStorage.removeItem("admin_token");
    setToken(null);
  }

  async function copyInvitation(invitation: Invitation) {
    try {
      await navigator.clipboard.writeText(
        invitationUrl(invitation.code),
      );
      toast.success(`Link de ${invitation.groupName} copiado`);
    } catch {
      toast.error("No se pudo copiar el enlace");
    }
  }

  async function handleCreate() {
    const normalizedName = groupName.trim();

    if (!normalizedName) {
      toast.error("Escribe el nombre de la familia o invitado");
      return;
    }

    if (!Number.isInteger(maxGuests) || maxGuests < 1) {
      toast.error("Debe haber al menos un lugar");
      return;
    }

    let code = generateCode(normalizedName);

    while (
      invitations.some(
        (invitation) => invitation.code === code,
      )
    ) {
      code = generateCode(normalizedName);
    }

    createMutation.mutate({
      groupName: normalizedName,
      maxGuests,
      code,
    });
  }

  function handleDelete(invitation: Invitation) {
    setDeleting(invitation);
  }

  if (!authReady) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f4efe6] text-[#42594a]">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#6a424c]/20 border-t-[#6a424c]" />
          <p className="mt-4 text-xs uppercase tracking-[0.3em] text-[#6a424c]/60">
            Valeria &amp; Jesús
          </p>
        </div>
      </main>
    );
  }

  if (!token) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f4efe6] px-5 py-12 text-[#42594a]">
        <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full border border-[#6a424c]/10" />
        <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full border border-[#6a424c]/10" />

        <div className="relative w-full max-w-md rounded-[2rem] border border-[#42594a]/10 bg-white/80 p-7 shadow-xl shadow-[#42594a]/5 backdrop-blur md:p-10">
          <div className="mx-auto flex max-w-[130px] items-center gap-3">
            <span className="h-px flex-1 bg-[#6a424c]/25" />
            <span className="font-serif text-lg text-[#6a424c]">
              ♡
            </span>
            <span className="h-px flex-1 bg-[#6a424c]/25" />
          </div>

          <p className="mt-7 text-center text-[10px] uppercase tracking-[0.45em] text-[#6a424c]">
            Valeria &amp; Jesús
          </p>

          <h1 className="mt-4 text-center font-serif text-4xl font-light md:text-5xl">
            Panel privado
          </h1>

          <p className="mx-auto mt-4 max-w-xs text-center text-sm leading-6 text-[#42594a]/60">
            Administra las invitaciones y confirmaciones de la boda.
          </p>

          <div className="relative mt-8">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  void handleLogin();
                }
              }}
              placeholder="Contraseña"
              autoFocus
              className="w-full rounded-full border border-[#42594a]/15 bg-white px-6 py-4 pr-14 outline-none transition focus:border-[#6a424c]"
            />

            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-[#6a424c]/60 transition hover:text-[#6a424c]"
              aria-label={
                showPassword
                  ? "Ocultar contraseña"
                  : "Mostrar contraseña"
              }
              title={
                showPassword
                  ? "Ocultar contraseña"
                  : "Mostrar contraseña"
              }
            >
              {showPassword ? (
                <EyeOff size={20} aria-hidden="true" />
              ) : (
                <Eye size={20} aria-hidden="true" />
              )}
            </button>
          </div>

          <button
            onClick={handleLogin}
            disabled={!password.trim()}
            className="mt-4 w-full rounded-full bg-[#6a424c] px-6 py-4 font-medium text-white transition hover:bg-[#583740] disabled:opacity-50"
          >
            Entrar al panel
          </button>

          <p className="mt-7 text-center font-serif text-sm italic text-[#6a424c]/60">
            19 · 12 · 26
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f8f5ef] text-[#42594a]">
      <header className="sticky top-0 z-50 border-b border-[#42594a]/10 bg-white/90 shadow-sm shadow-[#42594a]/5 backdrop-blur-xl">
        <div className="mx-auto flex w-full min-w-0 max-w-7xl items-center justify-between gap-4 px-5 py-5 md:px-8">
          <div>
            <p className="text-[9px] uppercase tracking-[0.4em] text-[#6a424c] md:text-[10px]">
              Valeria &amp; Jesús
            </p>

            <h1 className="mt-1 font-serif text-2xl md:text-3xl">
              Invitados
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={async () => {
                try {
                  await downloadInvitationsExcel(token);
                  toast.success("Lista exportada");
                } catch {
                  toast.error("No se pudo exportar");
                }
              }}
              className="flex h-11 items-center gap-2 rounded-full border border-[#42594a]/15 px-4 text-sm transition hover:bg-[#f8f5ef]"
            >
              <Download size={16} />
              <span className="hidden sm:inline">Exportar</span>
            </button>

            <button
              onClick={logout}
              className="flex h-11 items-center gap-2 rounded-full border border-[#42594a]/15 px-4 text-sm transition hover:bg-[#f8f5ef]"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full min-w-0 max-w-7xl px-5 py-8 md:px-8 md:py-12">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#6a424c]">
            Panel de boda
          </p>

          <h2 className="mt-3 font-serif text-4xl font-light md:text-5xl">
            Lista de invitados
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#42594a]/60 md:text-base">
            Crea invitaciones, comparte enlaces personalizados y consulta
            quiénes ya confirmaron su asistencia.
          </p>
        </div>

        <section className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-5">
          <StatCard
            label="Invitados"
            value={totalPlaces}
            description="personas"
          />

          <StatCard
            label="Confirmados"
            value={attendanceMetrics.confirmed}
            description="personas"
            accent
          />

          <StatCard
            label="Pendientes"
            value={attendanceMetrics.pending}
            description="personas"
          />

          <StatCard
            label="No asistirán"
            value={attendanceMetrics.declined}
            description="personas"
          />

          <StatCard
            label="Invitaciones"
            value={invitations.length}
            description="familias / grupos"
            className="col-span-2 lg:col-span-1"
          />
        </section>

        <section className="mt-8 rounded-[2rem] bg-[#6a424c] p-6 text-white shadow-lg shadow-[#6a424c]/10 md:p-8">
          <div className="grid min-w-0 items-end gap-6 lg:grid-cols-[minmax(0,1fr)_170px_auto]">
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-white/55">
                Nueva invitación
              </p>

              <label className="mt-5 block text-sm text-white/70">
                Familia o invitado
              </label>

              <input
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    void handleCreate();
                  }
                }}
                placeholder="Ej. Familia García"
                className="mt-2 w-full rounded-2xl border border-white/15 bg-white/10 px-5 py-4 text-white outline-none placeholder:text-white/35 focus:border-white/40"
              />
            </div>

            <div>
              <label className="block text-sm text-white/70">
                Lugares
              </label>

              <div className="mt-2 flex h-[58px] items-center rounded-2xl border border-white/15 bg-white/10">
                <button
                  type="button"
                  onClick={() =>
                    setMaxGuests((current) =>
                      Math.max(1, current - 1),
                    )
                  }
                  className="h-full w-14 text-2xl text-white/70"
                >
                  −
                </button>

                <input
                  type="number"
                  min={1}
                  value={maxGuests}
                  onChange={(e) =>
                    setMaxGuests(
                      Math.max(1, Number(e.target.value) || 1),
                    )
                  }
                  className="min-w-0 flex-1 bg-transparent text-center text-xl outline-none"
                />

                <button
                  type="button"
                  onClick={() =>
                    setMaxGuests((current) => current + 1)
                  }
                  className="h-full w-14 text-2xl text-white/70"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleCreate}
              disabled={
                createMutation.isPending || !groupName.trim()
              }
              className="flex h-[58px] items-center justify-center gap-2 rounded-2xl bg-white px-7 font-medium text-[#6a424c] transition hover:bg-[#f8f5ef] disabled:opacity-50"
            >
              <Plus size={18} />
              {createMutation.isPending
                ? "Creando..."
                : "Crear invitación"}
            </button>
          </div>
        </section>

        <section className="mt-8">
          <div className="min-w-0 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative min-w-0 w-full lg:max-w-md">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#42594a]/40"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar familia, invitado o teléfono..."
                className="w-full rounded-full border border-[#42594a]/10 bg-white py-3.5 pl-11 pr-5 outline-none transition focus:border-[#6a424c]/40"
              />
            </div>

            <div className="flex w-full min-w-0 gap-2 overflow-x-auto pb-1 lg:w-auto">
              <FilterButton
                active={filter === "ALL"}
                onClick={() => setFilter("ALL")}
              >
                Todas
              </FilterButton>

              <FilterButton
                active={filter === "PENDING"}
                onClick={() => setFilter("PENDING")}
              >
                Pendientes
              </FilterButton>

              <FilterButton
                active={filter === "CONFIRMED"}
                onClick={() => setFilter("CONFIRMED")}
              >
                Confirmadas
              </FilterButton>

              <FilterButton
                active={filter === "DECLINED"}
                onClick={() => setFilter("DECLINED")}
              >
                No asistirán
              </FilterButton>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <p className="text-sm text-[#42594a]/55">
              {filteredInvitations.length}{" "}
              {filteredInvitations.length === 1
                ? "invitación"
                : "invitaciones"}
            </p>
          </div>

          {invitationsQuery.isLoading ? (
            <div className="mt-6 rounded-[2rem] bg-white p-12 text-center">
              <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-[#6a424c]/20 border-t-[#6a424c]" />
              <p className="mt-4 text-sm text-[#42594a]/50">
                Cargando invitados...
              </p>
            </div>
          ) : filteredInvitations.length === 0 ? (
            <div className="mt-6 rounded-[2rem] border border-dashed border-[#42594a]/15 bg-white/50 px-6 py-16 text-center">
              <Users
                size={32}
                className="mx-auto text-[#6a424c]/35"
              />

              <h3 className="mt-5 font-serif text-2xl">
                No hay invitaciones
              </h3>

              <p className="mt-2 text-sm text-[#42594a]/50">
                {invitations.length
                  ? "No encontramos resultados con esos filtros."
                  : "Crea la primera invitación para comenzar."}
              </p>
            </div>
          ) : (
            <div className="mt-5 space-y-3">
              {filteredInvitations.map((invitation) => (
                <InvitationCard
                  key={invitation.id}
                  invitation={invitation}
                  expanded={expandedId === invitation.id}
                  onToggle={() =>
                    setExpandedId((current) =>
                      current === invitation.id
                        ? null
                        : invitation.id,
                    )
                  }
                  onCopy={() =>
                    void copyInvitation(invitation)
                  }
                  onEdit={() => setEditing(invitation)}
                  onDelete={() => handleDelete(invitation)}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      {deleting && (
        <DeleteModal
          invitation={deleting}
          loading={deleteMutation.isPending}
          onClose={() => setDeleting(null)}
          onConfirm={() => {
            deleteMutation.mutate(deleting.id, {
              onSuccess: () => setDeleting(null),
            });
          }}
        />
      )}

      {editing && (
        <EditModal
          invitation={editing}
          loading={updateMutation.isPending}
          onClose={() => setEditing(null)}
          onSave={(values) =>
            updateMutation.mutate({
              id: editing.id,
              ...values,
            })
          }
        />
      )}
    </main>
  );
}

function StatCard({
  label,
  value,
  description,
  accent = false,
  className = "",
}: {
  label: string;
  value: number;
  description: string;
  accent?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[1.5rem] border p-5 md:p-6 ${
        accent
          ? "border-[#6a424c] bg-[#6a424c] text-white"
          : "border-[#42594a]/5 bg-white"
      } ${className}`}
    >
      <p
        className={`text-[9px] uppercase tracking-[0.25em] md:text-[10px] ${
          accent ? "text-white/60" : "text-[#6a424c]/70"
        }`}
      >
        {label}
      </p>

      <p className="mt-3 font-serif text-3xl md:text-4xl">
        {value}
      </p>

      <p
        className={`mt-1 text-xs ${
          accent ? "text-white/50" : "text-[#42594a]/40"
        }`}
      >
        {description}
      </p>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap rounded-full px-4 py-2.5 text-xs transition ${
        active
          ? "bg-[#6a424c] text-white"
          : "border border-[#42594a]/10 bg-white text-[#42594a]/65 hover:border-[#6a424c]/30"
      }`}
    >
      {children}
    </button>
  );
}

function InvitationCard({
  invitation,
  expanded,
  onToggle,
  onCopy,
  onEdit,
  onDelete,
}: {
  invitation: Invitation;
  expanded: boolean;
  onToggle: () => void;
  onCopy: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <article className="overflow-hidden rounded-[1.5rem] border border-[#42594a]/5 bg-white transition hover:border-[#6a424c]/15">
      <div className="p-5 md:p-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-center">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={invitation.status} />

              <span className="text-[10px] uppercase tracking-[0.2em] text-[#42594a]/35">
                {invitation.code}
              </span>
            </div>

            <h3 className="mt-3 truncate font-serif text-2xl">
              {invitation.groupName}
            </h3>

            <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-[#42594a]/55">
              <span>
                {invitation.maxGuests}{" "}
                {invitation.maxGuests === 1
                  ? "lugar"
                  : "lugares"}
              </span>

              <span>
                {invitation.guests.length} confirmados
              </span>

              {invitation.contactPhone && (
                <span>{invitation.contactPhone}</span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onCopy}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#6a424c] px-4 py-2.5 text-xs text-white transition hover:bg-[#583740] sm:flex-none"
            >
              <Clipboard size={14} />
              Copiar link
            </button>

            <a
              href={invitationUrl(invitation.code)}
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#42594a]/10 transition hover:bg-[#f8f5ef]"
              title="Abrir invitación"
            >
              <ExternalLink size={15} />
            </a>

            <button
              onClick={onEdit}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#42594a]/10 transition hover:bg-[#f8f5ef]"
              title="Editar"
            >
              <Edit3 size={15} />
            </button>

            <button
              onClick={onDelete}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-red-900/10 text-red-800/60 transition hover:bg-red-50"
              title="Eliminar"
            >
              <Trash2 size={15} />
            </button>

            <button
              onClick={onToggle}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#42594a]/10 transition hover:bg-[#f8f5ef]"
              title="Ver detalles"
            >
              {expanded ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </button>
          </div>
        </div>

        {expanded && (
          <div className="mt-6 border-t border-[#42594a]/8 pt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#6a424c]/65">
                  Personas confirmadas
                </p>

                {invitation.guests.length ? (
                  <div className="mt-3 space-y-2">
                    {invitation.guests.map((guest) => (
                      <div
                        key={guest.id}
                        className="flex items-center gap-3 rounded-xl bg-[#f8f5ef] px-4 py-3 text-sm"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#6a424c]/10 text-[#6a424c]">
                          <Check size={13} />
                        </span>

                        <span>{guest.name}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-[#42594a]/45">
                    Aún no hay personas confirmadas.
                  </p>
                )}
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#6a424c]/65">
                  Contacto y mensaje
                </p>

                <div className="mt-3 space-y-2 text-sm leading-6 text-[#42594a]/65">
                  <p>
                    <strong className="font-medium text-[#42594a]">
                      Contacto:
                    </strong>{" "}
                    {invitation.contactName || "—"}
                  </p>

                  <p>
                    <strong className="font-medium text-[#42594a]">
                      Teléfono:
                    </strong>{" "}
                    {invitation.contactPhone || "—"}
                  </p>

                  <p>
                    <strong className="font-medium text-[#42594a]">
                      Email:
                    </strong>{" "}
                    {invitation.contactEmail || "—"}
                  </p>

                  {invitation.message && (
                    <div className="mt-4 rounded-xl bg-[#f8f5ef] p-4 font-serif italic">
                      “{invitation.message}”
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

function StatusBadge({
  status,
}: {
  status: InvitationStatus;
}) {
  const config = {
    PENDING: {
      label: "Pendiente",
      classes: "bg-amber-50 text-amber-800",
    },
    CONFIRMED: {
      label: "Confirmada",
      classes: "bg-emerald-50 text-emerald-800",
    },
    DECLINED: {
      label: "No asistirá",
      classes: "bg-rose-50 text-rose-800",
    },
  }[status];

  return (
    <span
      className={`rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] ${config.classes}`}
    >
      {config.label}
    </span>
  );
}

function DeleteModal({
  invitation,
  loading,
  onClose,
  onConfirm,
}: {
  invitation: Invitation;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[110] flex items-end justify-center bg-[#24191c]/45 p-0 backdrop-blur-sm sm:items-center sm:p-6">
      <div className="w-full rounded-t-[2rem] bg-[#fffdf9] p-6 text-[#42594a] shadow-2xl sm:max-w-md sm:rounded-[2rem] sm:p-8">
        <div className="flex items-start justify-between gap-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#6a424c]/10 text-[#6a424c]">
            <Trash2 size={20} />
          </div>

          <button
            onClick={onClose}
            disabled={loading}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f8f5ef] transition hover:bg-[#f0ebe2]"
            aria-label="Cerrar"
          >
            <X size={18} />
          </button>
        </div>

        <p className="mt-7 text-[10px] uppercase tracking-[0.3em] text-[#6a424c]">
          Eliminar invitación
        </p>

        <h2 className="mt-2 font-serif text-3xl">
          ¿Eliminar a {invitation.groupName}?
        </h2>

        <p className="mt-4 text-sm leading-6 text-[#42594a]/65">
          Esta invitación y la información asociada a ella se eliminarán
          permanentemente.
        </p>

        {invitation.guests.length > 0 && (
          <div className="mt-5 rounded-2xl border border-[#6a424c]/10 bg-[#f8f5ef] p-4">
            <p className="text-sm leading-6 text-[#42594a]/70">
              Esta invitación ya tiene{" "}
              <strong className="font-semibold text-[#6a424c]">
                {invitation.guests.length}{" "}
                {invitation.guests.length === 1
                  ? "persona confirmada"
                  : "personas confirmadas"}
              </strong>
              . Sus confirmaciones también se eliminarán.
            </p>
          </div>
        )}

        <p className="mt-5 text-xs text-[#42594a]/45">
          Esta acción no se puede deshacer.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-full border border-[#42594a]/15 px-5 py-3.5 text-sm transition hover:bg-[#f8f5ef] disabled:opacity-50"
          >
            Cancelar
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="rounded-full bg-[#6a424c] px-5 py-3.5 text-sm text-white transition hover:bg-[#583740] disabled:opacity-50"
          >
            {loading ? "Eliminando..." : "Eliminar"}
          </button>
        </div>
      </div>
    </div>
  );
}

function EditModal({
  invitation,
  loading,
  onClose,
  onSave,
}: {
  invitation: Invitation;
  loading: boolean;
  onClose: () => void;
  onSave: (values: {
    groupName: string;
    maxGuests: number;
    contactName?: string;
    contactPhone?: string;
    contactEmail?: string;
  }) => void;
}) {
  const [groupName, setGroupName] = useState(
    invitation.groupName,
  );

  const [maxGuests, setMaxGuests] = useState(
    invitation.maxGuests,
  );

  const [contactName, setContactName] = useState(
    invitation.contactName ?? "",
  );

  const [contactPhone, setContactPhone] = useState(
    invitation.contactPhone ?? "",
  );

  const [contactEmail, setContactEmail] = useState(
    invitation.contactEmail ?? "",
  );

  function save() {
    if (!groupName.trim()) {
      toast.error("Escribe un nombre");
      return;
    }

    onSave({
      groupName: groupName.trim(),
      maxGuests,
      contactName,
      contactPhone,
      contactEmail,
    });
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-[#24191c]/45 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !loading) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-invitation-title"
        className="flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-[2rem] bg-white text-[#42594a] shadow-2xl sm:max-w-lg sm:rounded-[2rem]"
        onMouseDown={(event) => event.stopPropagation()}
      >
        {/* HEADER FIJO */}
        <div className="shrink-0 border-b border-[#42594a]/10 bg-white px-6 py-5 sm:px-8 sm:py-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#6a424c]">
                Editar invitación
              </p>

              <h2
                id="edit-invitation-title"
                className="mt-2 truncate font-serif text-3xl"
              >
                {invitation.groupName}
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              aria-label="Cerrar"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f8f5ef] transition hover:bg-[#f0ebe2] disabled:opacity-50"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* SOLO ESTA PARTE HACE SCROLL */}
        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-8 sm:py-7">
          <div className="space-y-4">
            <Field
              label="Familia o invitado"
              value={groupName}
              onChange={setGroupName}
            />

            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-[#42594a]/55">
                Lugares
              </label>

              <input
                type="number"
                min={1}
                value={maxGuests}
                onChange={(e) =>
                  setMaxGuests(
                    Math.max(
                      1,
                      Number(e.target.value) || 1,
                    ),
                  )
                }
                className="mt-2 w-full rounded-2xl border border-[#42594a]/15 px-5 py-3.5 outline-none transition focus:border-[#6a424c]"
              />

              {invitation.guests.length > 0 && (
                <p className="mt-2 text-xs text-[#42594a]/45">
                  Ya hay {invitation.guests.length}{" "}
                  {invitation.guests.length === 1
                    ? "persona confirmada"
                    : "personas confirmadas"}.
                </p>
              )}
            </div>

            <Field
              label="Nombre de contacto"
              value={contactName}
              onChange={setContactName}
            />

            <Field
              label="Teléfono / WhatsApp"
              value={contactPhone}
              onChange={setContactPhone}
            />

            <Field
              label="Correo electrónico"
              value={contactEmail}
              onChange={setContactEmail}
              type="email"
            />
          </div>
        </div>

        {/* FOOTER FIJO */}
        <div className="shrink-0 border-t border-[#42594a]/10 bg-white px-6 py-5 sm:px-8">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-full border border-[#42594a]/15 px-5 py-3.5 transition hover:bg-[#f8f5ef] disabled:opacity-50"
            >
              Cancelar
            </button>

            <button
              type="button"
              onClick={save}
              disabled={loading}
              className="rounded-full bg-[#6a424c] px-5 py-3.5 text-white transition hover:bg-[#583740] disabled:opacity-50"
            >
              {loading
                ? "Guardando..."
                : "Guardar cambios"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="text-xs uppercase tracking-[0.2em] text-[#42594a]/55">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-2xl border border-[#42594a]/15 px-5 py-3.5 outline-none transition focus:border-[#6a424c]"
      />
    </div>
  );
}
