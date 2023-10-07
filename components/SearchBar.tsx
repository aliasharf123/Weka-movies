"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import useSWR from "swr";
import { fetcher } from "./TrailerModel";
import { Content, ContentItem } from "@/types/ContentType";
import { Loader } from "@mantine/core";
import getInfo from "@/src/getInfo";
import Link from "next/link";
import { PersonResult } from "@/types/PeopleType";
import Image from "next/image";
import { defaultImage } from "@/src/defaultImage";

export default function SearchBar({
  opened,
  search,
  setSearch,
}: {
  opened: boolean;
  setSearch: any;
  search: string;
}) {
  const router = useRouter();
  // a results state
  const [results, setResults] = useState<ContentItem[] | undefined>();
  // loading state
  const [isLoading, setIsLoading] = useState<boolean>();

  // Function to handle form submission
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (search) {
      router.push(`/Search/movie/?q=${search}`);
    }
  };
  // Function to handle a input change
  const handleChange = async (e: any) => {
    setSearch(e.target.value);
    setIsLoading(true);
    const res = await fetch(
      `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
        e.target.value
      )}&include_adult=false&language=en-US&page=1&api_key=${
        process.env.NEXT_PUBLIC_DB_key
      }`
    );
    setIsLoading(false);
    const data: Content = await res.json();
    setResults(data.results);
  };

  return (
    <div
      className={`bottom-0  bg-HeaderColor  flex-col text-white justify-center items-center flex w-full border-t-[0.5px] border-[#F4181C] duration-300 transition-all z-50 absolute ${
        !opened ? "" : "translate-y-full"
      }`}
    >
      {/* A form search  */}
      <div className="border-b-[0.5px]  items-center border-SecondaryText flex justify-center w-full">
        <form
          onSubmit={handleSubmit}
          className="bg-[#1F1F1F] h-14 flex w-full md:w-[70%] px-2"
        >
          <input
            onBlur={() => setTimeout(() => setResults(undefined), 200)} // to close a reulsts when blur input 
            value={search}
            type="text"
            onChange={handleChange}
            className="outline-none text-white p-2 w-full bg-[#1F1F1F]"
            placeholder="i am looking for..."
          />
          <div className="m-auto flex gap-2">
            {isLoading && <Loader color="red" />}
            <button
              className="bg-[#F4181C] p-2 rounded-md px-4 hover:bg-red-600  "
              type="submit"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      {/* results of searching  */}
      {results && (
        <div className="flex flex-col gap-1  w-full truncate">
          {results.length ? (
            results.slice(0, 8).map((content, index) => {
              const { type, title } = getInfo(content);
              const TypeLink =
                type === "Movies"
                  ? "movie"
                  : (content as any).known_for_department
                  ? "person"
                  : "tv";
              return (
                <Link
                  className="w-full duration-200 py-1 px-3 hover:bg-WhiteTransparent flex justify-center"
                  href={`/Search/${TypeLink}?q=${title}`}
                  key={index}
                >
                  <div className="flex w-full md:w-[70%]  items-center gap-2">
                    <Image
                      alt={title as any}
                      width={30}
                      height={30}
                      className="w-11  rounded-md object-top object-cover h-11"
                      src={
                        content.poster_path || (content as any).profile_path
                          ? `https://image.tmdb.org/t/p/w500${
                              content.poster_path ||
                              (content as any).profile_path
                            }`
                          : defaultImage
                      }
                    />
                    <div>
                      <h1>{title}</h1>
                      <p className="text-Paragraph text-sm">{TypeLink}</p>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <h1 className="text-xl  my-2 text-center text-SecondaryText font-semibold">
              No Result
            </h1>
          )}
        </div>
      )}
    </div>
  );
}
