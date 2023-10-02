import React from "react";
import { PropsMovie } from "../../page";
import { MovieReviewsData } from "@/types/ReviewsType";
import { assert } from "console";
import HeaderContent from "@/app/(Content)/components/InformationComp/headerContent";
import getInfo from "@/src/getInfo";
import SingleReview from "@/app/(Content)/components/Reviews/singleReview";
import { Metadata } from "next";


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
    title: movie.title + " Reviews - Weka Movies",
  };
}


export default async function Page({ params }: PropsMovie) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${
      params.movieId.split("-")[0]
    }?api_key=${process.env.NEXT_PUBLIC_DB_key}&language=en-US`
    );
    const movie = await res.json();
    const {title} = getInfo(movie)
  const ReviewsRes = await fetch(
    `https://api.themoviedb.org/3/movie/${movie.id}/reviews?api_key=${process.env.NEXT_PUBLIC_DB_key}`
  );

  // Parse the response as MovieReviewsData
  const Reviews: MovieReviewsData = await ReviewsRes.json();

  return (
    <div className="text-white">
      <HeaderContent movie={movie} />
      <div className=" flex justify-center ">
        <div className="flex flex-col gap-4 max-w-full w-[800px]  px-4">
          {Reviews.results.length ? Reviews.results.map((review) => (
            <SingleReview review={review} key={review.id as any}/>
          )) : <h1>we don't have review for {title}</h1>}
        </div>

      </div>
    </div>
  );
}
