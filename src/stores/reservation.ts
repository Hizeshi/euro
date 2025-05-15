import { create } from "zustand";
import { ReservationBody } from "../services/reservation";
import { reservation } from "../services/reservation";
import { Api } from "@/services/api";
import { AxiosError } from "axios";

interface ReservationStoreProps {
  selectedSeats: { row: number; seat: number }[];
  isLoading: boolean;
  reservationToken: string | null;
  setSelectedSeats: (seats: { row: number; seat: number }[]) => void;
  addSelectedSeat: (row: number, seat: number) => void;
  removeSelectedSeat: (row: number, seat: number) => void;
  reservation: (concertId: number, showId: number) => Promise<void>;
}

interface ErrorResponseNotExist {
  error: string;
}

interface ErrorResponseValidation {
  erroe: string;
}

export const useReservationStore = create<ReservationStoreProps>((set, get) => ({
  selectedSeats: [],
  isLoading: false,
  reservationToken: null,
  setSelectedSeats: (seats: { row: number; seat: number }[]) => set({ selectedSeats: seats }),
  
  addSelectedSeat: (row: number, seat: number) => set((state) => ({
      selectedSeats: [...state.selectedSeats, { row, seat }],
    })),
  
    removeSelectedSeat: (row: number, seat: number) => set((state) => ({
      selectedSeats: state.selectedSeats.filter(
        (s) => s.row !== row || s.seat !== seat
      ),
    })),
  
    reservation: async (concertId: number, showId: number) => {
        try {
            const body:ReservationBody = {
                reservation: get().selectedSeats,
            }
            if (get().reservationToken) {
                body.reservation_token = get().reservationToken;
            }   

        const res = await Api.reservation.reservation(concertId, showId, body);
      } catch (error) {
        console.error("Error reserving seats:", error);
        
        if (error && (error as AxiosError).isAxiosError) {
          const axiosError = error as AxiosError<ErrorResponseNotExist>;
          if (axiosError.response?.status !== 422) {
            console.error("Error fetching rows:", error);
            throw axiosError.response?.data.error;
          }
        }
        
        throw error;
      }
    }
}));