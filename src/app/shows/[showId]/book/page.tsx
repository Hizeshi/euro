// src/app/shows/[showId]/book/page.tsx

"use client";
import { PlaceShow } from "./components/placeshow";
import { SelectedPlaces } from "./components/selectedplaces";
import { Container } from "@/app/components/shared/container";
import { Title } from "@/app/components/shared/title";
import { InputDetails } from "./components/inputdetails";
import { Booking } from "./components/booking";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ShowCard } from "@/app/components/shared/show-card";
import { UseShowsStore } from "@/stores/shows";
import { useRowsStore } from "@/stores/rows";
import { Toaster } from "@/components/ui/sonner";


export default function BookShowPage() {
  const { getShowById } = UseShowsStore();
  const { fetchRows } = useRowsStore();
  const params = useParams<{ showId: string }>();
  const [isBooking, setBooking] = useState(false);
  const show = getShowById(Number(params.showId));
  if (!show) {
    return <div>Show not found</div>;
  }
  useEffect(() => {
    fetchRows(show.concertId, show.id);
  }, []);

  return (
    <Container className="py-8">
      <Title className="mb-4">Book seats for your show</Title>
      <ShowCard show={show} className="max-w-60 m-auto mb-4"></ShowCard>
      {!isBooking ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <PlaceShow consertId={show.concertId} showId={show.id} className="" />
          <SelectedPlaces className="" showId={params.showId} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 mt-6">
          <SelectedPlaces className="" showId={params.showId} />
          <div className="border border-gray-950 p-4 shadow-sm">
            <h2 className="text-lg font-medium mb-4">
              Please enter your details
            </h2>
            <div className="flex gap-4">
              <InputDetails className="" />
              <div className="border-l border-gray-950 self-stretch"></div>
              <Booking className="" showId={params.showId} />
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}
