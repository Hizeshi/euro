// src/app/components/shared/show-list.tsx

"use client";
import React from "react";
import { ShowCard } from "./show-card";
import { cn } from "@/lib/utils";
import { UseShowsStore } from "@/stores/shows";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

interface Props {
  className?: string;
}

export const ShowList: React.FC<Props> = ({ className }) => {
  const { shows, isLoading } = UseShowsStore();

  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6",
        className
      )}
    >
      {isLoading
        ? Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-[250px] w-[250px]" />
          ))
        : shows.map((show) => (
            <Link key={show.id} href={`shows/${show.id}/book`}>
              <ShowCard show={show} />
            </Link>
          ))}
    </div>
  );
};
