import React from "react";
import { PropsTvShows } from "../../page";
import { SingleTVSeries } from "@/types/SingleTvShow";
import HeaderContent from "@/app/(Content)/components/InformationComp/headerContent";
import Image from "next/image";
import { defaultImage } from "@/src/defaultImage";
import RatingClient from "@/components/RatingClient";
import { Metadata } from "next";


export async function generateMetadata({
  params,
  searchParams,
}: PropsTvShows): Promise<Metadata> {
  // read route params
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${params.tvId.split("-")[0]}?api_key=${
      process.env.NEXT_PUBLIC_DB_key
    }&language=en-US`
  );
  const tv= await res.json();

  return {
    title: tv.name + " Seasons - Weka Movies",
  };
}



export default async function Page({ params }: PropsTvShows) {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${params.tvId.split("-")[0]}?api_key=${
      process.env.NEXT_PUBLIC_DB_key
    }&language=en-US`
  );
  const tv: SingleTVSeries = await res.json();
  const seasons = tv.seasons;
  return (
    <div className="text-white">
      <HeaderContent movie={tv as any} />
      <div className="divide-y gap-3 divide-HeaderColor flex flex-col">
        {seasons.length ? (
          seasons.map((season, index) => (
            <div
              key={index}
              className={`${
                index !== 0 && "pt-3"
              }  gap-4 flex max-md:flex-col px-8 md:px-14`}
            >
              <Image
                alt={season.name}
                className="w-[130px] h-[200px] self-center object-cover  rounded-md"
                src={
                  season.poster_path
                    ? `https://www.themoviedb.org/t/p/w500${season.poster_path}`
                    : defaultImage
                }
                width={200}
                height={200}
              />
              <div className="flex-1 flex  flex-col gap-4 py-4">
                <div>
                  <h1 className="text-xl font-medium">{season.name}</h1>
                  <h1 className="textLine text-SecondaryText font-medium">
                    <span>{new Date(season.air_date).getFullYear()}</span>{" "}
                    <span>{season.episode_count} Episodes</span>
                  </h1>
                  {season.vote_average ? (
                    <RatingClient rate={season.vote_average / 2} />
                  ) : (
                    <div></div>
                  )}
                </div>
                <p className="text-[rgba(255,255,255,0.7)]">
                  Season {season.season_number} of {tv.name} premiered on{" "}
                  {new Date(season.air_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                {season.overview ? (
                  <p className="text-[rgba(255,255,255,0.7)]">
                    {season.overview}
                  </p>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          ))
        ) : (
          <h1>we don't have seasons for {tv.name}</h1>
        )}
      </div>
    </div>
  );
}
