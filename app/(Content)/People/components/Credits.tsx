import ContentCard from "@/app/components/contentCard";
import { getAllCredits } from "@/src/getPersonCredits";
import React from "react";
import TimelineCareer from "./TimelineCareer";
import _ from "lodash";
import { SortingMovie } from "@/src/SortingTech";
import { Content } from "antd/es/layout/layout";
import { CastCredit, CrewCredit } from "@/types/credits";

export const preload = (id: number) => {
  // preload credits in parent server component to handle waterfall

  void getAllCredits(id);
};

export default async function Credits({ id }: { id: number }) {
  const { combined_credits, tv_credits, movie_credits } = await getAllCredits(
    id
  );

  const Known_For = 
  // _.merge(combined_credits.cast, combined_credits.crew  )
  [...combined_credits.crew  , ...combined_credits.cast]
    .sort((a, b) => SortingMovie(a as any, b as any, false, true))
    .slice(0, 10); // get a most popular movies
  return (
    <div className="grid gap-4">
      <div className="grid gap-3">
        <h1 className="text-lg max-lg:px-6 font-medium">Known For</h1>
        <div className="overflow-scroll   overflow-y-hidden  removeScroll">
          <div className="flex flex-row gap-3    max-lg:ml-6 ">
            {Known_For.map((content: any) => (
              <div className="flex flex-col">
                <ContentCard isPersonProfile movie={content as any} />
                {content.character || content.department}
              </div>
            ))}
          </div>
        </div>
      </div>
      <TimelineCareer data={movie_credits.cast} />
    </div>
  );
}
