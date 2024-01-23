import { notFound } from "next/navigation";
import React from "react";
import ContentBanner from "../../components/ContentBanner";
import { ContentItem } from "@/types/ContentType";
import ContentCard from "@/app/components/contentCard";
import DetaildContentCard from "../../components/DetaildContentCard";

export type MovieCollection = {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  parts: ContentItem[];
};

export default async function Page({
  params: { collectionId },
}: {
  params: { collectionId: string };
}) {
  const res = await fetch(
    `https://api.themoviedb.org/3/collection/${
      collectionId.split("-")[0]
    }?api_key=${process.env.NEXT_PUBLIC_DB_key}&language=en-US`
  );
  const movieCollection: MovieCollection = await res.json();

  if (Object.keys(movieCollection).length <= 3) {
    notFound();
  }

  return (
    <div className="text-white flex flex-col gap-8">
      <ContentBanner Content={movieCollection} />
      <div className="md:px-10 max-md:px-6 flex flex-col gap-4 text-white">
        <h1 className="text-2xl font-medium  ">
          {movieCollection.parts.length} Movies
        </h1>
        <div className="grid grid-cols-auto-fit-discover place-content-start  max-sm:grid-cols-2  gap-4 ">
          {movieCollection.parts.map((value, index) => (
            <DetaildContentCard key={index} movie={value} />
          ))}
        </div>
      </div>
    </div>
  );
}
