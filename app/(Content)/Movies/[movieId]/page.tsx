import _ from "lodash";
import getInfo from "../../../../src/getInfo";
import { ContentItem } from "@/types/ContentType";
import { notFound } from "next/navigation";

import SingleContent from "../../components/SingleContent";
import { Metadata } from "next";

export type PropsMovie = {
  params: { movieId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

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
  const movie: ContentItem = await res.json();
  return {
    title: movie.title + " - Weka Movies",
  };
}

export default async function SingleMoviePage({
  params: { movieId },
  searchParams,
}: PropsMovie) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId.split("-")[0]}?api_key=${
      process.env.NEXT_PUBLIC_DB_key
    }&language=en-US`
  );
  const movie = await res.json();
  if (Object.keys(movie).length <= 3) {
    notFound();
  }

  return (
    <SingleContent Cotent={movie} trailerId={searchParams?.trailerId as any} />
  );
}

export async function generateStaticParams() {
  // generate a params (make a pages of Trending Movies render static on server )
  const resDay = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.NEXT_PUBLIC_DB_key}`
  );
  const dataDay = await resDay.json();
  const resWeek = await fetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.NEXT_PUBLIC_DB_key}`
  );
  const dataWeek = await resWeek.json();

  const data = _.merge(dataWeek.results, dataDay.results);
  return data.map((movie: ContentItem) => {
    const { title, type } = getInfo(movie);
    return {
      movieId: `${movie.id}-${title?.replaceAll(" ", "-")}`,
    };
  });
}
