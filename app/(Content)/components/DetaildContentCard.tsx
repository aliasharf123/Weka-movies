"use client";
import AddFavorite from "@/components/Favorite";
import RatingClient from "@/components/clientBottomTree/RatingClient";
import { GenresMap } from "@/src/GenreMap";
import { defaultImage } from "@/src/defaultImage";
import getInfo from "@/src/getInfo";
import { ContentItem } from "@/types/ContentType";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function DetaildContentCard({ movie }: { movie: ContentItem }) {
  const { title, type, realseData } = getInfo(movie);
  const RealeseYear = new Date(realseData as any).getFullYear();
  const rate = movie.vote_average / 2;

  return (
    <Link href={`/${type}/${movie.id}-${title?.replaceAll(" ", "-")}`}>
      <div className="group  animate__animated  animate__fadeIn bg-[#1D1F21]  h-full  rounded-xl ">
        <div className="overflow-hidden w-full  max-sm:h-[250px] h-[300px] rounded-t-xl  relative">
          <Image
            fill
            className="object-cover rounded-t-xl group-hover:brightness-75  duration-300 group-hover:scale-105"
            src={
              movie.poster_path
                ? `https://www.themoviedb.org/t/p/w500${movie.poster_path}`
                : defaultImage
            }
            alt={title as any}
            
          />
        </div>
        <div className=" text-white p-3 rounded-b-xl flex flex-col gap-1">
          <div className="flex justify-between">
            <h1 className="font-medium text-lg  group-hover:text-redColor duration-300">
              {title}
            </h1>
            <div
              onClick={(e) => {
                e.preventDefault();
              }}
              className="  rounded-3xl  text-xl hover:scale-105 duration-200   right-0 "
            >
              <AddFavorite movie={movie}/>
            </div>
          </div>
          <h1 className="text-[#515457] flex gap-2 textLine text-sm truncate">
            {movie.genre_ids.slice(0, 2).map((genreId) => (
              <span key={genreId}>
                {GenresMap[genreId.toString() as keyof typeof GenresMap]}
              </span>
            ))}
          </h1>
          <RatingClient rate={rate} />
        </div>
      </div>
    </Link>
  );
}
