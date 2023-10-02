import React from "react";
import { PropsMovie } from "../../Movies/[movieId]/page";
import { SingleMovieData } from "@/types/SingleMovieType";
import { Cast } from "@/types/CastType";
import Image from "next/image";
import { defaultImage } from "@/src/defaultImage";
import getInfo from "@/src/getInfo";
import Link from "next/link";
import ArrowBackIconClient from "@/components/clientBottomTree/ArrowBackIconClient";
import HeaderContent from "./headerContent";
import PersonCard from "../../People/components/personCard";

export default function FullCast({
  movie,
  cast,
}: {
  movie: SingleMovieData;
  cast: Cast;
}) {
  const { title } = getInfo(movie as any);
  return (
    <div className="text-white">
      <HeaderContent movie={movie as any} />
      <div className="grid md:grid-cols-2 max-md:divide-y-2 divide-HeaderColor max-md:gap-6 mt-5 px-8 md:px-14">
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-medium">
            Cast <span className="text-SecondaryText ">{cast.cast.length}</span>
          </h1>
          <PersonalCard cast={cast.cast} title={title} Type={"cast"} />
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-medium max-md:mt-4">
            Crew <span className="text-SecondaryText ">{cast.crew.length}</span>
          </h1>
          <PersonalCard cast={cast.crew} title={title} Type={"crew"} />
        </div>
      </div>
    </div>
  );
}
// A personal Component to reused it
function PersonalCard({ cast, title, Type }: any) {
  return (
    <div className="grid  gap-3">
      {cast.length ? (
        cast.map((person: any) => (
          <div key={person.id} className="gap-2  flex ">
            <Link
              href={`/People/${person.id}-${person.name.replaceAll(" ", "-")}`}
            >
              <Image
                className="rounded-lg bg-HeaderColor object-cover w-[4rem] h-[6rem] "
                width={128}
                height={128}
                alt={person.name}
                src={
                  person.profile_path
                    ? `https://www.themoviedb.org/t/p/w500${person.profile_path}`
                    : defaultImage
                }
              />
            </Link>
            <div className="flex flex-col gap-2 justify-center leading-5">
              <Link
                href={`/People/${person.id}-${person.name.replaceAll(
                  " ",
                  "-"
                )}`}
              >
                <h1 className=" font-medium">{person.name}</h1>
              </Link>
              <h1 className=" text-[rgba(255,255,255,0.7)]">
                {person.character || person.job}
              </h1>
            </div>
          </div>
        ))
      ) : (
        <h1>
          We don't have {Type} for {title}
        </h1>
      )}
    </div>
  );
}
