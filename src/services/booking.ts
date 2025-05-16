// src/services/booking.ts

import { ApiInstance } from './api-instance';
import { Ticket } from './tickets';

export type BookingBody = {
  reservation_token: string;
  name: string;
  address: string;
  city: string;
  zip: string;
  country: string;
};

type BookingResponse = {
  tickets: Ticket[];
};

export const create = async (
  concertId: number,
  showId: number,
  body: BookingBody
): Promise<BookingResponse> => {
  try {
    const res = await ApiInstance.post<BookingResponse>(
      `/concerts/${concertId}/shows/${showId}/booking`,
      body
    );
    return res.data;
  } catch (error: any) {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 401) {
        throw new Error(data.error || "Unauthorized: Invalid reservation token.");
      } else if (status === 404) {
        throw new Error(data.error || "A concert or show with this ID does not exist.");
      } else if (status === 422) {
        const fieldErrors = data.fields ? Object.values(data.fields).join(" ") : "Validation failed.";
        throw new Error(fieldErrors);
      }
    }
    throw new Error(error.message || "An unexpected error occurred during booking.");
  }
};