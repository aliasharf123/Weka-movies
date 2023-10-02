"use client";
import RatingClient from "@/components/clientBottomTree/RatingClient";
import { SortingMovie } from "@/src/SortingTech";
import { defaultImage } from "@/src/defaultImage";
import getInfo from "@/src/getInfo";
import { CastCredit, CrewCredit } from "@/types/credits";
import { MantineProvider, Text, Timeline } from "@mantine/core";
import { IconCircleDot } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CategorizedMap } from "./TimelineCareer";
import { dataType } from "./FilterCredits";
import { useSearchParams } from "next/navigation";
import { getFilterCredits } from "@/src/getFilterCredits";

export default function TimelineDisplay({
  data,
}: {
  data: dataType;
}) {
  // destructure data 
  const {CategoriesTvCredits , CategoriesAllCredits ,CategoriesMovieCredits} = data 
  // get a params
  const SearchParams = useSearchParams();
  // get a params filter
  const credit_department = SearchParams.get("credit_department");
  const credit_media_type: "Tv" | "Movies" | null | "All" | string =
    SearchParams.get("credit_media_type");

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
  const CategoriesCredits = getFilterCredits(credit_media_type , credit_department , data);
  return (
    <MantineProvider theme={{ colorScheme: "dark" }}>
      {/* timeline by categories*/}
      <div className="divide-y-2 divide-HeaderColor grid gap-4">
        {CategoriesCredits ? Object.keys(CategoriesCredits).map(
          (
            categorie // map in credits Categorie
          ) => (
            <div className="grid gap-4 ">
              {/* credit name */}
              <h1 className="text-lg font-medium mt-3">{categorie}</h1>{" "}
              {/* Timeline Component */}
              <Timeline color="red" bulletSize={24} lineWidth={2}>
                {/* map in each movie inside Categories , sorted by newest  */}
                {CategoriesCredits[categorie]
                  .sort((a, b) => SortingMovie(a as any, b as any, true))
                  .map((content) => {
                    const { title, realseData, type } = getInfo(content as any);
                    return (
                      <Timeline.Item
                        bullet={<IconCircleDot size={15} />}
                        title={realseData}
                        className="w-full"
                      >
                        {/* Card content */}
                        <div className="bg-HeaderColor rounded-lg max-w-full w-fit flex mt-3 gap-3 p-2">
                          {/* Movie poster  */}
                          <Image
                            alt={content.original_title}
                            className="rounded-lg object-cover  w-[100px] h-[150px]"
                            src={
                              content.poster_path
                                ? `https://www.themoviedb.org/t/p/w500${content.poster_path}`
                                : defaultImage
                            }
                            width={100}
                            height={100}
                          />
                          {/* movie info section */}
                          <div className="flex flex-col break-words gap-1 pr-2">
                            <Link
                              href={`/${type}/${content.id}-${title?.replace(
                                " ",
                                "-"
                              )}`}
                              passHref
                            >
                              <h1 className="font-medium text-lg break-words hover:text-redColor duration-200">
                                {title}
                              </h1>
                            </Link>
                            {/*Character*/}
                            <Text c="dimmed">
                              {" "}
                              as{" "}
                              {(content as CastCredit).character ||
                                (content as CrewCredit).job}
                            </Text>{" "}
                            {/* Rating section */}
                            {content.vote_average ? (
                              <div className="flex items-center gap-1 ">
                                <RatingClient rate={content.vote_average / 2} />
                                <h1 className="font-medium text-yellow-400">
                                  {(content.vote_average / 2).toFixed(1)}
                                </h1>
                              </div>
                            ) : (
                              <div></div>
                            )}
                          </div>
                        </div>
                      </Timeline.Item>
                    );
                  })}
              </Timeline>
            </div>
          )
        ) : <h1>There isn't a credit fit filter</h1>}
      </div>
    </MantineProvider>
  );
}
