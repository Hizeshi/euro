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

const formatDateYyyyMmDdToDdMmYyyy = (yyyyMmDd: string): string => {
    if (!yyyyMmDd || !/^\d{4}-\d{2}-\d{2}$/.test(yyyyMmDd)) {
        return yyyyMmDd; 
    }
    const parts = yyyyMmDd.split('-');
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
};

export const UseShowsStore = create<showsStoreProps>((set, get) => ({
  shows: [],
  _shows: [],
  isLoading: false,
  artists: [],
  locations: [],

  fetchShows: async () => {
    if (get()._shows.length > 0 && !get().isLoading) return;
    set({ isLoading: true });
    try {
      const fetchedShows = await Api.shows.getAll();
      set({ 
        shows: fetchedShows, 
        _shows: fetchedShows,
        artists: [...new Set(fetchedShows.map((show: Show) => show.artist))].sort(),
        locations: [...new Set(fetchedShows.map((show: Show) => show.location))].sort(),
        isLoading: false 
      });
    } catch (error) {
        console.error("Failed to fetch shows:", error);
        set({ isLoading: false, shows: [], _shows: [], artists: [], locations: [] });
    }
  },

  filterShows: (artist: string, location: string, dateInputYyyyMmDd: string) => {
    let filteredShows = [...get()._shows];
    if (artist) {
      filteredShows = filteredShows.filter((show) => show.artist === artist);
    }
    if (location) {
      filteredShows = filteredShows.filter((show) => show.location === location);
    }
    if (dateInputYyyyMmDd) {
      const filterDateDdMmYyyy = formatDateYyyyMmDdToDdMmYyyy(dateInputYyyyMmDd);
      filteredShows = filteredShows.filter(
        (show) => show.date === filterDateDdMmYyyy
      );
    }
    set({ shows: filteredShows });
  },

  getShowById: (id: number) => {
    const show = get()._shows.find((s) => s.id === id);
    return show;
  },
}));