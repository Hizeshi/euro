import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  className: string;
}

export const ArtistCard: React.FC<Props> = ({ className }) => {
  return (
    <div className="flex justify-center mb-10">
      <Card className="w-[280px] rounded-3xl border border-gray-950 shadow-md">
        <CardHeader className="items-center text-center pt-6 pb-0 px-6">
          <p className="text-xs text-gray-500 uppercase tracking-wider">Date</p>
          <CardTitle className="text-3xl font-semibold mt-1">Artist</CardTitle>
          <p className="text-base text-gray-600 mt-1">Location</p>
        </CardHeader>
        <CardContent className="text-center pt-8 pb-6 px-6">
          <p className="text-base text-gray-500">Start - End</p>
        </CardContent>
      </Card>
    </div>
  );
};
