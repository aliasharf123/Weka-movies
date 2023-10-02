import React, { Suspense } from "react";
import { CastCredit, CreditsResponceType, CrewCredit } from "@/types/credits";
import FilterCredits from "./FilterCredits";
import TimelineDisplay from "./TimelineDisplay";

export type CategorizedMap = Record<string, CrewCredit[] | CastCredit[]>;

export default function TimelineCareer({
  data: { movie_credits, tv_credits },
}: {
  data: {
    tv_credits: CreditsResponceType;
    movie_credits: CreditsResponceType;
  };
}) {
  const getCategoriesCredits = (contentCredit: CreditsResponceType) => {
    // categories a credits by a person job
    const CategorizedCredits: CategorizedMap = {}; // Map for tv show
    CategorizedCredits["Acting"] = contentCredit.cast; // define a Acting categorie

    contentCredit.crew.forEach((credit) => {
      // loop in credit to categories
      if (!CategorizedCredits[credit.job]) {
        // create new Categorie to new job
        CategorizedCredits[credit.job] = [credit];
      }
      if (
        !CategorizedCredits[credit.job].find((item) => item.id === credit.id)
          ?.id
      ) {
        // detecte if content in hashmanp
        CategorizedCredits[credit.job].push(credit as any);
      }
    });
    return CategorizedCredits;
  };
  // make a CategoriesCredits
  const CategoriesTvCredits = getCategoriesCredits(tv_credits);
  const CategoriesMovieCredits = getCategoriesCredits(movie_credits);
  const CategoriesAllCredits = getCategoriesCredits({
    cast: [...tv_credits.cast, ...movie_credits.cast],
    crew: [...tv_credits.crew, ...movie_credits.crew],
    id: 1,
  });
  return (
    <div className="grid gap-1 max-lg:px-6">
      {/* Filters and title  */}
      <Suspense fallback={<h1>Loading...</h1>}>
        <FilterCredits
          data={{
            CategoriesTvCredits,
            CategoriesMovieCredits,
            CategoriesAllCredits,
          }}
          tv_credits={tv_credits}
          movie_credits={movie_credits}
        />
      </Suspense>
      {/* to make component in dark mode */}
      <Suspense fallback={<h1>Loading...</h1>}>
        <TimelineDisplay
          data={{
            CategoriesTvCredits,
            CategoriesMovieCredits,
            CategoriesAllCredits,
          }}
        />
      </Suspense>
    </div>
  );
}
