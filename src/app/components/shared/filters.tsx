// src/app/components/shared/filters.tsx

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseShowsStore } from "@/stores/shows";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { artists, locations, filterShows } = UseShowsStore();
  const [artist, setArtist] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const onChangeArtist = (value: string) => {
    const newArtist = value === "all-artists" ? "" : value;
    setArtist(newArtist);
    filterShows(newArtist, location, date);
  };

  const onChangeLocation = (value: string) => {
    const newLocation = value === "all-locations" ? "" : value;
    setLocation(newLocation);
    filterShows(artist, newLocation, date);
  };

  const onChangeDate = (value: string) => {
    setDate(value);
    filterShows(artist, location, value);
  };

  const resetFilters = () => {
    setArtist("");
    setLocation("");
    setDate("");
    filterShows("", "", "");
  };


  return (
    <div className={className}>
      <div className="flex flex-col sm:flex-row justify-between mt-4 gap-4">
        <Select onValueChange={onChangeArtist} value={artist || "all-artists"}>
          <SelectTrigger className="w-full sm:w-[180px] me-0 sm:me-4 cursor-pointer">
            <SelectValue placeholder="All Artists" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-artists" className="cursor-pointer">
              All Artists
            </SelectItem>
            {artists.map((art) => (
              <SelectItem
                key={art}
                value={art}
                className="cursor-pointer"
              >
                {art}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={onChangeLocation} value={location || "all-locations"}>
          <SelectTrigger className="w-full sm:w-[180px] me-0 sm:me-4 cursor-pointer">
            <SelectValue placeholder="All Locations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-locations" className="cursor-pointer">
              All Locations
            </SelectItem>
            {locations.map((loc) => (
              <SelectItem
                key={loc}
                value={loc}
                className="cursor-pointer"
              >
                {loc}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          value={date}
          onChange={(e) => onChangeDate(e.target.value)}
          type="date"
          className="cursor-pointer w-full sm:w-auto"
        />
        {(artist || location || date) && (
          <Button
            onClick={resetFilters}
            className="ml-0 sm:ml-4 cursor-pointer w-full sm:w-auto mt-2 sm:mt-0"
            variant="outline"
          >
            Reset
          </Button>
        )}
      </div>
    </div>
  );
};