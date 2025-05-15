import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  className: string;
  showId: string;
}

export const Booking: React.FC<Props> = ({ className, showId }) => {
  return (
    <div className="w-2/3 flex flex-col justify-between">
      <div className="text-sm text-gray-950 space-y-2 mt-4">
        <p>
          By clicking "Book" you accept that you are not actually booking a
          ticket as this is a test project and not a real website.
        </p>
      </div>
      <div className="flex items-center space-x-4 mt-6">
        <Button className="bg-[#f5f5f5] text-black border border-gray-950 rounded-none px-5 py-2 hover:bg-[#f5f5f5]">
          Your ticket will be available
          <br /> immediately after booking.
        </Button>
        <Button className="bg-white text-black border border-gray-950 rounded px-8 py-2 hover:bg-white">
          <Link href="/tickets">Book</Link>
        </Button>
      </div>
    </div>
  );
};
