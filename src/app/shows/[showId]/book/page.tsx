// src/app/shows/[showId]/book/page.tsx

"use client";
import { useEffect, useState, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import { PlaceShow } from "./components/placeshow";
import { SelectedPlaces } from "./components/selectedplaces";
import { Container } from "@/app/components/shared/container";
import { Title } from "@/app/components/shared/title";
import { InputDetails } from "./components/inputdetails";
import { Booking as BookingDisclaimer } from "./components/booking";
import { ShowCard } from "@/app/components/shared/show-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UseShowsStore } from "@/stores/shows";
import { useRowsStore } from "@/stores/rows";
import { useReservationStore } from "@/stores/reservation";
import { Api } from "@/services/api";
import { toast } from "sonner";
import { Ticket } from "@/services/tickets";
import { countries } from "@/lib/countries";


const getCountryNameByCode = (code: string) => {
    const country = countries.find(c => c.code === code);
    return country ? country.name : code;
};
const formatDateDdMmYyyy = (dateString: string) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  } catch (e) {
    return "Invalid Date";
  }
};

function BookShowPageComponent() {
  const { getShowById, isLoading: showsLoadingInitial } = UseShowsStore();
  const { fetchRows, isLoading: rowsLoading } = useRowsStore();
  const { reservationToken, clearReservation, selectedSeats, reservedUntil } = useReservationStore();
  const params = useParams<{ showId: string }>();
  const router = useRouter();
  
  const [isBookingDetailsActive, setIsBookingDetailsActive] = useState(false);
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);

  const showIdNumber = Number(params.showId);
  const show = UseShowsStore.getState()._shows.find(s => s.id === showIdNumber);


  useEffect(() => {
    return () => {
      clearReservation();
    };
  }, [clearReservation, showIdNumber]);

  useEffect(() => {
    if (show?.concertId && show?.id) {
      fetchRows(show.concertId, show.id);
    }
  }, [fetchRows, show?.concertId, show?.id]);

  useEffect(() => {
    if (isBookingDetailsActive && selectedSeats.length === 0 && !reservedUntil) {
        setIsBookingDetailsActive(false);
    }
  }, [isBookingDetailsActive, selectedSeats, reservedUntil]);


  if (showsLoadingInitial && !show) { 
    return (
      <Container className="py-8 text-center">
        <p>Loading show information...</p>
      </Container>
    );
  }

  if (!show) {
    return (
      <Container className="py-8 text-center">
        <Title className="mb-4">Show not found</Title>
        <p>The show you are looking for does not exist or is no longer available.</p>
        <Button onClick={() => router.push('/')} className="mt-4">Go to Homepage</Button>
      </Container>
    );
  }


  const handleBookingSubmit = async (formData: {
    name: string;
    address: string;
    city: string;
    zip: string;
    country: string;
  }) => {
    if (!reservationToken) {
      toast.error("Reservation token is missing. Please select your seats again.");
      setIsBookingDetailsActive(false); 
      clearReservation();
      return;
    }
    if (selectedSeats.length === 0) {
        toast.error("No seats selected. Your reservation might have expired.");
        setIsBookingDetailsActive(false);
        clearReservation();
        return;
    }

    setIsSubmittingBooking(true);
    try {
      const bookingPayload = {
        ...formData,
        reservation_token: reservationToken,
        country: getCountryNameByCode(formData.country),
      };

      const response = await Api.booking.create(show.concertId, show.id, bookingPayload);
      
      toast.success("Booking successful! Redirecting to your tickets...");
      
      const bookingDetailsForTicketPage = {
        name: formData.name,
        address: formData.address,
        city: formData.city,
        zip: formData.zip,
        country: getCountryNameByCode(formData.country),
        bookedOn: formatDateDdMmYyyy(new Date().toISOString()),
      };

      clearReservation(); 
      const ticketsQueryParam = encodeURIComponent(JSON.stringify(response.tickets));
      const detailsQueryParam = encodeURIComponent(JSON.stringify(bookingDetailsForTicketPage));
      router.push(`/retrieve-tickets?tickets=${ticketsQueryParam}&details=${detailsQueryParam}`);

    } catch (error: any) {
      toast.error(error.message || "Failed to book tickets. Please try again.");
      if (error.message.includes("Unauthorized") || error.message.includes("Invalid reservation token")) {
        setIsBookingDetailsActive(false); 
        clearReservation();
      }
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  const handleProceedToDetails = () => {
    if (selectedSeats.length === 0) {
        toast.error("Please select at least one seat.");
        return;
    }
    if (!reservedUntil) {
        toast.error("Your reservation is not confirmed or has expired. Please select seats again.");
        return;
    }
    setIsBookingDetailsActive(true);
  }

  return (
    <Container className="py-8">
      <Title className="mb-4">Book seats for your show</Title>
      <ShowCard show={show} className="max-w-xs mx-auto mb-8" />
      
      {!isBookingDetailsActive ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <PlaceShow 
            concertId={show.concertId} 
            showId={show.id} 
            className="" 
            isBookingActive={isBookingDetailsActive} 
          />
          <SelectedPlaces 
            className="" 
            showId={params.showId} 
            onProceedToDetails={handleProceedToDetails}
            isBookingActive={isBookingDetailsActive}
          />
        </div>
      ) : (
        <div className="mt-6">
            <Card className="border border-gray-300 p-4 sm:p-6 shadow-lg rounded-lg">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
                    <h2 className="text-xl font-semibold">Please enter your details</h2>
                    <Button 
                        variant="outline" 
                        onClick={() => setIsBookingDetailsActive(false)}
                        disabled={isSubmittingBooking}
                        className="w-full sm:w-auto"
                    >
                        Change Seats
                    </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 lg:gap-8">
                    <div className="md:border-r md:border-gray-300 md:pr-6 lg:pr-8">
                        <InputDetails 
                            className="" 
                            onSubmit={handleBookingSubmit} 
                            isLoading={isSubmittingBooking} 
                        />
                    </div>
                    <div className="flex flex-col">
                        <div className="mb-6">
                             <SelectedPlaces 
                                className="" 
                                showId={params.showId} 
                                onProceedToDetails={() => {}}
                                isBookingActive={isBookingDetailsActive}
                            />
                        </div>
                        <BookingDisclaimer className="mt-auto" showId={params.showId} />
                    </div>
                </div>
            </Card>
        </div>
      )}
    </Container>
  );
}

export default function BookShowPage() {
  return (
    <Suspense fallback={<Container className="py-8 text-center"><p>Loading booking page...</p></Container>}>
        <BookShowPageComponent />
    </Suspense>
  )
}