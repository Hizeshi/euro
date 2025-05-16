// src/services/shows.ts  

import { ApiInstance } from "@/services/api-instance";
import { Show } from "@/@types/show";

type ConcertApiResponseConcert = {
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
};

type ConcertApiResponse = {
  concerts: ConcertApiResponseConcert[];
};

const formatDateDdMmYyyy = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  } catch (e) {
    return "Invalid Date";
  }
};

const formatTimeHHMM = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Time";
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  } catch (e) {
    return "Invalid Time";
  }
};

export const getAll = async (): Promise<Show[]> => {
  try {
    const res = await ApiInstance.get<ConcertApiResponse>("/concerts");
    const shows = res.data.concerts
      .map((concert) => {
        return concert.shows.map((show) => {
          return {
            id: show.id,
            artist: concert.artist,
            location: concert.location.name,
            date: formatDateDdMmYyyy(show.start),
            start: formatTimeHHMM(show.start),
            end: formatTimeHHMM(show.end),
            concertId: concert.id,
          };
        });
      })
      .flat();
    return shows;
  } catch (error: any) {
    console.error("Failed to fetch or process shows:", error);
    return []; 
  }
};