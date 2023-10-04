import getInfo from "@/src/getInfo";
import { SingleMovieData } from "@/types/SingleMovieType";
import { SingleTVSeries } from "@/types/SingleTvShow";
import React from "react";

export default async function Keywords({
  Content,
}: {
  Content: SingleMovieData | SingleTVSeries;
}) {
  const { type } = getInfo(Content as any);
  const url = `https://api.themoviedb.org/3/${
    type === "Movies" ? "movie" : "tv"
  }/${Content.id}/keywords?api_key=${
    process.env.NEXT_PUBLIC_DB_key
  }`;
  const res = await fetch(url);
  const keywordsResponse: {
    id: number;
    results?: { name: string; id: number }[];// Tv movie request
    keywords? : { name: string; id: number }[] // for movie request
  } = await res.json();
  const KeywordsResults = keywordsResponse.keywords ?? keywordsResponse.results ;
  return (
    <div className="grid gap-1">
      <h1 className="font-medium">Keywords</h1>
      <div className="flex flex-wrap gap-2">
        {KeywordsResults?.length ? KeywordsResults.map((keyword) => (
            <h1 className="bg-HeaderColor  text-sm rounded-lg text-Paragraph p-1 px-2" key={keyword.id}>{keyword.name}</h1>
        )) : <h1 className="text-Paragraph italic">No keywords</h1>}
      </div>
    </div>
  );
}
