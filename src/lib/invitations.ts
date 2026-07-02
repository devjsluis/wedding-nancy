import { api } from "./api";

export async function getInvitationByCode(code: string) {
  const { data } = await api.get(`/api/invitations/${code}`);
  return data;
}

export async function submitRsvp(code: string, payload: unknown) {
  const { data } = await api.post(`/api/invitations/${code}/rsvp`, payload);

  return data;
}

export interface AdminStats {
  total: number;
  confirmed: number;
  declined: number;
  pending: number;
  guests: number;
}

export interface LoginResponse {
  success: boolean;
  token: string;
}
