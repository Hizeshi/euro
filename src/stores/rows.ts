import { Row } from "@/@types/row";
import { Api } from "@/services/api";
import { AxiosError } from "axios";
import { create } from "zustand";

interface RowsStoreProps {
  rows: Row[];
  isLoading: boolean;
  fetchRows: (concertId: number, showId: number) => Promise<void>;
}
interface ErrorResponseNotExist {
  error: string;
}
export const useRowsStore = create<RowsStoreProps>((set) => ({
  rows: [],
  isLoading: false,
  fetchRows: async (concertId: number, showId: number) => {
    try {
      set({ isLoading: true });
      const rows = await Api.rows.getAll(concertId, showId);
      set({ rows });
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponseNotExist>;
      console.error("Error fetching rows:", error);
      throw axiosError.response?.data.error;
    } finally {
      set({ isLoading: false });
    }
  },
}));
