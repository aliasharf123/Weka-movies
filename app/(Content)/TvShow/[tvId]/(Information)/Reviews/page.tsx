import React from "react";
import { PropsTvShows } from "../../page";
import { MovieReviewsData } from "@/types/ReviewsType";
import { assert } from "console";
import HeaderContent from "@/app/(Content)/components/InformationComp/headerContent";
import getInfo from "@/src/getInfo";
import SingleReview from "@/app/(Content)/components/Reviews/singleReview";

export default async function Page({ params }: PropsTvShows) {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${params.tvId.split("-")[0]}?api_key=${
      process.env.NEXT_PUBLIC_DB_key
    }&language=en-US`
  );
  const tv = await res.json();
  const { title } = getInfo(tv);
  const ReviewsRes = await fetch(
    `https://api.themoviedb.org/3/tv/${tv.id}/reviews?api_key=${process.env.NEXT_PUBLIC_DB_key}`
  );

  // Parse the response as MovieReviewsData
  const Reviews: MovieReviewsData = await ReviewsRes.json();

  return (
    <div className="text-white">
      <HeaderContent movie={tv} />
      <div className=" flex justify-center ">
        <div className="flex flex-col gap-4 max-w-full w-[800px]  px-4">
          {Reviews.results.length ? (
            Reviews.results.map((review) => (
              <SingleReview review={review} key={review.id as any} />
            ))
          ) : (
            <h1>we don't have review for {title}</h1>
          )}
        </div>
      </div>
    </div>
  );
}
