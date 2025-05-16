// src/app/tickets/components/TicketDisplayCard.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { ArtistInfoBlock } from "./ArtistInfoBlock"; 

interface TicketDisplayCardProps {
  rowName: string;
  seat: number;
  code: string;
  ticketId: number;
  name: string; 
  
  artist: string;
  location: string;
  date: string; 
  time: string; 

  onCancel: (ticketId: number) => void;
  isLoading?: boolean;
}

export const TicketDisplayCard: React.FC<TicketDisplayCardProps> = ({
  rowName,
  seat,
  code,
  ticketId,
  name,
  artist,
  location,
  date,
  time,
  onCancel,
  isLoading,
}) => (
  <Card className="border-2 border-black text-black shadow-none rounded-none flex flex-col">
    <CardHeader className="pt-6 pb-3 px-6 text-center">
      <CardTitle className="text-lg font-semibold">Ticket</CardTitle>
      <div className="text-sm mt-2">
        <p>Row: {rowName}</p>
        <p>Seat: {seat}</p>
      </div>
    </CardHeader>
    <CardContent className="px-6 pt-4 pb-6 flex-grow">
      <div>
        <div className="border-2 border-black text-black rounded-xl py-2 px-4 text-center mb-6">
          <p className="text-sm">Code: {code}</p>
        </div>
        <ArtistInfoBlock 
          artist={artist}
          location={location}
          date={date}
          time={time}
        />
      </div>
    </CardContent>
    <CardFooter className="px-6 pb-6 pt-4 flex justify-center">
      <Button
        variant="outline"
        className="rounded-md border-2 border-black text-black px-5 py-1.5 text-sm"
        onClick={() => onCancel(ticketId)}
        disabled={isLoading}
      >
        {isLoading ? "Cancelling..." : "Cancel Ticket"}
      </Button>
    </CardFooter>
  </Card>
);