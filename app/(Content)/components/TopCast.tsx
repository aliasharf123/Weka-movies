import { defaultImage } from "@/src/defaultImage";
import getInfo from "@/src/getInfo";
import { Cast } from "@/types/CastType";
import { ContentItem } from "@/types/ContentType";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function TopCast({ Content }: { Content: ContentItem }) {
  const { title, type } = getInfo(Content);
  const res = await fetch(
    `https://api.themoviedb.org/3/${type === "Movies" ? "movie" : "tv"}/${
      Content && Content.id
    }/credits?api_key=${process.env.NEXT_PUBLIC_DB_key}`
  );
  const Cast: Cast = await res.json();
  return (
    <div className=" text-white grid gap-4">
      <div className="flex items-end max-md:px-6  font-medium justify-between">
        <h1 className="text-2xl ">The Cast</h1>
        {( Cast.crew.length + Cast.cast.length) > 10 ? (
          <Link
            className="text-[rgba(255,255,255,0.7)]"
            href={`/${type}/${Content.id}-${title?.replaceAll(" ", "-")}/cast`}
          >
            Full Crew & Cast 
          </Link>
        ) : <div></div>}
      </div>
      <div className="overflow-scroll md:pb-5 Custome-Scroll max-md:removeScroll   animate__animated animate__fadeIn">
        <div className="flex flex-grow max-md:pl-6 gap-4 ">
          {[...Cast.cast ,...Cast.crew].splice(0, 11).map((person) => (
            <Link
              href={`/People/${person.id}-${person.name.replaceAll(" ", "-")}`}
            >
              <div key={person.id} className=" w-[8rem] gap-2  grid ">
                <Image
                  className="rounded-lg  object-cover h-[12rem]"
                  width={208}
                  height={208}
                  alt={person.name}
                  src={
                    person.profile_path
                      ? `https://www.themoviedb.org/t/p/w500${person.profile_path}`
                      : defaultImage
                  }
                />
                <div className="grid leading-5">
                  <h1 className="truncate font-medium">{person.name}</h1>
                  <h1 className="truncate text-[rgba(255,255,255,0.7)]">
                    {/* if person is in crew it will have job else it will have character */}
                    {(person as any).character || (person as any).job} 
                  </h1>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
