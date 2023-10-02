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
    <div className="md:px-10 text-white flex flex-col gap-4">
      <div className="flex items-end max-md:px-6  font-medium justify-between">
        <h1 className="text-2xl ">The Cast</h1>
        {( Cast.crew.length + Cast.cast.length) ? (
          <Link
            className="text-[rgba(255,255,255,0.7)]"
            href={`/${type}/${Content.id}-${title?.replaceAll(" ", "-")}/cast`}
          >
            View All
          </Link>
        ) : <div></div>}
      </div>
      <div className="overflow-scroll removeScroll  flex animate__animated animate__fadeIn">
        <div className="flex flex-grow max-md:pl-6 gap-4 ">
          {Cast.cast.splice(0, 11).map((actor) => (
            <Link
              href={`/People/${actor.id}-${actor.name.replaceAll(" ", "-")}`}
            >
              <div key={actor.id} className="w-[8rem] gap-2  grid h-full">
                <Image
                  className="rounded-lg"
                  width={128}
                  height={128}
                  alt={actor.name}
                  src={
                    actor.profile_path
                      ? `https://www.themoviedb.org/t/p/w500${actor.profile_path}`
                      : defaultImage
                  }
                />
                <div className="grid leading-5">
                  <h1 className="truncate font-medium">{actor.name}</h1>
                  <h1 className="truncate text-[rgba(255,255,255,0.7)]">
                    {actor.character}
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
