// src/app/page.tsx
"use client";
import { Title } from "./components/shared/title";
import { Filters } from "./components/shared/filters";
import { ShowList } from "./components/shared/show-list";
import { Container } from "./components/shared/container";

export default function Home() {
  return (
    <Container className="py-8">
      <Title className="mt-4 mb-6">Checkout these amazing concerts in Graz.</Title>
      <Filters className="mb-8" />
      <ShowList className="" />
    </Container>
  );
}