import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ArtistInfoBlockProps {
  artist?: string;
  location?: string;
  date?: string;
  time?: string;
}

export const ArtistInfoBlock: React.FC<ArtistInfoBlockProps> = ({
  artist = "Artist",
  location = "Location",
  date = "Date",
  time = "Start - End",
}) => (
  <Card className="rounded-3xl border-2 border-black text-black shadow-sm">
    <CardHeader className="items-center text-center pt-6 pb-0 px-6">
      <p className="text-xs text-black uppercase tracking-wider">{date}</p>
      <CardTitle className="text-3xl font-semibold mt-1">{artist}</CardTitle>
      <p className="text-base text-black mt-1">{location}</p>
    </CardHeader>
    <CardContent className="text-center pt-8 pb-6 px-6">
      <p className="text-base text-black">{time}</p>
    </CardContent>
  </Card>
);
