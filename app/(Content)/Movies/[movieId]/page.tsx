import _ from "lodash";
import getInfo from "../../../../src/getInfo";
import { Content, ContentItem } from "@/types/ContentType";
import { notFound } from "next/navigation";
import ContentBanner from "../../components/ContentBanner";
import Model from "@/components/TrailerModel";
import TopCast from "../../components/TopCast";
import Reviews from "../../components/Reviews";
import Photos from "../../components/Photos";
import Recommendation from "../../components/Recommendation";

export async function getMoviesInfo(movieId: string) {
  // get all Information about movie (MOVIE)
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_DB_key}&language=en-US`
  );
  var movie = await res.json();
  return {
    movie,
  };
}

export default async function SingleMoviePage({
  params: { movieId },
  searchParams,
}: {
  params: { movieId: string };
  searchParams?: { [key: string]: string | undefined };
}) {
  const { movie } = await getMoviesInfo(
    movieId.split("-")[0]
  );
  if (Object.keys(movie).length <= 3) {
    notFound();
  }
  return (
    <div className="flex flex-col gap-8">
      <ContentBanner Content={movie} />
      <TopCast  Content={movie}/>
      <Reviews Content={movie}/>
      <Photos Content={movie}/>
      <Recommendation Content={movie}/>
      {searchParams?.trailerId && <Model />}
    </div>
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
