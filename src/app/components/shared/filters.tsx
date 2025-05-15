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

const filterTriggerWidth = "w-[180px]";

export const Filters: React.FC<Props> = ({ className }) => {
  const { artists, locations, filterShows } = UseShowsStore();
  const [artist, setArtist] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const onChangeArtist = (value: string) => {
    setArtist(value);
    filterShows(value, location, date);
  };

  const onChangeLocation = (value: string) => {
    setLocation(value);
    filterShows(artist, value, date);
  };

  const onChangeDate = (value: string) => {
    setDate(value);
    filterShows(artist, location, value);
  };

  return (
    <div>
      <div className="flex justify-between mt-4">
        <Select onValueChange={onChangeArtist}>
          <SelectTrigger className="w-full me-4 cursor-pointer">
            <SelectValue placeholder="Artist" />
          </SelectTrigger>
          <SelectContent>
            {artists.map((artist) => (
              <SelectItem
                key={artist}
                value={artist}
                className="cursor-pointer"
              >
                {artist}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={onChangeLocation}>
          <SelectTrigger className="w-full me-4 cursor-pointer">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            {locations.map((location) => (
              <SelectItem
                key={location}
                value={location}
                className="cursor-pointer"
              >
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          onChange={(e) => onChangeDate(e.target.value)}
          type="date"
          className="cursor-pointer"
        />
        {(artist || location || date) && (
          <Button
            onClick={() => {
              setArtist("");
              setLocation("");
              setDate("");
              filterShows("", "", "");
            }}
            className="ml-4 cursor-pointer"
          >
            Reset
          </Button>
        )}
      </div>
    </div>
  );
};
