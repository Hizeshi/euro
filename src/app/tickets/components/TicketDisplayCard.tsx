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
  row: number;
  seat: number;
  code: string;
  ticketTitle?: string;
}

export const TicketDisplayCard: React.FC<TicketDisplayCardProps> = ({
  row,
  seat,
  code,
  ticketTitle = "Ticket",
}) => (
  <Card className="border-2 border-black text-black shadow-none rounded-none flex flex-col">
    <CardHeader className="pt-6 pb-3 px-6 text-center">
      <CardTitle className="text-lg font-semibold">{ticketTitle}</CardTitle>
      <div className="text-sm mt-2">
        <p>Row: {row}</p>
        <p>Seat: {seat}</p>
      </div>
    </CardHeader>
    <CardContent className="px-6 pt-4 pb-6 flex-grow">
      <div>
        <div className="border-2 border-black text-black rounded-xl py-2 px-4 text-center mb-6">
          <p className="text-sm">Code: {code}</p>
        </div>
        <ArtistInfoBlock />
      </div>
    </CardContent>
    <CardFooter className="px-6 pb-6 pt-4 flex justify-center">
      <Button
        variant="outline"
        className="rounded-md border-2 border-black text-black px-5 py-1.5 text-sm"
      >
        Cancel Ticket
      </Button>
    </CardFooter>
  </Card>
);
