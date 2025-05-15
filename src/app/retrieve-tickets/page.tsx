"use client";
import React, { useState } from "react";
import { Container } from "@/app/components/shared/container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export default function RetrieveTicketsPage() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Name:", name, "Code:", code);
  };

  return (
    <Container className="py-16 sm:py-24 flex flex-col items-center">
      <div className="text-center mb-12">
        <h1 className="text-2xl font-semibold text-black">
          Retrieve your tickets.
        </h1>
      </div>

      <Card className="w-full max-w-md border-2 border-black rounded-none shadow-none p-2">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label
                htmlFor="name"
                className="text-sm font-medium text-black block mb-1 text-left"
              >
                Name
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border-2 border-black rounded-none h-10 px-3 text-sm"
                required
              />
            </div>
            <div>
              <Label
                htmlFor="code"
                className="text-sm font-medium text-black block mb-1 text-left"
              >
                Code
              </Label>
              <Input
                id="code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full border-2 border-black rounded-none h-10 px-3 text-sm"
                required
              />
            </div>
            <div className="flex justify-center pt-2">
              <Button
                type="submit"
                variant="outline"
                className="border-2 border-black rounded-md text-black px-8 py-2 text-sm h-auto"
              >
                Get Ticket
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}
