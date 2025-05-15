import { ApiInstance } from "@/services/api-instance";
import { Show } from "@/@types/show";

type ConcertApiResponse = {
  concerts: {
    id: number;
    artist: string;
    location: {
      id: number;
      name: string;
    };
    shows: {
      id: number;
      start: string;
      end: string;
    }[];
  }[];
};

export const getAll = async (): Promise<Show[]> => {
  const res = await ApiInstance.get<ConcertApiResponse>("/concerts");
  const shows = res.data.concerts
    .map((concert) => {
      return concert.shows.map((show) => {
        return {
          id: show.id,
          artist: concert.artist,
          location: concert.location.name,
          date: new Date(show.start).toLocaleDateString(),
          start: new Date(show.start).toLocaleDateString("ru-RU", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          end: new Date(show.end).toLocaleDateString("ru-RU", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          concertId: concert.id,
        };
      });
    })
    .flat();

  return shows;
};
