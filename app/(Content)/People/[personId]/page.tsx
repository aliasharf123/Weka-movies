import { defaultImage } from "@/src/defaultImage";
import { PersonResult, SinglePerson } from "@/types/PeopleType";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";
import BiographyParagraphs from "../components/biographyParagraphs";
import SocialMedia from "../../components/SocialMedia";
import {Suspense} from 'react'
import Credits, { preload } from "../components/Credits";
type Props = {
  params: { personId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// Generate tiltle of page
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

// render page
export default async function Page({
  params: { personId },
  searchParams,
}: Props) {
  const res = await fetch(
    `https://api.themoviedb.org/3/person/${personId.split("-")[0]}?api_key=${
      process.env.NEXT_PUBLIC_DB_key
    }&language=en-US`
  );
  const person: SinglePerson = await res.json(); // get a person detail info
  preload(person.id) // preload a data to help in parrel fetching
  const PersonalInfo = {
    // make a personal Object
    Known_For: person.known_for_department,
    Gender: getGender(person.gender),
    Birthday:
      person.birthday +
      `${
        !person.deathday
          ? ` (${calculateAge(
              person.birthday,
              person.deathday as any
            )} years old)`
          : ``
      }`,
    Day_of_Death: person.deathday
      ? person.deathday +
        `${
          person.deathday &&
          ` (${calculateAge(
            person.birthday,
            person.deathday as any
          )} years old)`
        }`
      : null,
    Place_of_Birth: person.place_of_birth,
    Also_Known_As: person.also_known_as,
  };
  return (
    <div className="text-white  flex  max-lg:flex-col gap-8  lg:px-16  mt-10">
      <div className="flex flex-col gap-5 ">
        {/* Poster */}
        
        <Image
          alt={person.name}
          className="rounded-lg max-lg:self-center md:w-[300px] w-[150px]  h-[200px] md:h-[300px] object-cover lg:h-[450px]"
          src={
            person.profile_path
              ? `https://www.themoviedb.org/t/p/w500${person.profile_path}`
              : defaultImage
          }
          width={250}
          height={300}
        />
        <div className="max-lg:self-center flex flex-col max-lg:items-center">
          <h1 className="lg:hidden text-3xl font-semibold text-center">{person.name}</h1> {/*Name display in mobile and small desktop*/}
          {/*Social media Links*/}
          <SocialMedia id={person.id}  Type="person"/>
        </div>
        {/* Personal Info */}
        <div className="grid max-lg:px-6 gap-3">
          <h1 className="text-xl font-medium">Personal Info</h1>
          {/* display a personal info by keys */}
          <div className="grid max-lg:grid-cols-2 gap-3">
            {Object.keys(PersonalInfo).map((key, index) => {
              if (PersonalInfo[key as keyof typeof PersonalInfo] === null)
                return <div key={index} className="hidden"></div>;
              return (
                <div key={key} className="flex   flex-col">
                  <h1 className={`font-medium ${key === "Also_Known_As" && "max-lg:hidden"}`}>{key.replaceAll("_", " ")}</h1>
                  {key !== "Also_Known_As" ? (
                    <h1 className="font-[350]">
                      {PersonalInfo[key as keyof typeof PersonalInfo]}
                    </h1>
                  ) : (
                    <div className="font-[350] max-lg:hidden grid gap-1">
                      {person.also_known_as.map((item, index) => (
                        <h1 key={index}>{item}</h1>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex flex-col  lg:flex-1 gap-8">
        <h1 className="text-3xl max-lg:hidden font-medium ">{person.name}</h1>
        {/* Biography section */}
        <div className="grid max-lg:px-6 gap-3">
          <h1 className="text-lg font-medium">Biography</h1>
          <BiographyParagraphs biography={person.biography} />
        </div>
        {/* credits section */}
        <Suspense fallback={<h1>Loading.........</h1>}>
          <Credits id={person.id}/>
        </Suspense>
      </div>
    </div>
  );
}
// determine a gender according to number in api
function getGender(gender: number): string | undefined {
  switch (gender) {
    case 0:
      return "Not set / not specified";
    case 1:
      return "Female";
    case 2:
      return "Male";
    case 3:
      return "Non-binary";
  }
}
// calculate Age of actor / actress
function calculateAge(birthdate: string, deathDate?: string): number {
  const birthDate = new Date(birthdate);
  let currentDate = new Date();

  // If a death date is provided, use it to calculate age
  if (deathDate) {
    currentDate = new Date(deathDate);
  }

  // Calculate the difference in years
  const age = currentDate.getFullYear() - birthDate.getFullYear();

  // Check if the birthdate hasn't occurred yet in the year of the provided date
  if (
    currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() &&
      currentDate.getDate() < birthDate.getDate())
  ) {
    // Subtract 1 from the age if the birthdate hasn't occurred yet in the year of the provided date
    return age - 1;
  }

  return age;
}
