// src/services/reservation.ts

import { ApiInstance } from './api-instance';

export type ReservationBody = {
    reservation_token?: string|null;
    reservation: { row: number; seat: number }[] | [];
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
    body: ReservationBody): Promise<{reservation_token: string, reserved_until:string}> => {
    const res = await ApiInstance.post<ReservationResponse>(
        `/concerts/${concertId}/shows/${showId}/reservation`,
        body);
        return {
            reservation_token: res.data.reservation_token,
            reserved_until: res.data.reserved_until
        }
}