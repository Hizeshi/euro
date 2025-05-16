// src/services/tickets.ts

import { ApiInstance } from "./api-instance";

export type Ticket = {
  id: number;
  code: string;
  name: string;
  created_at: string;
  row: { id: number; name: string };
  seat: number;
  show: {
    id: number;
    start: string;
    end: string;
    concert: {
      id: number;
      artist: string;
      location: { id: number; name: string };
    };
  };
  address?: string;
  city?: string;
  zip?: string;
  country?: string;
};

export const getTickets = async (code: string, name: string): Promise<Ticket[]> => {
  try {
    const res = await ApiInstance.post<{ tickets: Ticket[] }>("/tickets", { code, name });
    return res.data.tickets;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      throw new Error(error.response.data.error || "Unauthorized: Code or name mismatch.");
    }
    throw new Error(error.message || "Failed to retrieve tickets.");
  }
};

export const cancelTicket = async (ticketId: number, code: string, name: string): Promise<void> => {
  try {
    await ApiInstance.post(`/tickets/${ticketId}/cancel`, { code, name });
  } catch (error: any) {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 401) {
        throw new Error(data.error || "Unauthorized: Code or name mismatch for cancellation.");
      } else if (status === 404) {
        throw new Error(data.error || "A ticket with this ID does not exist.");
      }
    }
    throw new Error(error.message || "Failed to cancel ticket.");
  }
};