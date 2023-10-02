import { Content, ContentItem } from "@/types/ContentType";
import { notFound } from "next/navigation";
import React from "react";
import getInfo from "@/src/getInfo";
import _ from "lodash";

import SingleContent from "../../components/SingleContent";
import { Metadata } from "next";
import { SingleTVSeries } from "@/types/SingleTvShow";

export type PropsTvShows = {
  params: { tvId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
const getTvInfo = async (tvId: string) => {
  // get all Information about movie (TV , recommendations)
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${tvId}?api_key=${process.env.NEXT_PUBLIC_DB_key}&language=en-US`
  );
  var tvShow = await res.json();

  return {
    tvShow,
  };
};

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
  const tv: ContentItem = await res.json();

  return {
    title: tv.name + " - Weka Movies",
  };
}

export default async function Page({
  params: { tvId },
  searchParams,
}: PropsTvShows) {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${tvId.split("-")[0]}?api_key=${
      process.env.NEXT_PUBLIC_DB_key
    }&language=en-US`
  );
  var tvShow: SingleTVSeries = await res.json();
  if (Object.keys(tvShow).length <= 3) {
    notFound();
  }

  return (
    <SingleContent
      Cotent={tvShow as any}
      trailerId={searchParams?.trailerId as any}
    />
  );
}
export async function generateStaticParams() {
  // generate a params (make a pages of Trending tv render static on server )
  const resDay = await fetch(
    `https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.NEXT_PUBLIC_DB_key}`
  );
  const dataDay = await resDay.json();
  const resWeek = await fetch(
    `https://api.themoviedb.org/3/trending/tv/week?api_key=${process.env.NEXT_PUBLIC_DB_key}`
  );
  const dataWeek = await resWeek.json();

  const data = _.merge(dataWeek.results, dataDay.results);
  return data.map((tv: ContentItem) => {
    const { title, type } = getInfo(tv);
    return {
      tvId: `${tv.id}-${title?.replaceAll(" ", "-")}`,
    };
  });
}
