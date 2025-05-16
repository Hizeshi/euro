// src/app/shows/[showId]/book/components/selectedplaces.tsx
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useReservationStore } from "@/stores/reservation";
import { useRowsStore } from "@/stores/rows";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  showId: string; 
  onProceedToDetails: () => void;
  isBookingActive: boolean;
}

export const SelectedPlaces: React.FC<Props> = ({ className, showId, onProceedToDetails, isBookingActive }) => {
  const { selectedSeats, reservedUntil, clearReservation, isLoading: reservationLoading } = useReservationStore();
  const { rows, isLoading: rowsLoading } = useRowsStore(); 
  const [timeLeft, setTimeLeft] = useState<string | null>(null);

  useEffect(() => {
    if (!reservedUntil) {
      setTimeLeft(null);
      return;
    }

    const interval = setInterval(() => {
      const now = new Date();
      const reservedUntilDate = new Date(reservedUntil);
      const diff = reservedUntilDate.getTime() - now.getTime();

      if (diff <= 0) {
        if (document.visibilityState === 'visible') {
             toast.error("Your seat reservation expired. The reservation has been cancelled.");
        }
        clearReservation();
        setTimeLeft(null);
        clearInterval(interval);
        return;
      }

      const minutes = Math.floor(diff / 1000 / 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft(`${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [reservedUntil, clearReservation]);

  const getRowName = (rowId: number) => {
    if (rowsLoading) return `Row ID ${rowId}`; 
    const row = rows.find(r => r.id === rowId);
    return row ? row.name : `Row ID ${rowId}`;
  };

  return (
    <div className={cn("lg:col-span-1", className)}>
      <Card className="shadow-lg border border-gray-300 rounded-lg h-auto min-h-[24rem] flex flex-col">
        <CardHeader className="pt-6 pb-4 px-6">
          <CardTitle className="text-xl font-semibold">Selected seats</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 pb-6 px-6 flex-grow">
          {selectedSeats.length === 0 ? (
            <p className="text-sm text-gray-700 text-center">
              No seats selected. Click on a seat to make a reservation.
            </p>
          ) : (
            <>
              <ul className="space-y-1.5 text-sm text-gray-700 mb-8 text-center">
                {selectedSeats.map((seat, index) => (
                  <li key={`${seat.row}-${seat.seat}-${index}`}> {}
                    Row: {getRowName(seat.row)}, Seat: {seat.seat}
                  </li>
                ))}
              </ul>
              {timeLeft && (
                <p className="text-sm text-black font-medium text-center">
                  Your seats expire in {timeLeft}
                </p>
              )}
              {reservationLoading && !timeLeft && (
                 <p className="text-sm text-black font-medium text-center">Updating reservation...</p>
              )}
            </>
          )}
        </CardContent>
        <CardFooter className="px-6 pb-6 pt-2 flex justify-center">
          {selectedSeats.length > 0 && !isBookingActive && (
            <Button
              onClick={onProceedToDetails}
              variant="outline"
              className="px-4 py-1 text-xs border border-gray-950 h-auto whitespace-pre-line text-center leading-tight rounded-md"
              disabled={reservationLoading || !reservedUntil}
            >
              {"Enter Booking\nDetails"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};