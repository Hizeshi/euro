// src/app/tickets/page.tsx

"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/app/components/shared/container";

export default function TicketsPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/retrieve-tickets");
  }, [router]);

  return (
    <Container className="py-10 sm:py-16 flex justify-center items-center min-h-[calc(100vh-200px)]">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Loading your tickets...</h1>
        <p className="text-muted-foreground mt-2">Redirecting...</p>
      </div>
    </Container>
  );
}