// src/services/rows.ts
import { Row } from "@/@types/row";
import { ApiInstance } from "./api-instance";

export const getAll = async (
  concertId: number,
  showId: number
): Promise<Row[]> => {
  try {
    const res = await ApiInstance.get<{ rows: Row[] }>(
      `/concerts/${concertId}/shows/${showId}/seating`
    );
    return res.data.rows;
  } catch (error: any) {
     if (error.response && error.response.status === 404) {
        throw new Error(error.response.data.error || "Seating information not found for this show.");
     }
     console.error("Error fetching rows from API:", error);
     throw new Error(error.message || "Failed to fetch seating information.");
  }
};