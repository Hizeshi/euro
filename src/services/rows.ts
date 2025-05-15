import { Row } from "@/@types/row";
import { ApiInstance } from "./api-instance";

export const getAll = async (
  concertId: number,
  showId: number
): Promise<Row[]> => {
  const res = await ApiInstance.get<{ rows: Row[] }>(
    `/concerts/${concertId}/shows/${showId}/seating`
  );
  return res.data.rows;
};
