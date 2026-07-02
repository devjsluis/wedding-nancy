export interface Guest {
  id: string;
  name: string;
  isChild: boolean;
  dietaryRestrictions: string | null;
}

export type InvitationStatus = "PENDING" | "CONFIRMED" | "DECLINED";

export interface Invitation {
  id: string;
  code: string;
  groupName: string;
  maxGuests: number;
  status: InvitationStatus;

  contactName: string | null;
  contactPhone: string | null;
  contactEmail: string | null;

  message: string | null;

  guests: Guest[];
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
