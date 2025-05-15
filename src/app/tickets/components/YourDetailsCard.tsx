// src/app/tickets/components/YourDetailsCard.tsx

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const YourDetailsCard: React.FC = () => (
  <Card className="border-2 border-black text-black shadow-none rounded-none mb-10 max-w-lg mx-auto">
    <CardHeader className="pt-6 pb-2 px-6">
      <CardTitle className="text-lg font-semibold">Your Details</CardTitle>
    </CardHeader>
    <CardContent className="px-6 pt-4 pb-6 flex justify-between">
      <div>
        <p className="text-sm text-black">Name</p>
        <p className="text-sm mt-1">xxxx xxxx</p>
      </div>
      <div className="text-left">
        <p className="text-sm text-black">Booked on</p>
        <p className="text-sm mt-1">dd/mm/yyyy</p>
      </div>
    </CardContent>
  </Card>
);
