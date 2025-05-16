// src/app/components/shared/header.tsx

import { Button } from "@/components/ui/button";
import { Container } from "./container";
import Link from "next/link";
import React from "react";

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ }) => {
  return (
    <div className="bg-indigo-300 text-white">
      <Container className="flex justify-between p-2 items-center">
        <div>
          <Link href="/" className="text-2xl font-semibold">
            EuroSkills Concerts
          </Link>
        </div>
        <div>
          <span className="me-2">Already booked?</span>
          <Button asChild>
            <Link href="/retrieve-tickets">Get Tickets</Link>
          </Button>
        </div>
      </Container>
    </div>
  );
};
