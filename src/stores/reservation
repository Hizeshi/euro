import { create } from "zustand";
interface ReservationStoreProps {
  selectedSeats: { row: number; seat: number }[];
  isLoading: boolean;
  setSelectedSeats: (seats: { row: number; seat: number }[]) => void;
  addSelectedSeat: (row: number, seat: number) => void;
  removeSelectedSeat: (row: number, seat: number) => void;
  reservation: (concertId: number, showId: number) => Promise<void>;
}

export const useReservationStore = create<ReservationStoreProps>((set) => ({
  selectedSeats: [],
  isLoading: false,
  setSelectedSeats: (seats: { row: number; seat: number }[]) =>
    set({ selectedSeats: seats }),
  addSelectedSeat: (row: number, seat: number) =>
    set((state) => ({
      selectedSeats: [...state.selectedSeats, { row, seat }],
    })),
  removeSelectedSeat: (row: number, seat: number) =>
    set((state) => ({
      selectedSeats: state.selectedSeats.filter(
        (s) => s.row !== row || s.seat !== seat
      ),
    })),
  reservation: async (concertId: number, showId: number) => {},
}));