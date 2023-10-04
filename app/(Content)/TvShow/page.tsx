// Import necessary modules and components

import { Suspense } from "react";
import HeaderFilters from "../components/Discover/HeaderFilters";
import Results from "../components/Discover/Results";
import MovieLoading from "@/components/Loading";

// Define an array of sorting options

export const metadata = {
  title: "Explore Tv shows - Weka movies",
  description: "Welcome to Weka movies",
};
interface Params {
  searchParams: {
    style: 1 | 0; // 1 mean flex layout and 0 is grid
    page: number | undefined;
    languge: string | undefined;
    sort:
      | "vote_average.desc"
      | "vote_average.asc"
      | "release_date.asc"
      | "release_date.desc"
      | "popularity.desc"
      | "popularity.asc"
      | "revenue.asc"
      | "revenue.desc"
      | "primary_release_date.asc"
      | "primary_release_date.desc"
      | "original_title.asc"
      | "original_title.desc"
      | "vote_count.asc"
      | "vote_count.desc"
      | undefined;
    genere: string | undefined;
    startDate: string | undefined;
    endDate: string | undefined;
  };
}
export default async function TvShows({ searchParams }: Params) {
  const page = searchParams.page ?? 1; // State to manage the current page of results
  const languge = searchParams.languge ?? "";
  const sort = searchParams.sort ?? "popularity.desc"; // State to manage sorting options
  const genere = searchParams.genere ?? "";
  const startDate = searchParams.startDate ?? "";
  const endDate = searchParams.endDate ?? "";
  const url = `https://api.themoviedb.org/3/discover/tv?language=en-US&sort_by=${sort}&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate&with_genres=${genere}&with_original_language=${languge}&first_air_date.gte=${startDate}&first_air_date.lte=${endDate}`;

  return (
    <div
      className={"flex flex-col pt-5 px-5 md:px-10 gap-5 divide-HeaderColor text-white"}
    >
      {/* Sorting and Show filters Component */}
      <Suspense fallback={null}>
        <HeaderFilters type='tv'/>
      </Suspense>
      {/* Grid layout */}
      <Suspense fallback={<MovieLoading />} key={url}>
        <Results url={url} page={page as any} />
      </Suspense>
    </div>
  );
}
