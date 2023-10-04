import RatingClient from "@/components/clientBottomTree/RatingClient";
import { defaultImage } from "@/src/defaultImage";
import { SingleTVSeries, seasonType } from "@/types/SingleTvShow";
import Image from "next/image";
import React from "react";

export default function SingleSeason({ Season }: { Season: seasonType }) {
  return (
    <div className="bg-HeaderColor  flex gap-5  rounded-md">
      <Image
        width={200}
        height={200}
        alt={Season.name}
        className="rounded-l-md max-md:hidden w-[150px] object-cover  "
        src={
          Season.poster_path
            ? `https://www.themoviedb.org/t/p/w500${Season.poster_path}`
            : defaultImage
        }
      />
      <div className="flex-1 flex  max-md:px-4 flex-col gap-4 py-4">
        <div>
          <h1 className="text-xl font-medium">{Season.name}</h1>
          <h1 className="textLine text-SecondaryText font-medium">
            <span>{new Date(Season.air_date).getFullYear()}</span>{" "}
            <span>{Season.episode_count} Episodes</span>
          </h1>
            <RatingClient rate={Season.vote_average / 2} />
        </div>
        {Season.overview ? (
          <p className="text-[rgba(255,255,255,0.7)]">{Season.overview}</p>
        ) : (
          <p className="italic text-[rgba(255,255,255,0.7)]">
            No overview for {Season.name}
          </p>
        )}
      </div>
    </div>
  );
}
