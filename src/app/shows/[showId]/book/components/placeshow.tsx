// src/app/shows/[showId]/book/components/placeshow.tsx
import { cn } from "@/lib/utils";
import { useReservationStore } from "@/stores/reservation";
import { useRowsStore } from "@/stores/rows";
import { toast } from "sonner";
import React from "react";

interface Props {
  className?: string;
  concertId: number;
  showId: number;
  isBookingActive: boolean;
}

export const PlaceShow: React.FC<Props> = ({ className, concertId, showId, isBookingActive }) => {
  const SeatCircle = ({
    isUnavailable,
    isSelected,
    seat,
    rowName, 
    rowId,
  }: {
    isUnavailable?: boolean;
    isSelected: boolean;
    seat: number;
    rowName: string;
    rowId: number;
  }) => (
    <button
      type="button"
      data-seat={seat}
      data-row-id={rowId}
      aria-label={`Row ${rowName}, Seat ${seat} ${isUnavailable ? '(Unavailable)' : isSelected ? '(Selected)' : '(Available)'}`}
      className={cn(
        "w-6 h-6 rounded-full border flex-shrink-0 bg-white border-gray-400 cursor-pointer",
        "transition-all duration-200 ease-in-out",
        isUnavailable && "bg-rose-200 border-rose-400 cursor-not-allowed",
        isSelected && !isUnavailable && "bg-green-300 border-green-500 hover:bg-green-400 hover:border-green-600",
        !isSelected && !isUnavailable && "hover:bg-green-200 hover:border-green-400 hover:scale-110",
        isBookingActive && !isUnavailable && !isSelected && "opacity-50 cursor-default"
      )}
      disabled={isUnavailable || (isBookingActive && !isSelected)}
    >
      <span className="sr-only">{seat}</span>
    </button>
  );

  const SeatStaticRow = ({
    row,
    selectedSeatsInRow,
  }: {
    row: {
      id: number;
      name: string;
      seats: {
        total: number;
        unavailable: number[];
      };
    };
    selectedSeatsInRow: number[];
  }) => (
    <div className="flex items-center space-x-3 mb-2">
      <div className="w-24 text-sm text-gray-700 text-right shrink-0 pr-1">
        {row.name}
      </div>
      <div className="flex flex-nowrap space-x-1.5">
        {Array.from({ length: row.seats.total }).map((_, i) => {
          const seatNumber = i + 1;
          return (
            <SeatCircle
              key={`${row.id}-${seatNumber}`}
              seat={seatNumber}
              rowId={row.id}
              rowName={row.name} 
              isSelected={selectedSeatsInRow.includes(seatNumber)}
              isUnavailable={row.seats.unavailable.includes(seatNumber)}
            />
          );
        })}
      </div>
    </div>
  );

  const { rows, isLoading: rowsLoading, error: rowsError } = useRowsStore();
  const { selectedSeats, addSelectedSeat, removeSelectedSeat, reservation, isLoading: reservationLoading } =
    useReservationStore();

  const handleClickSeat = async (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const seatButton = target.closest('button[data-seat]') as HTMLButtonElement | null;
    
    if (!seatButton || seatButton.disabled) return;

    const seatStr = seatButton.dataset.seat;
    const rowIdStr = seatButton.dataset.rowId;

    if (!seatStr || !rowIdStr) return;

    const seat = Number(seatStr);
    const rowId = Number(rowIdStr);

    const isCurrentlySelected = selectedSeats.some(s => s.row === rowId && s.seat === seat);

    if (isCurrentlySelected) {
      removeSelectedSeat(rowId, seat);
    } else {
      addSelectedSeat(rowId, seat);
    }

    try {
      await reservation(concertId, showId); 
    } catch (error: any) {
      if (isCurrentlySelected) {
        addSelectedSeat(rowId, seat);
      } else {
        removeSelectedSeat(rowId, seat);
      }
      toast.error(error.message || "Failed to update reservation. Please try again.");
    }
  };

  return (
    <div className={cn("lg:col-span-2", className)}>
      <div className="p-6 border rounded-lg bg-white shadow-md border-gray-300">
        <div className="flex justify-center mb-6">
          <div className="bg-gray-200 border border-gray-400 text-gray-800 py-2 px-20 text-center text-base font-medium rounded">
            Stage
          </div>
        </div>

        <div
          onClick={handleClickSeat}
          className={cn("space-y-0.5 overflow-x-auto pb-3", (reservationLoading || rowsLoading) && "opacity-50 pointer-events-none")}
        >
          {rowsLoading && <p className="text-center text-muted-foreground">Loading seating plan...</p>}
          {rowsError && <p className="text-center text-destructive">{rowsError}</p>}
          {!rowsLoading && !rowsError && rows.length === 0 && (
            <p className="text-center text-muted-foreground">No seating information available for this show.</p>
          )}
          {!rowsLoading && !rowsError && rows.map((row) => {
            const selectedInThisRow = selectedSeats
              .filter(s => s.row === row.id)
              .map(s => s.seat);
            return (
              <SeatStaticRow
                key={row.id}
                row={row}
                selectedSeatsInRow={selectedInThisRow}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};