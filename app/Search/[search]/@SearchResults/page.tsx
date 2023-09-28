import GridResults from "@/components/GridResults";
import { Content } from "@/types/ContentType";
import { notFound } from "next/navigation";
import React from "react";

const MadeUrl = (page: string, resultstate: string, search: string) => {
  return `https://api.themoviedb.org/3/search/${resultstate}?language=en-US&query=${search}&page=${page}&api_key=${process.env.NEXT_PUBLIC_DB_key}`;
};
export async function generateMetadata({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const Query = searchParams?.q;
  return {
    title:Query + ' - Weka Movies',
  }
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { search: "movie" | "tv" | "person" };
  searchParams?: { [key: string]: string | undefined };
}) {
  const page = searchParams?.page;
  const Query = searchParams?.q;
  const res = await fetch(MadeUrl(page ?? "1", params.search, Query ?? "") , {next : {revalidate: 3600}});
  const data: Content = await res.json();
 
  return (
    <>
    {data.results.length ? (
      <GridResults
        media={params.search === "movie" ? "Movies" : "TvShow"}
        page={page}
        data={data}
        />

    ): <h1 className="h-[75vh] w-full flex justify-center text-2xl">No {params.search.toUpperCase()} Found</h1>}
    </>
  );
}
