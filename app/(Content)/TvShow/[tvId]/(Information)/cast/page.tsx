import FullCast from "@/app/(Content)/components/InformationComp/FullCast";
import React from "react";
import { PropsTvShows } from "../../page";
import { Cast } from "@/types/CastType";
import { Metadata } from "next";
import { ContentItem } from "@/types/ContentType";


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
  const tv: ContentItem= await res.json();

  return {
    title: tv.name + " Cast - Weka Movies",
  };
}

export default async function Page({ params }: PropsTvShows) {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${
      params.tvId.split("-")[0]
    }?api_key=${process.env.NEXT_PUBLIC_DB_key}&language=en-US`
  );
  const tv = await res.json();
  const CastRes = await fetch( `https://api.themoviedb.org/3/tv/${params.tvId}/credits?api_key=${process.env.NEXT_PUBLIC_DB_key}`)
  const cast : Cast = await CastRes.json()
  return <FullCast movie={tv} cast={cast}/>;
}
