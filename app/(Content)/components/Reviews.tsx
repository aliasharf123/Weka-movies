import AvatarClient from "@/components/AvatarClient"; // Import AvatarClient component
import StarIconClient from "@/components/StarIconClient"; // Import StarIconClient component
import getInfo from "@/src/getInfo"; // Import getInfo function
import { ContentItem } from "@/types/ContentType"; // Import ContentItem type
import { MovieReviewsData } from "@/types/ReviewsType"; // Import MovieReviewsData type
import Image from "next/image"; // Import Image component from Next.js
import Link from "next/link"; // Import Link component from Next.js
import React from "react"; // Import React

// Define the Reviews component
export default async function Reviews({ Content }: { Content: ContentItem }) {
  // Get title and type information from the ContentItem
  const { title, type } = getInfo(Content);

  // Fetch movie or TV show reviews using the TMDB API
  const res = await fetch(
    `https://api.themoviedb.org/3/${type === "Movies" ? "movie" : "tv"}/${
      Content && Content.id
    }/reviews?api_key=${process.env.NEXT_PUBLIC_DB_key}`
  );

  // Parse the response as MovieReviewsData
  const Reviews: MovieReviewsData = await res.json();

  // Get the first review (assuming there is at least one)
  const review = Reviews.results[0];

  return (
    <div className=" flex flex-col gap-4  px-10 text-white">
      <div className="flex items-end  font-medium justify-between">
        <div className="flex gap-1 text-2xl items-center">
          <h1 className=" ">Reviews</h1>
          <h1 className="text-[rgba(255,255,255,0.7)] font-normal">
            {Reviews.results.length}
          </h1>
        </div>
        {/* Link to view all reviews */}
        <Link
          className="text-[rgba(255,255,255,0.7)]"
          href={`/${type}/${Content.id}-${title?.replaceAll(" ", "-")}/Reviews`}
        >
          View All
        </Link>
      </div>

      {/* Display the first review */}
      {review ? (
        <div className="flex flex-col p-5 justify-center rounded-md gap-5 shadow-lg shadow-HeaderColor">
          <div className="flex flex-row justify-between">
            <div className="flex  gap-6">
              <AvatarClient src={review.author_details.avatar_path as any} />
              <div className="my-auto">
                <h1 className="text-2xl">A review made by {review.author}</h1>
                <div className=" text-sm flex items-center gap-1">
                  <div className="bg-HeaderColor flex items-center gap-1 rounded-lg px-3 p-1">
                    <StarIconClient />
                    {review.author_details.rating}
                  </div>
                  <p className="text-[rgba(255,255,255,0.7)]">
                    Created by {review.author} on{" "}
                    {new Date(review.created_at).toLocaleString("en-us")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Display the review content */}
          <p className="text-[rgba(255,255,255,0.7)] max-md:text-xs   rounded-sm  ">
            {" "}
            {review.content.slice(0,400)}{" "}
          </p>
        </div>
      ) : (
        <h1>We don't have any reviews for The {title}.</h1>
      )}
    </div>
  );
}
