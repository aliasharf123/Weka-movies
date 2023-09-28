import ContentCard from "@/app/components/contentCard";
import getInfo from "@/src/getInfo";
import { Content, ContentItem } from "@/types/ContentType";
import React from "react";

export default async function Recommendation({
  Content,
}: {
  Content: ContentItem;
}) {
  const { title, type } = getInfo(Content);
  const res = await fetch(
    `https://api.themoviedb.org/3/${type === "Movies" ? "movie" : "tv"}/${
      Content && Content.id
    }/recommendations?api_key=${process.env.NEXT_PUBLIC_DB_key}`
  );
  const recommendations: Content = await res.json();
  return (
    <div className="md:px-10  text-white flex flex-col gap-4">
      <div className="flex items-end max-md:px-8 font-medium justify-between">
        <h1 className="text-2xl ">Recommendation</h1>
      </div>
      <div className="overflow-scroll removeScroll  flex animate__animated animate__fadeIn">
        <div className="flex flex-grow max-md:pl-8 gap-4 ">
          {recommendations.results.length ? (
            recommendations.results.map((content) =>(
                <ContentCard movie={content}/>
            ))
          ) : (
            <h1>We don't have any Recommendation for The {title}</h1>
          )}
        </div>
      </div>
    </div>
  );
}
