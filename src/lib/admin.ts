import axios from "axios";
import { api } from "./api";
import type { AdminStats, Invitation, LoginResponse } from "@/types/invitation";

export async function login(password: string): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>("/api/admin/login", {
    password,
  });

  return data;
}

export async function getStats(token: string): Promise<AdminStats> {
  const { data } = await api.get<{ success: boolean; data: AdminStats }>(
    "/api/admin/stats",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data.data;
}

export async function getInvitations(token: string): Promise<Invitation[]> {
  const { data } = await api.get<{ success: boolean; data: Invitation[] }>(
    "/api/admin/invitations",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data.data;
}

export async function createInvitation(
  token: string,
  payload: {
    code: string;
    groupName: string;
    maxGuests: number;
  },
) {
  try {
    const { data } = await api.post("/api/admin/invitations", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "No se pudo crear");
    }

    throw error;
  }
}

export async function updateInvitation(
  token: string,
  id: string,
  payload: {
    groupName?: string;
    maxGuests?: number;
    contactName?: string;
    contactPhone?: string;
    contactEmail?: string;
  },
) {
  try {
    const { data } = await api.patch(`/api/admin/invitations/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "No se pudo actualizar la invitación",
      );
    }

    throw error;
  }
}

export async function deleteInvitation(token: string, id: string) {
  try {
    const { data } = await api.delete(`/api/admin/invitations/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "No se pudo eliminar la invitación",
      );
    }

    throw error;
  }
}

export async function downloadInvitationsExcel(token: string) {
  const response = await api.get("/api/admin/export.xlsx", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: "blob",
  });

  const url = URL.createObjectURL(response.data);
  const link = document.createElement("a");

  link.href = url;
  link.download = "invitados-valeria-jesus.xlsx";

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}
