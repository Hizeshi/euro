// src/app/tickets/components/YourDetailsCard.tsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface YourDetailsCardProps {
    name: string;
    address?: string;
    city?: string;
    zip?: string;
    country?: string; 
    bookedOn: string; 
}

const YourDetailsCard: React.FC<YourDetailsCardProps> = ({
    name,
    address,
    city,
    zip,
    country,
    bookedOn
}) => {
  return (
    <Card className="border-2 border-black text-black shadow-none rounded-none mb-8">
      <CardHeader className="pt-6 pb-3 px-6 text-center">
        <CardTitle className="text-lg font-semibold">Your Details</CardTitle>
      </CardHeader>
      <CardContent className="px-6 pt-4 pb-6">
        <div className="text-sm text-center space-y-1">
          <p>Name: {name}</p>
          {address && city && zip && <p>Address: {address}, {city}, {zip}</p>}
          {country && <p>Country: {country}</p>}
          <p>Booked On: {bookedOn}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default YourDetailsCard;