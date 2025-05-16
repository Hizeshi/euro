// src/stores/rows.ts
import { Row } from "@/@types/row";
import { Api } from "@/services/api";
import { create } from "zustand";

interface RowsStoreProps {
  rows: Row[];
  isLoading: boolean;
  error: string | null;
  fetchRows: (concertId: number, showId: number) => Promise<void>;
}

export const useRowsStore = create<RowsStoreProps>((set) => ({
  rows: [],
  isLoading: false,
  error: null,
  fetchRows: async (concertId: number, showId: number) => {
    set({ isLoading: true, error: null, rows: [] }); 
    try {
      const fetchedRows = await Api.rows.getAll(concertId, showId);
      set({ rows: fetchedRows, isLoading: false });
    } catch (error: any) {
      console.error("Error fetching rows in store:", error);
      set({ isLoading: false, error: error.message || "Failed to load seating information.", rows: [] });
    }
  },
}));