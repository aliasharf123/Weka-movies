import ArrowBackIconClient from "@/components/clientBottomTree/ArrowBackIconClient";
import { defaultImage } from "@/src/defaultImage";
import getInfo from "@/src/getInfo";
import { ContentItem } from "@/types/ContentType";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function HeaderContent({ movie }: { movie: ContentItem }) {
  const { title, realseData, type } = getInfo(movie);
  return (
    <div className="flex gap-2 h-32 px-5 md:px-10 p-4">
      <Image
        alt={movie.id as any}
        src={
          movie.poster_path
            ? `https://www.themoviedb.org/t/p/original${movie.poster_path}`
            : defaultImage
        }
        className="h-full object-contain "
        width={100}
        height={100}
      />
      <div className="flex flex-col truncate justify-center">
        <h1 className="text-3xl truncate font-medium">
          {title}{" "}
          <span className="text-SecondaryText font-normal">
            ({new Date(realseData as any).getFullYear()})
          </span>
        </h1>
        <Link
          className="font-medium hover:brightness-75 duration-200 text-SecondaryText"
          href={`/${type}/${movie.id}-${title?.replaceAll(" ", "-")}`}
        >
          <ArrowBackIconClient />
          Back to home
        </Link>
      </div>
    </div>
  );
}
