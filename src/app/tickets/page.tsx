import { Container } from "@/app/components/shared/container";
import { YourDetailsCard } from "./components/YourDetailsCard";
import { TicketDisplayCard } from "./components/TicketDisplayCard";
export default function TicketsPage() {
  return (
    <Container className="py-10 sm:py-16">
      <div className="text-center mb-10">
        <h1 className="text-2xl font-semibold">Your Tickets are ready!</h1>
      </div>

      <div className="max-w-3xl mx-auto">
        <YourDetailsCard />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <TicketDisplayCard row={2} seat={13} code="VKBWSD3FEK" />
          <TicketDisplayCard row={2} seat={14} code="OHCZ3FADYE" />
        </div>
      </div>
    </Container>
  );
}
