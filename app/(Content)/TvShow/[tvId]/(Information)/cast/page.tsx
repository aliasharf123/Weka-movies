import FullCast from "@/app/(Content)/components/InformationComp/FullCast";
import React from "react";
import { PropsTvShows } from "../../page";
import { Cast } from "@/types/CastType";

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
