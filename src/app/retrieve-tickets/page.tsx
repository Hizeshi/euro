// src/app/retrieve-tickets/page.tsx

"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Container } from "@/app/components/shared/container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Api } from "@/services/api";
import { toast } from "sonner";
import { TicketDisplayCard } from "../tickets/components/TicketDisplayCard";
import YourDetailsCard from "../tickets/components/YourDetailsCard";
import { Ticket as TicketType } from "@/services/tickets";

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

const formatTimeHhMm = (dateString: string) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Time";
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  } catch (e) {
    return "Invalid Time";
  }
};

export default function RetrieveTicketsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingDetailsFromQuery, setBookingDetailsFromQuery] = useState<any>(null);


  useEffect(() => {
    const ticketsData = searchParams.get("tickets");
    const detailsData = searchParams.get("details");

    if (ticketsData) {
      try {
        const parsedTickets: TicketType[] = JSON.parse(decodeURIComponent(ticketsData));
        if (parsedTickets && parsedTickets.length > 0) {
          setTickets(parsedTickets);
          if (parsedTickets[0]?.name) {
             setName(parsedTickets[0].name); 
          }
           if (detailsData) {
            const parsedDetails = JSON.parse(decodeURIComponent(detailsData));
            setBookingDetailsFromQuery(parsedDetails);
          }
        }
      } catch (e) {
        console.error("Failed to parse tickets/details from query params", e);
        toast.error("Could not load booked tickets information.");
      }
    }
  }, [searchParams]);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    if (!name.trim() || !code.trim()) {
      setError("Name and Code are required.");
      if(!name.trim()) document.getElementById("name")?.classList.add("border-destructive");
      if(!code.trim()) document.getElementById("code")?.classList.add("border-destructive");
      return;
    }
    document.getElementById("name")?.classList.remove("border-destructive");
    document.getElementById("code")?.classList.remove("border-destructive");

    setIsLoading(true);
    try {
      const retrievedTickets = await Api.tickets.getTickets(code, name);
      if (retrievedTickets.length === 0) {
        setError("Could not find tickets with these details.");
        setTickets([]);
      } else {
        setTickets(retrievedTickets);
        setBookingDetailsFromQuery(null);
        setError(null);
      }
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
         setError("Could not find tickets with these details.");
      } else {
         setError("An error occurred while retrieving tickets.");
         toast.error(err.message || "Failed to retrieve tickets.");
      }
      setTickets([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelTicket = async (ticketId: number) => {
    const ticketToCancel = tickets.find(t => t.id === ticketId);
    if (!ticketToCancel) return;

    const cancelName = name || ticketToCancel.name; 
    const cancelCode = ticketToCancel.code;

    if (!window.confirm("Are you sure you want to cancel this ticket?")) {
      return;
    }
    setIsLoading(true);
    try {
      await Api.tickets.cancelTicket(ticketId, cancelCode, cancelName);
      toast.success("Ticket cancelled successfully.");
      const updatedTickets = tickets.filter((ticket) => ticket.id !== ticketId);
      setTickets(updatedTickets);
      if (updatedTickets.length === 0) {
        toast.info("All tickets have been cancelled. Redirecting to homepage.");
        router.push("/");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to cancel ticket.");
    } finally {
      setIsLoading(false);
    }
  };

  const currentBookingDetails = bookingDetailsFromQuery || (tickets.length > 0 ? {
    name: tickets[0].name,
    address: tickets[0]?.address || undefined,
    city: tickets[0]?.city || undefined,
    zip: tickets[0]?.zip || undefined,
    country: tickets[0]?.country || undefined,
    bookedOn: formatDateDdMmYyyy(tickets[0].created_at),
  } : null);


  return (
    <Container className="py-16 sm:py-24 flex flex-col items-center">
      <div className="text-center mb-12">
        <h1 className="text-2xl font-semibold text-black">
          {tickets.length > 0 ? "Your Tickets are ready!" : "Retrieve your tickets."}
        </h1>
      </div>

      {tickets.length === 0 ? (
        <Card className="w-full max-w-md border-2 border-black rounded-none shadow-none p-2">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-black block mb-1 text-left">
                  Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if(e.target.value.trim()) e.target.classList.remove("border-destructive");
                  }}
                  className="w-full border-2 border-black rounded-none h-10 px-3 text-sm"
                />
              </div>
              <div>
                <Label htmlFor="code" className="text-sm font-medium text-black block mb-1 text-left">
                  Code (from one of your tickets)
                </Label>
                <Input
                  id="code"
                  type="text"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                     if(e.target.value.trim()) e.target.classList.remove("border-destructive");
                  }}
                  className="w-full border-2 border-black rounded-none h-10 px-3 text-sm"
                />
              </div>
              {error && (
                <p className="text-sm text-destructive text-center">{error}</p>
              )}
              <div className="flex justify-center pt-2">
                <Button
                  type="submit"
                  variant="outline"
                  className="border-2 border-black rounded-md text-black px-8 py-2 text-sm h-auto"
                  disabled={isLoading}
                >
                  {isLoading ? "Searching..." : "Get Tickets"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <div className="max-w-3xl mx-auto w-full">
          {currentBookingDetails && <YourDetailsCard {...currentBookingDetails} />}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tickets.map((ticket) => ( 
              <TicketDisplayCard
                key={ticket.id}
                ticketId={ticket.id}
                name={ticket.name} 
                rowName={ticket.row.name} 
                seat={ticket.seat} 
                code={ticket.code} 
                artist={ticket.show.concert.artist} 
                location={ticket.show.concert.location.name}
                date={formatDateDdMmYyyy(ticket.show.start)} 
                time={`${formatTimeHhMm(ticket.show.start)} - ${formatTimeHhMm(ticket.show.end)}`} 
                onCancel={handleCancelTicket} 
                isLoading={isLoading} 
              />
            ))}
          </div>
        </div>
      )}
    </Container>
  );
};