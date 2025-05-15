import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  className: string;
}

export const InputDetails: React.FC<Props> = ({ className }) => {
  return (
    <div className="w-full space-y-4">
      <div>
        <Label htmlFor="name" className="block mb-1">
          Name
        </Label>
        <Input type="text" id="name" className="border-gray-950 rounded-none" />
      </div>
      <div>
        <Label htmlFor="address" className="block mb-1">
          Address
        </Label>
        <Input
          type="text"
          id="address"
          className="border-gray-950 rounded-none"
        />
      </div>
      <div className="flex gap-3">
        <div className="w-1/3">
          <Label htmlFor="zip" className="block mb-1">
            ZIP Code
          </Label>
          <Input
            type="text"
            id="zip"
            className="border-gray-950 rounded-none"
          />
        </div>
        <div className="flex-grow">
          <Label htmlFor="city" className="block mb-1">
            City
          </Label>
          <Input
            type="text"
            id="city"
            className="border-gray-950 rounded-none"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="country" className="block mb-1">
          Country
        </Label>
        <Select>
          <SelectTrigger
            id="country"
            className="border-gray-950 rounded-none bg-white w-full"
          >
            <SelectValue placeholder="Select a country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="ca">Canada</SelectItem>
            <SelectItem value="uk">United Kingdom</SelectItem>
            <SelectItem value="au">Australia</SelectItem>
            <SelectItem value="de">Germany</SelectItem>
            <SelectItem value="fr">France</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
