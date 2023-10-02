"use client";
import { CreditsResponceType } from "@/types/credits";
import React, { useState } from "react";
import { CategorizedMap } from "./TimelineCareer";
import { MantineProvider, Select } from "@mantine/core";
import FilterListIcon from "@mui/icons-material/FilterList";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type dataType = {
  CategoriesTvCredits: CategorizedMap;
  CategoriesMovieCredits: CategorizedMap;
  CategoriesAllCredits: CategorizedMap;
};

export default function FilterCredits({
  data: { CategoriesTvCredits, CategoriesMovieCredits, CategoriesAllCredits },
  tv_credits,
  movie_credits,
}: {
  data: {
    CategoriesTvCredits: CategorizedMap;
    CategoriesMovieCredits: CategorizedMap;
    CategoriesAllCredits: CategorizedMap;
  };
  tv_credits: CreditsResponceType;
  movie_credits: CreditsResponceType;
}) {
  const data = {
    CategoriesTvCredits,
    CategoriesMovieCredits,
    CategoriesAllCredits,
  };
  // define a state open filter bar
  const [openFilters, setOpenFilters] = useState(false);
  // get a length of credits
  const numberOfTvShows = [...tv_credits.cast, ...tv_credits.crew].length;
  const numberOfMovies = [...movie_credits.cast, ...movie_credits.crew].length;
  // get a params & pathName
  const SearchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  // get a params filter 
  const credit_department = SearchParams.get('credit_department')
  const credit_media_type = SearchParams.get('credit_media_type')

  // filter a credits by change url
  const SelectFilterCredits = (
    value: string,
    Type: "credit_department" | "credit_media_type"
  ) => {
    const params = new URLSearchParams(SearchParams);
    const RemoveSpace = value.split(" ")[0];
    if (!SearchParams.get(Type)) {
      params.append(Type, RemoveSpace);
    } else {
      params.set(Type, RemoveSpace);
    }
    router.push(pathName + "?" + params.toString(), { scroll: false });
  };
  // clear all params in url
  const clearAllFilters = () => {
    const params = new URLSearchParams(SearchParams);
    params.delete("credit_department");
    params.delete("credit_media_type");
    router.push(pathName + "?" + params.toString(), { scroll: false });
  };
  const FilterCredits = (): CategorizedMap => {
    if (!credit_department && !credit_media_type) {
      return CategoriesAllCredits;
    }
    // Filter by Media type 
    if (credit_media_type === "Tv") {
      return credit_department //  select a department if exist in url
        ? { [credit_department]: CategoriesTvCredits[credit_department] }
        : CategoriesTvCredits;
    } else if (credit_media_type === "Movies") {
      return credit_department //  select a department if exist in url
        ? { [credit_department]: CategoriesMovieCredits[credit_department] }
        : CategoriesMovieCredits;
    } else {
      return credit_department //  select a department if exist in url
        ? { [credit_department]: CategoriesAllCredits[credit_department] }
        : CategoriesAllCredits;
    }
  };
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-medium">Career Works</h1>
        <div className="flex gap-2">
          {(SearchParams.get("credit_department") ||
            SearchParams.get("credit_media_type")) && (
            <button
              onClick={clearAllFilters}
              className="text-redColor font-medium hover:brightness-75 duration-200"
            >
              Clear
            </button>
          )}
          <button
            className="flex gap-2  items-center"
            onClick={() => setOpenFilters(!openFilters)}
          >
            <FilterListIcon className="self-center" fontSize="inherit" />
            <h1>Filters</h1>
          </button>
        </div>
      </div>
      <MantineProvider theme={{ colorScheme: "dark" }}>
        <div
          className={` grid grid-cols-2 gap-4 duration-300 ${
            !openFilters ? "h-0 scale-y-0" : " py-4"
          } `}
        >
          <Select
            label="Selcet categorie"
            className={` ${!openFilters && "h-0 scale-y-0"}`}
            placeholder="Pick value"
            data={Object.keys(FilterCredits()).map(
              (key) => `${key} (${FilterCredits()[key].length})`
            )}
            value={credit_department}
            onChange={(e) => SelectFilterCredits(e as any, "credit_department")}
            searchable
          />
          <Select
            label="Select a media type"
            className={` ${!openFilters && "h-0 scale-y-0"}`}
            placeholder="Pick value"
            data={[
              `All (${numberOfTvShows + numberOfMovies})`,
              `Tv shows (${numberOfTvShows})`,
              `Movies (${numberOfMovies})`,
            ]}
            value={credit_media_type}
            onChange={(e) => SelectFilterCredits(e as any, "credit_media_type")}
            searchable
          />
        </div>
      </MantineProvider>
    </>
  );
}
