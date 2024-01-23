import Link from "next/link";
import React from "react";

type CollectionType = {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
};

export default function Collection({
  collection,
}: {
  collection: CollectionType;
}) {
  return (
    <div
      className="md:rounded-xl p-4 flex flex-col h-[38vh] justify-center gap-4  text-white bg-center  bg-cover bg-no-repeat   "
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),url(https://www.themoviedb.org/t/p/original${collection.backdrop_path})`,
      }}
    >
      <h1 className="text-3xl font-semibold">Part of {collection.name}</h1>

      <Link
        href={`/Collection/${collection.id}-${collection.name.replaceAll(
          " ",
          "-"
        )}`}
        className="RedBtn uppercase w-fit"
      >
        View the collection
      </Link>
    </div>
  );
}
