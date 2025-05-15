import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  className: string;
  showId: string;
}

export const SelectedPlaces: React.FC<Props> = ({ showId }) => {
  const detailsPageUrl = `/shows/${showId}/book/details`;

  return (
    <div className="lg:col-span-1">
      <Card className="shadow-lg border border-gray-950 rounded-none h-96">
        <CardHeader className="pt-6 pb-4 px-6">
          <CardTitle className="text-xl font-semibold">
            Selected seats
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 pb-6 px-6">
          <ul className="space-y-1.5 text-sm text-gray-700 mb-8 text-center">
            <li>Row: Stall 03, Seat: 6</li>
            <li>Row: Stall 03, Seat: 7</li>
          </ul>
          <p className="text-sm text-black font-medium text-center">
            Your seats expire in 02:35
          </p>
        </CardContent>
        <CardFooter className="px-6 pb-6 pt-2 flex justify-center">
          
            <Button
              asChild
              variant="outline"
              className="px-4 py-1 text-xs border border-gray-950 h-auto whitespace-pre-line text-center leading-tight rounded-md"
            >
              <Link href={detailsPageUrl}>{"Enter Booking\nDetails"}</Link>
            </Button>
          
        </CardFooter>
      </Card>
    </div>
  );
};
