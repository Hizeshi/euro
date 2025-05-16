// src/app/shows/[showId]/book/components/inputdetails.tsx

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { countries } from "@/lib/countries";

interface Props {
  className?: string;
  onSubmit: (data: { name: string; address: string; city: string; zip: string; country: string }) => void;
  isLoading?: boolean;
}

const focusInput = (id: string) => {
  const input = document.getElementById(id) as HTMLInputElement;
  if (input) input.focus();
};

export const InputDetails: React.FC<Props> = ({ className, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    zip: "",
    country: "",
  });
  const [errors, setErrors] = useState({
    name: false,
    address: false,
    city: false,
    zip: false,
    country: false,
  });

  const validateAndSetError = (field: keyof typeof formData, value: string) => {
    const trimmedValue = value.trim();
    const isError = !trimmedValue;
    setErrors((prev) => ({ ...prev, [field]: isError }));
    const inputElement = document.getElementById(field);
    if (inputElement) {
        if (isError) {
            inputElement.classList.add("border-destructive");
        } else {
            inputElement.classList.remove("border-destructive");
        }
    }
    return isError;
  }

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field !== "country") {
      validateAndSetError(field, value);
    } else {
      const isError = !value;
      setErrors((prev) => ({...prev, country: isError}));
      const triggerElement = document.getElementById("country-trigger");
      if (triggerElement) {
        if (isError) triggerElement.classList.add("border-destructive");
        else triggerElement.classList.remove("border-destructive");
      }
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      name: !formData.name.trim(),
      address: !formData.address.trim(),
      city: !formData.city.trim(),
      zip: !formData.zip.trim(),
      country: !formData.country,
    };
    setErrors(newErrors);

    Object.keys(newErrors).forEach(key => {
        const fieldKey = key as keyof typeof newErrors;
        const inputElement = document.getElementById(fieldKey === 'country' ? 'country-trigger' : fieldKey);
        if (inputElement) {
            if (newErrors[fieldKey]) {
                inputElement.classList.add("border-destructive");
            } else {
                inputElement.classList.remove("border-destructive");
            }
        }
    });

    if (Object.values(newErrors).every((error) => !error)) {
      onSubmit(formData);
    }
  };


  return (
    <form onSubmit={handleSubmit} className={cn("w-full space-y-4", className)}>
      <div>
        <Label htmlFor="name" className="block mb-1 cursor-pointer" onClick={() => focusInput("name")}>
          Name
        </Label>
        <Input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className={cn("border-gray-950 rounded-none", errors.name && "border-destructive")}
        />
      </div>
      <div>
        <Label htmlFor="address" className="block mb-1 cursor-pointer" onClick={() => focusInput("address")}>
          Address
        </Label>
        <Input
          type="text"
          id="address"
          value={formData.address}
          onChange={(e) => handleChange("address", e.target.value)}
          className={cn("border-gray-950 rounded-none", errors.address && "border-destructive")}
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="w-full sm:w-1/3">
          <Label htmlFor="zip" className="block mb-1 cursor-pointer" onClick={() => focusInput("zip")}>
            ZIP Code
          </Label>
          <Input
            type="text"
            id="zip"
            value={formData.zip}
            onChange={(e) => handleChange("zip", e.target.value)}
            className={cn("border-gray-950 rounded-none", errors.zip && "border-destructive")}
          />
        </div>
        <div className="flex-grow">
          <Label htmlFor="city" className="block mb-1 cursor-pointer" onClick={() => focusInput("city")}>
            City
          </Label>
          <Input
            type="text"
            id="city"
            value={formData.city}
            onChange={(e) => handleChange("city", e.target.value)}
            className={cn("border-gray-950 rounded-none", errors.city && "border-destructive")}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="country-trigger" className="block mb-1 cursor-pointer">
          Country
        </Label>
        <Select
          value={formData.country}
          onValueChange={(value) => handleChange("country", value)}
        >
          <SelectTrigger
            id="country-trigger"
            className={cn(
              "border-gray-950 rounded-none bg-white w-full",
              errors.country && "border-destructive"
            )}
          >
            <SelectValue placeholder="Select a country" />
          </SelectTrigger>
          <SelectContent>
          {countries.map((country) => (
            <SelectItem key={country.code} value={country.code} className="cursor-pointer">
              {country.name}
            </SelectItem>
          ))}
          </SelectContent>
        </Select>
      </div>
      <Button 
        type="submit" 
        className="mt-6 w-full sm:w-auto bg-black text-white hover:bg-gray-800 rounded-md px-10 py-2.5"
        disabled={isLoading}
      >
        {isLoading ? "Booking..." : "Book"}
      </Button>
    </form>
  );
};