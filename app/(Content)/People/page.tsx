import PaginationMovies from "@/components/PaginationMovies";
import { defaultImage } from "@/src/defaultImage";
import getInfo from "@/src/getInfo";
import { PageResult } from "@/types/PeopleType";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import PersonCard from "./components/personCard";

export const metadata = {
  title: "Popular People - Weka movies",
  description: "Welcome to Weka movies",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const page = searchParams?.page ?? "1";
  const res = await fetch(
    `https://api.themoviedb.org/3/person/popular?language=en-US&page=${page}&api_key=${process.env.NEXT_PUBLIC_DB_key}`
  );

  const people: PageResult = await res.json();
  return (
    <div className="px-16 mt-10 grid gap-8 rounded-xl max-md:text-center text-white">
      <h1 className="text-3xl">Popular people</h1>
      <div className="grid-cols-auto-fit   grid  gap-6 ">
        {people.results.map((person) => (
          <PersonCard person={person}/>
        ))}
      </div>
      {people.total_pages > 1 && (
        <PaginationMovies page={page} value={people.total_pages} />
      )}
    </div>
  );
}
