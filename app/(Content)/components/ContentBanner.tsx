import React from "react";
import Image from "next/image";
import AddFavorite from "@/components/Favorite";
import getInfo from "@/src/getInfo";
import { SingleMovieData } from "@/types/SingleMovieType";
import DotIconClient from "@/components/clientBottomTree/DotIconClient";
import Link from "next/link";
import RatingClient from "@/components/RatingClient";
import { PlayCircleOutlined } from "@ant-design/icons";
import { defaultImage } from "@/src/defaultImage";

export default async function ContentBanner({
  Content,
}: {
  Content: SingleMovieData;
}) {
  const { title, type, realseData } = getInfo(Content as any); // get a title of movie

  function convertMinutesToHoursAndMinutesORSeasons(minutes: number): string {
    // turn a time to (hour)h (minutes)m or if it is null return a number of seasons
    if (!minutes) return `${(Content as any).number_of_seasons} s`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return `${hours}h ${remainingMinutes}m`;
  }
  return (
    <>
      {/* For Bigger Desktop */}
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),url(https://www.themoviedb.org/t/p/original${Content.backdrop_path})`,
        }}
        className="max-lg:hidden Fade  relative  text-white bg-center gap-8 px-10 py-24  grid grid-cols-[0.3fr_1fr]   bg-cover bg-no-repeat  "
      >
        {/* Movie Poster */}
        <div className=" flex flex-col   rounded-lg self-center  ">
          <Image
            width={300}
            height={300}
            className="object-cover  rounded-lg "
            src={
              Content.poster_path
                ? `https://www.themoviedb.org/t/p/original${Content.poster_path}`
                : defaultImage
            }
            alt="mai1n"
            unoptimized
          />
        </div>
        {/* Movie description */}
        <div className=" justify-center  flex flex-col gap-2 ">
          <div className="grid gap-1">
            <h1 className="text-4xl font-semibold">{title} </h1>
            <div className="flex gap-2 items-center">
              <h1 className="text">
                {Content.genres.map((genere: any, index) => {
                  return <span key={index}> {genere.name} </span>;
                })}
              </h1>
              <div className="text-[0.4rem]">
                <DotIconClient /> {/* GET a client icon*/}
              </div>
              <div
                className={`flex gap-2 items-center ${
                  type === "TvShow" && "hidden"
                }`}
              >
                {/* Coutries and a year realease */}
                <div>
                  {Content.production_countries[0] &&
                    Content.production_countries[0].iso_3166_1}{" "}
                  {new Date(Content.release_date).getFullYear()}
                </div>
                {/* break */}
                <div className="text-[0.4rem]">
                  <DotIconClient />
                </div>
                {/* RunTime */}
                <div>
                  {convertMinutesToHoursAndMinutesORSeasons(Content.runtime)}
                </div>
              </div>
            </div>
            {/* Rating  */}
            {Content.vote_average && (
              <div className="flex items-center gap-2 text-lg font-medium">
                <RatingClient rate={Content.vote_average / 2} />
                {(Content.vote_average / 2).toFixed(1)}
              </div>
            )}
          </div>
          <h1 className="italic text-[rgba(255,255,255,0.7)] ">
            {Content.tagline}
          </h1>
          <h1 className="text-lg font-medium">Overview</h1>
          <p className="w-[70%]">{Content.overview || "no overview found"}</p>
          {/* See Trailer & Add Favorite  */}
          <div className="flex gap-2 mt-2">
            <Link
              href={`?trailerId=${type === "Movies" ? "movie" : "tv"}-${
                Content.id
              }`}
              className="RedBtn"
            >
              Play Trailer
            </Link>
            <div className="relative flex justify-center items-center text-xl p-3  rounded-lg bg-[rgba(255,255,255,0.1)] ">
              <AddFavorite movie={Content} />
            </div>
          </div>
        </div>
      </div>
      {/*  For Mobile and small devices*/}
      <div className="lg:hidden">
        <div
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)),url(https://www.themoviedb.org/t/p/original${Content.backdrop_path})`,
          }}
          className=" relative Fade h-[35vh] md:h-[40vh]  bg-center bg-cover bg-no-repeat  "
        ></div>
        <div className="flex flex-col gap-3">
          <div className="relative z-40 px-6 md:px-10 text-white ">
            <div className="font-medium flex  justify-between items-center">
              {/* title and Genery */}
              <div className="">
                <h1 className="md:text-3xl text-xl  ">
                  {title} ({new Date(realseData as any).getFullYear()}){" "}
                </h1>
                <h1 className="text  text-[rgba(200,200,200)]">
                  {Content.genres.map((genere: any, index) => {
                    return <span key={index}> {genere.name} </span>;
                  })}
                </h1>
              </div>
              {/* Add to WatchList */}
              <div className="text-3xl">
                <AddFavorite movie={Content} />
              </div>
            </div>
            {Content.vote_average && (
              <div className="flex items-center gap-1 text-lg font-medium">
                <RatingClient rate={Content.vote_average / 2} />{" "}
                {(Content.vote_average / 2).toFixed(1)}
              </div>
            )}
            <div className="grid grid-cols-3 mt-2  justify-items-center">
              <div className="flex flex-col text-SecondaryText items-center">
                <h1 className="text-lg  text-white font-medium">Length</h1>
                {convertMinutesToHoursAndMinutesORSeasons(Content.runtime)}
              </div>
              <hr className="border border-SecondaryText h-full" />
              <Link
                href={`?trailerId=${type === "Movies" ? "movie" : "tv"}-${
                  Content.id
                }`}
                className="flex  items-center gap-2 w-full "
              >
                <PlayCircleOutlined className="cursor-pointer" />
                Play Trailer
              </Link>
            </div>
          </div>
          <div className="text-SecondaryText  px-6 md:px-10">
            {Content.overview}
          </div>
        </div>
      </div>
    </>
  );
}
