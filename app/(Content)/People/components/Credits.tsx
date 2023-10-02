import ContentCard from "@/app/components/contentCard";
import { getAllCredits } from "@/src/getPersonCredits";
import React, { Suspense, cache } from "react";
import TimelineCareer from "./TimeLine/TimelineCareer";
import _ from "lodash";
import { SortingMovie } from "@/src/SortingTech";

export const preload = (id: number) => {
  // preload credits in parent server component to handle waterfall

  void getAllCredits(id);
};

export default async function Credits({ id }: { id: number }) {
  const { movie_credits, tv_credits } = await getAllCredits(id);

  const getKnownFor = cache((): any[] => {
    // get  a most 10 popular works if exist
    const sortedWorks = [
      ...movie_credits.crew,
      ...movie_credits.cast,
      ...tv_credits.cast,
      ...tv_credits.crew,
    ].sort((a, b) => SortingMovie(a as any, b as any, false, true)); // sort all works with populirty

    let knownForHashMap = {};
    // loop in sortedWorks to get a most unique works
    for (let index = 0; index < sortedWorks.length; index++) {
      const work = sortedWorks[index]; // define a work
      // detrmine if a work is in HashMap
      if (!Object.keys(knownForHashMap).includes(work.id.toString())) {
        knownForHashMap = { ...knownForHashMap, [work.id.toString()]: work }; // add a work to hash map
        if (Object.keys(knownForHashMap).length === 10) break;
      }
    }
    return Object.values(knownForHashMap);
  });
  const Known_For = getKnownFor();
  return (
    <div className="grid gap-4">
      <div className="grid gap-3">
        <h1 className="text-lg max-lg:px-6 font-medium">Known For</h1>
        {/* most popular movies  */}
        <div className="overflow-scroll   overflow-y-hidden  removeScroll">
          <div className="flex flex-row gap-3  animate__animated animate__fadeIn  max-lg:ml-6 ">
            {Known_For.map((content: any, index) => (
              <div className="flex flex-col">
                <ContentCard
                  key={index}
                  isPersonProfile
                  movie={content as any}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Time line component  */}
      <TimelineCareer data={{ movie_credits, tv_credits }} />
    </div>
  );
}
