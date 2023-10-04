import { SingleTVSeries } from "@/types/SingleTvShow";
import React from "react";
import SingleSeason from "./SingleSeason";
import Link from 'next/link'
export default function SeasonSection({ Cotent }: { Cotent: SingleTVSeries }) {
  return (
    <div className="  text-white grid  gap-4">
      <div className="flex items-end max-md:px-6 font-medium justify-between">
        <h1 className="text-2xl ">Last Season</h1>
        {/* Link to view all Seasons */}
        {Cotent.seasons.length > 1 &&<Link
          className="text-[rgba(255,255,255,0.7)]"
          href={`/TvShow/${Cotent.id}-${Cotent.name?.replaceAll(" ", "-")}/seasons`}
        >
          All Seasons
        </Link>}
      </div>
      <div className="max-md:px-6 ">
        {Cotent.seasons[Cotent.seasons.length - 1] ? (
          <SingleSeason Season={Cotent.seasons[Cotent.seasons.length - 1]}/>
        ) : (
          <h1>we don't found seasons for {Cotent.name}</h1>
        )}
      </div>
    </div>
  );
}
