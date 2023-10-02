import RatingClient from "@/components/RatingClient";
import AvatarClient from "@/components/clientBottomTree/AvatarClient";
import { Review } from "@/types/ReviewsType";
import React from "react";

export default function SingleReview({ review }: { review: Review }) {
  return (
    <div className="flex flex-col p-5 justify-center rounded-md gap-5 bg-HeaderColor">
      <div className="flex flex-row justify-between">
        <div className="flex  gap-6">
          <AvatarClient
            src={
              review.author_details.avatar_path
                ? `https://www.themoviedb.org/t/p/w500${review.author_details.avatar_path}`
                : null as any
            }
          />
          <div className="my-auto">
            <h1 className="md:text-2xl text-xl">{review.author}</h1>
            <div className=" text-sm flex items-center gap-1">
              <p className="text-[rgba(255,255,255,0.7)]">
                {new Date(review.created_at).toDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Display the review content */}
      <div>
        {review.author_details.rating ? (
          <RatingClient rate={review.author_details.rating / 2} />
        ) : (
          <h1 className="text-SecondaryText it">no rating</h1>
        )}
        <p className="text-[rgba(255,255,255,0.7)] max-md:text-xs   rounded-sm  ">
          {" "}
          {review.content.slice(0, 400)}{" "}
        </p>
      </div>
    </div>
  );
}
