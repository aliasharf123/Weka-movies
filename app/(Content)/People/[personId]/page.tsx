import { PersonResult, SinglePerson } from "@/types/PeopleType";
import { Metadata } from "next";
import React from "react";

type Props = {
  params: { personId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const res = await fetch(
    `https://api.themoviedb.org/3/person/${
      params.personId.split("-")[0]
    }?api_key=${process.env.NEXT_PUBLIC_DB_key}&language=en-US`
  );
  const movie: SinglePerson = await res.json();
  return {
    title: movie.name + " - Weka Movies",
  };
}

export default async function Page({
  params: { personId },
  searchParams,
}: Props) {
  const res = await fetch(
    `https://api.themoviedb.org/3/person/${personId.split("-")[0]}?api_key=${
      process.env.NEXT_PUBLIC_DB_key
    }&language=en-US`
  );
  const person: SinglePerson = await res.json();
  return <div className="text-white">{person.name}</div>;
}
