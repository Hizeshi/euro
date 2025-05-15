import { cn } from "@/lib/utils";
import { useRowsStore } from "@/stores/rows";
interface Props {
  className: string;
}
export const PlaceShow: React.FC<Props> = ({ className }) => {
  const SeatCircle = ({
    isPink,
    isSelected,
    seat,
  }: {
    isPink?: boolean;
    isSelected: boolean;
    seat: number;
  }) => (
    <div
      data-seat={seat}
      className={cn(
        "w-6 h-6 rounded-full border flex-shrink-0 bg-white border-gray-400",
        isPink && "bg-rose-200 border-rose-400",
        isSelected && "bg-green-300 border-green-500",
        "transition-all duration-200 ease-in-out hover:bg-green-300 hover:border-green-500 hover:scale-110"
      )}
    ></div>
  );

  const SeatStaticRow = ({
    id,
    label,
    seatsCount,
    pinkIndices = [],
  }: {
    id: number;
    label: string;
    seatsCount: number;
    pinkIndices?: number[];
  }) => (
    <div className="flex items-center space-x-3 mb-2" data-row-id={id}>
      <div className="w-24 text-sm text-gray-700 text-right shrink-0 pr-1">
        {label}
      </div>
      <div className="flex flex-nowrap space-x-1.5">
        {Array.from({ length: seatsCount }).map((_, i) => (
          <SeatCircle
            seat={i + 1}
            key={i}
            isSelected={false}
            isPink={pinkIndices.includes(i)}
          />
        ))}
      </div>
    </div>
  );

  const rows = useRowsStore((state) => state.rows);
  const handleClickSeat = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const seat = target.dataset.seat;
    if (!seat) return;
    const rowId = (target.closest("[data-row-id]") as HTMLDivElement | null)
      ?.dataset.rowId;
    if (!rowId || target.classList.contains("bg-rose-200")) return;

    console.log(`Row: ${rowId}, Seat: ${seat}`);
  };

  return (
    <div className="lg:col-span-2">
      <div className="p-6 border rounded-4xl bg-white shadow-md border-gray-950">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 border border-green-300 text-gray-800 py-2 px-20 text-center text-base font-medium">
            Stage
          </div>
        </div>

        <div
          onClick={handleClickSeat}
          className="space-y-0.5 overflow-x-auto pb-3"
        >
          {rows.map((row, index) => (
            <SeatStaticRow
              key={row.id}
              id={row.id}
              label={row.name}
              seatsCount={row.seats.total}
              pinkIndices={row.seats.unavailable}
            />
          ))}
        </div>
      </div>
    </div>
  );
};