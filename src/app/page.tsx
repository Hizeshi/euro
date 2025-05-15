"use client";
import { Title } from "./components/shared/title";
import { Filters } from "./components/shared/filters";
import { ShowList } from "./components/shared/show-list";
export default function Home() {
  return (
    <div className="">
      <Title className="mt-4">Checkout these amazing concerts in Graz.</Title>
      <Filters className=""></Filters>
      <ShowList className=""></ShowList>
    </div>
  );
}
