// src/stores/reservation.ts
import { create } from "zustand";
import { ReservationBody as ServiceReservationBody, ReservationSeat } from "../services/reservation"; 
import { Api } from "@/services/api";

interface ReservationStoreProps {
  selectedSeats: ReservationSeat[]; 
  isLoading: boolean;
  reservationToken: string | null;
  reservedUntil: string | null; 
  addSelectedSeat: (row: number, seat: number) => void;
  removeSelectedSeat: (row: number, seat: number) => void;
  reservation: (concertId: number, showId: number) => Promise<void>;
  clearReservation: () => void; 
}

export const useReservationStore = create<ReservationStoreProps>((set, get) => ({
  selectedSeats: [],
  isLoading: false,
  reservationToken: null,
  reservedUntil: null,
  addSelectedSeat: (row, seat) => set((state) => {
    if (state.selectedSeats.some(s => s.row === row && s.seat === seat)) {
        return state;
    }
    return { selectedSeats: [...state.selectedSeats, { row, seat }] };
  }),
  removeSelectedSeat: (row, seat) => set((state) => ({
    selectedSeats: state.selectedSeats.filter((s) => s.row !== row || s.seat !== seat),
  })),
  reservation: async (concertId, showId) => {
    set({ isLoading: true });
    try {
      const currentSelectedSeats = get().selectedSeats;
      const body: ServiceReservationBody = { 
        reservations: currentSelectedSeats,
      };
      const currentToken = get().reservationToken;
      if (currentToken) {
        body.reservation_token = currentToken;
      }
      
      const res = await Api.reservation.reservation(concertId, showId, body); 
      set({
        reservationToken: res.reservation_token,
        reservedUntil: res.reserved_until,
        isLoading: false,
      });
    } catch (error: any) {
      set({ isLoading: false });
      throw error;
    }
  },
  clearReservation: () => set({
    selectedSeats: [],
    reservationToken: null,
    reservedUntil: null,
    isLoading: false,
  }),
}));