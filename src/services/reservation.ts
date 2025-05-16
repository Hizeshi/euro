// src/services/reservation.ts

import { ApiInstance } from './api-instance';

export type ReservationSeat = { 
  row: number;
  seat: number; 
};

export type ReservationBody = {
    reservation_token?: string | null;
    reservations: ReservationSeat[];
    duration?: number | null;
}

type ReservationResponse = {
    reserved: boolean;
    reservation_token: string;
    reserved_until: string;
}

export const reservation = async (
    concertId: number,
    showId: number,
    body: ReservationBody
  ): Promise<{ reservation_token: string; reserved_until: string }> => {
    try {
      const apiBody = { 
        reservation_token: body.reservation_token,
        reservations: body.reservations,
      }; 
      const res = await ApiInstance.post<ReservationResponse>(
        `/concerts/${concertId}/shows/${showId}/reservation`,
        apiBody 
      );
      return {
        reservation_token: res.data.reservation_token,
        reserved_until: res.data.reserved_until,
      };
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 403) {
          throw new Error(data.error || "Invalid reservation token");
        } else if (status === 404) {
          throw new Error(data.error || "A concert or show with this ID does not exist");
        } else if (status === 422) {
          const fields = data.fields;
          const errorMessages = fields ? 
            Object.values(fields).join(" ") 
            : (data.error || "Validation failed");
          throw new Error(errorMessages as string);
        }
      }
      throw new Error(error.message || "Failed to reserve seats");
    }
  };