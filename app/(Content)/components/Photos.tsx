import getInfo from "@/src/getInfo";
import { ContentItem } from "@/types/ContentType";
import { SingleMovieData } from "@/types/SingleMovieType";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MovieImages } from "@/types/PhotosType";
export default async function Photos({ Content }: { Content: ContentItem }) {
  const { title, type } = getInfo(Content);
  const res = await fetch(
    `https://api.themoviedb.org/3/${type === "Movies" ? "movie" : "tv"}/${
      Content && Content.id
    }/images?api_key=${
      process.env.NEXT_PUBLIC_DB_key
    }&include_image_language=null`
  );
  const Photos: MovieImages = await res.json();
  return (
    <div className=" flex flex-col gap-4  md:px-10 text-white">
      <div className="flex items-end max-md:px-6 font-medium justify-between">
        <div className="flex gap-1 text-2xl items-center">
          <h1 className=" ">Photos</h1>
          <h1 className="text-[rgba(255,255,255,0.7)] font-normal">
            {Photos.backdrops.length}
          </h1>
        </div>
      </div>

      {/* Display the backdrops photos*/}
      {Photos.backdrops.length ? (
        <div className="overflow-scroll removeScroll  flex animate__animated animate__fadeIn">
          <div className="flex flex-grow   max-md:pl-6  gap-4 ">
            {Photos.backdrops.splice(0, 11).map((backdrop, index) => (
              <div
                key={index}
                className="relative w-[25rem] aspect-video gap-2  grid h-full"
              >
                <Image
                  key={index}
                  fill
                  quality={100}
                  className="rounded-lg "
                  alt={backdrop.aspect_ratio as any}
                  src={`https://www.themoviedb.org/t/p/w500${backdrop.file_path}`}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h1>We don't have any Photos for The {title}.</h1>
      )}
    </div>
  );
}
