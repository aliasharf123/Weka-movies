import { defaultImage } from "@/src/defaultImage";
import { PersonResult, SinglePerson } from "@/types/PeopleType";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";
import BiographyParagraphs from "../components/biographyParagraphs";
import KnownFor from "../components/KnownFor";
import SocialMedia from "../components/SocialMedia";

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
  return (
    <div className="text-white  flex   gap-8 px-16  mt-10">
      <div className="flex flex-col gap-5">
        {/* Poster */}
        <Image
          alt={person.name}
          className="rounded-lg w-[300px] object-cover h-[450px]"
          src={
            person.profile_path
              ? `https://www.themoviedb.org/t/p/w500${person.profile_path}`
              : defaultImage
          }
          width={250}
          height={300}
        />
        {/*Social media Links*/}
        <SocialMedia person={person}/>
      </div>
      <div className="flex flex-col flex-1 gap-8">
        <h1 className="text-3xl font-medium ">{person.name}</h1>
        {/* Biography section */}
        <div className="grid gap-3">
          <h1 className="text-lg font-medium">Biography</h1>
          <BiographyParagraphs biography={person.biography}/>
        </div>
        {/* credits section */}

        <div className="grid gap-3">
          <h1 className="text-lg font-medium">Known For</h1>
          <KnownFor person={person}/>
        </div>
      </div>
    </div>
  );
}
