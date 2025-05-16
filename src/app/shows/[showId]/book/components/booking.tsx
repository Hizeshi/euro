// src/app/shows/[showId]/book/components/booking.tsx
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; 

interface Props {
  className?: string;
  showId: string;
}

export const Booking: React.FC<Props> = ({ className, showId }) => {
  return (
    <div className={cn("w-full md:w-2/3 flex flex-col justify-between", className)}> {/* Сделал w-full для мобилок, md:w-2/3 */}
      <div className="text-sm text-gray-950 space-y-2 mt-4">
        <p>
          By clicking "Book" you accept that you are not actually booking a
          ticket as this is a test project and not a real website.
        </p>
      </div>
      <div className="flex items-center space-x-4 mt-6">
        <Button 
            variant="outline"
            className="border-gray-950 rounded-none px-5 py-2 text-left text-xs sm:text-sm w-full" // Сделал текст меньше и адаптировал ширину
            disabled 
        >
          Your ticket will be available
          <br /> immediately after booking.
        </Button>
      </div>
    </div>
  );
};