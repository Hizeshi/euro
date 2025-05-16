// src/app/components/shared/loader-shows.tsx
"use client";
import { UseShowsStore } from "@/stores/shows";
import { useEffect } from "react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { cn } from "@/lib/utils"; 

interface Props {
  children?: React.ReactNode;
  className?: string;
}

export const LoaderShows: React.FC<Props> = ({ className, children }) => {
  const { fetchShows, isLoading } = UseShowsStore();
  useEffect(() => {
    fetchShows();
  }, [fetchShows]);
  return (
    <div className={cn("flex justify-center items-center min-h-[calc(100vh-100px)]", className)}>
      {isLoading ? <ClimbingBoxLoader color="#22a4f1" /> : children}
    </div>
  );
};