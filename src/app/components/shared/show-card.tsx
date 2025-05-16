// src/app/components/shared/show-card.tsx
import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Show } from "@/@types/show";

interface Props {
  className?: string;
  show: Show;
}

export const ShowCard: React.FC<Props> = ({ className, show }) => {
  return (
    <Card className={cn("text-center", className)}>
      <CardContent className="text-center pt-6">
        <p> {show.date} </p>
        <CardTitle className="text-xl my-2"> {show.artist} </CardTitle>
        <p className="text-sm"> {show.location} </p>
        <p className="text-sm mt-8">
          {show.start} - {show.end}
        </p>
      </CardContent>
    </Card>
  );
};