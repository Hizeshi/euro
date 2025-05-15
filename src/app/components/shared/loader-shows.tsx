// src/app/components/shared/loader-shows.tsx

"use client";
import { UseShowsStore } from "@/stores/shows";
import { useEffect } from "react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

interface Props {
  children?: React.ReactNode;
  className?: string;
}

export const LoaderShows: React.FC<Props> = ({ className, children }) => {
  const { fetchShows, isLoading } = UseShowsStore();
  useEffect(() => {
    fetchShows();
  }, []);
  return (
    <div className="flex justify-center items-center h-screen">
      {isLoading ? <ClimbingBoxLoader color="#22a4f1" /> : children}
    </div>
  );
};
