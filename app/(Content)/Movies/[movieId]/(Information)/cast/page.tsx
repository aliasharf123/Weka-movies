import FullCast from "@/app/(Content)/components/InformationComp/FullCast";
import React from "react";
import { PropsMovie } from "../../page";
import { Cast } from "@/types/CastType";
import { Metadata } from "next";
import { ContentItem } from "@/types/ContentType";


export async function generateMetadata({
  params,
  searchParams,
}: PropsMovie): Promise<Metadata> {
  // read route params
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${
      params.movieId.split("-")[0]
    }?api_key=${process.env.NEXT_PUBLIC_DB_key}&language=en-US`
  );
  const movie = await res.json();

  return {
    title: movie.title + " Cast - Weka Movies",
  };
}

export default async function Page({ params }: PropsMovie) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${
      params.movieId.split("-")[0]
    }?api_key=${process.env.NEXT_PUBLIC_DB_key}&language=en-US`
  );
  const movie = await res.json();
  const CastRes = await fetch( `https://api.themoviedb.org/3/movie/${params.movieId}/credits?api_key=${process.env.NEXT_PUBLIC_DB_key}`)
  const cast : Cast = await CastRes.json()
  return <FullCast movie={movie} cast={cast}/>;
}
