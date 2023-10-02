"use client";
import React from "react";
import { Timeline, Text, MantineProvider } from "@mantine/core";
import { IconCircleDot } from "@tabler/icons-react";
import { CastCredit } from "@/types/credits";
import Image from "next/image";
import { defaultImage } from "@/src/defaultImage";
import Link from "next/link";
import RatingClient from "@/components/RatingClient";
import getInfo from "@/src/getInfo";
import { SortingMovie } from "@/src/SortingTech";

export default function TimelineCareer({ data }: { data: CastCredit[] }) {
  const Newestdata = data.sort((a , b) => SortingMovie(a , b ,  true ));
  return (
    <div className="grid gap-5 max-lg:px-6">
      {/* Title */}
      <h1 className="text-lg font-medium">Career Works</h1>
      {/* to make component in dark mode */}
      <MantineProvider theme={{ colorScheme: "dark" }}>
        {/* timeline  */}
        <Timeline color="red" bulletSize={24} lineWidth={2}>
          {Newestdata.map((content) => {
            const {title , realseData} = getInfo(content as any)
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
                      href={
                        content.media_type?.toUpperCase().startsWith("M")
                          ? `/Movies/${content.id}-${title?.replace(
                              " ",
                              "-"
                            )}`
                          : `/TvShow/${content.id}-${title?.replace(
                              " ",
                              "-"
                            )}`
                      }
                      passHref
                    >
                      <h1 className="font-medium text-lg break-words hover:text-redColor duration-200">
                        {title}
                      </h1>
                    </Link>
                    <Text c="dimmed"> as {content.character || 'no Character'}</Text>{" "}
                    {/*Character*/}
                    <div className="flex items-center gap-1 ">
                      <RatingClient rate={content.vote_average / 2} />
                      <h1 className="font-medium text-yellow-400">
                        {(content.vote_average / 2).toFixed(1)}
                      </h1>
                    </div>
                  </div>
                </div>
              </Timeline.Item>
            );
          })}
        </Timeline>
      </MantineProvider>
    </div>
  );
}
