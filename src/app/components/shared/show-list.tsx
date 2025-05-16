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
    <div className={cn("mt-6", className)}>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-[200px] w-full" />
          ))}
        </div>
      ) : shows.length === 0 ? (
        <p className="text-center text-muted-foreground mt-10">
          No shows are matching the current filter criteria.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {shows.map((show) => (
            <Link key={show.id} href={`shows/${show.id}/book`}>
              <ShowCard show={show} className="h-full"/>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};