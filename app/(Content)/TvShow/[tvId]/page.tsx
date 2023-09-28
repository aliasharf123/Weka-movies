import { Content, ContentItem } from "@/types/ContentType";
import { notFound } from "next/navigation";
import React from "react";
import ContentBanner from "../../components/ContentBanner";
import Model from "@/components/TrailerModel";
import getInfo from "@/src/getInfo";
import _ from "lodash";
import TopCast from "../../components/TopCast";
import Reviews from "../../components/Reviews";
import Photos from "../../components/Photos";
import Recommendation from "../../components/Recommendation";

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

export default async function Page({
  params: { tvId },
  searchParams,
}: {
  params: { tvId: string };
  searchParams?: { [key: string]: string | undefined };
}) {
  const { tvShow } = await getTvInfo(
    tvId.split("-")[0]
  );

  if (Object.keys(tvShow).length <= 3) {
    notFound();
  }
  return (
    <div className="flex flex-col gap-8">
      <ContentBanner Content={tvShow} />
      <TopCast Content={tvShow}/>
      <Reviews Content={tvShow}/>
      <Photos Content={tvShow}/>
      <Recommendation Content={tvShow}/>
      {searchParams?.trailerId && <Model />}
    </div>
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
      movieId: `${tv.id}-${title?.replaceAll(" ", "-")}`,
    };
  });
}
