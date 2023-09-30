import PaginationMovies from "@/components/PaginationMovies";
import { defaultImage } from "@/src/defaultImage";
import getInfo from "@/src/getInfo";
import { PageResult } from "@/types/PeopleType";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Popular People - Weka movies",
  description: "Welcome to Weka movies",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const page = searchParams?.page ?? "1";
  const res = await fetch(
    `https://api.themoviedb.org/3/person/popular?language=en-US&page=${page}&api_key=${process.env.NEXT_PUBLIC_DB_key}`
  );

  const people: PageResult = await res.json();
  return (
    <div className="px-16 mt-10 grid gap-8 rounded-xl max-md:text-center text-white">
      <h1 className="text-3xl">Popular people</h1>
      <div className="grid-cols-auto-fit   grid  gap-6 ">
        {people.results.map((person) => (
          <div className="bg-HeaderColor rounded-t-xl" key={person.id}>
            <Link
              href={`/People/${person.id}-${person.name.replaceAll(" ", "-")}`}
            >
              <div className="overflow-hidden rounded-t-xl">
                <Image
                  alt={person.name}
                  className="rounded-t-xl hover:scale-105 duration-200 hover:brightness-75 h-[300px] object-cover w-full"
                  width={200}
                  height={200}
                  src={
                    person.profile_path
                      ? `https://www.themoviedb.org/t/p/w500${person.profile_path}`
                      : defaultImage
                  }
                />
              </div>
            </Link>
            <div className="p-2 grid gap-1">
              <h1 className="text-lg">{person.name}</h1>
              <h1 className="text   text-sm w-full text-SecondaryText ">
                {person.known_for.map((content) => {
                  const { title, type } = getInfo(content as any);
                  return (
                    <span
                      className="w-fit  break-all  hover:text-redColor duration-200 cursor-pointer"
                      key={content.id}
                    >
                      <Link
                        href={`/${type}/${content.id}-${title?.replaceAll(
                          " ",
                          "-"
                        )}`}
                      >
                        {" "}
                        {title}
                      </Link>
                    </span>
                  );
                })}
              </h1>
            </div>
          </div>
        ))}
      </div>
      {people.total_pages > 1 && (
        <PaginationMovies page={page} value={people.total_pages} />
      )}
    </div>
  );
}
