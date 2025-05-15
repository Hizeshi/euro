// src/stores/shows.ts

import { Show } from "@/@types/show";
import { Api } from "@/services/api";
import { create } from "zustand";

interface showsStoreProps {
  shows: Show[];
  _shows: Show[];
  isLoading: boolean;
  artists: string[];
  locations: string[];

  fetchShows: () => Promise<void>;
  filterShows: (artist: string, location: string, date: string) => void;
  getShowById: (id: number) => Show | undefined;
}

export const UseShowsStore = create<showsStoreProps>((set, get) => ({
  shows: [],
  _shows: [],
  isLoading: false,
  artists: [],
  locations: [],

  fetchShows: async () => {
    set({ isLoading: true });
    const shows = await Api.shows.getAll();
    set({ shows, _shows: shows });
    set({ artists: [...new Set(shows.map((show: any) => show.artist))] });
    set({ locations: [...new Set(shows.map((show: any) => show.location))] });
    set({ isLoading: false });
  },

  filterShows: (artist: string, location: string, date: string) => {
    let shows = [...get()._shows];
    if (artist) {
      shows = shows.filter((show) => show.artist === artist);
    }
    if (location) {
      shows = shows.filter((show) => show.location === location);
    }
    if (date) {
      shows = shows.filter(
        (show) => show.date === new Date(date).toLocaleDateString()
      );
    }
    set({ shows });
  },

  getShowById: (id: number) => {
    const show = get()._shows.find((show) => show.id === id);
    return show;
  },
}));
