export type Row = {
  id: number;
  name: string;
  seats: {
    total: number;
    unavailable: number[];
  };
};
