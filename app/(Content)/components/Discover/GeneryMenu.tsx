"use client";
import { Genere } from "@/src/data";
import useGetFilterParams from "@/src/hooks/useGetFilterParams";
import { Menu } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function GeneryMenu({type} : {type : 'tv' | 'movie'}) {
  const { genere } = useGetFilterParams();
  const GenereArray = type === 'movie' ? Genere.genres : Genere.genresTvShow
  // get all navigation hooks
  const SearchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  // set a state for control a menu open
  const [opened, setOpened] = useState(false);
  // Change a parmas according to generies
  const SelectGenry = (Genery: number) => {
    const params = new URLSearchParams(SearchParams);
    const GenriesArray = genere.split(",");

    if (GenriesArray.includes(Genery.toString())) {
      // remove a genery from array and then join all genery with sepratour
      const NewGenriesParams = GenriesArray.filter(
        (item) => Genery.toString() !== item
      ).join(",");
      // detecte if a remove Genery is a only Genery to delete a param
      if (NewGenriesParams.length) {
        params.set("genere", NewGenriesParams);
      } else {
        params.delete("genere");
      }
    } else {
      if (!genere) {
        params.append("genere", Genery.toString());
      } else {
        params.set("genere", genere + `,${Genery}`);
      }
    }
    // delete page param to reset pages to 1
    params.delete('page')
    router.push(pathName + "?" + params.toString(), { scroll: false });
  };
  return (
    <Menu
      withArrow
      shadow="md"
      width={350}
      opened={opened}
      onChange={setOpened}
    >
      <Menu.Target>
        <button className="bg-[#25262B] w-32 text-sm items-center flex justify-between px-2 rounded  py-[0.37rem] text-[#C1C2C5] border-[0.5px] border-[#5C5F66]">
          <div className="flex gap-1 ">
            Tags
            {genere && (
              <span className="bg-SecondaryText text-xs rounded-full flex justify-center items-center px-[0.5rem]">
                {genere.split(",").length}
              </span>
            )}
          </div>
          <IconChevronDown
            className={`${opened && "rotate-180"}  duration-200`}
            size={22}
          />
        </button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>tags:</Menu.Label>
        <div className="flex flex-col gap-2 px-3 pb-3">
          <div className="flex text-sm text-Paragraph flex-wrap gap-2">
            {GenereArray.map((genre) => (
              <button
                onClick={() => SelectGenry(genre.id)}
                key={genre.id}
                className={` ${
                  genere.split(",").includes(genre.id.toString())
                    ? "bg-[#F4181C] text-white"
                    : "bg-SecondaryText"
                }  hover:brightness-110 duration-200 px-2 rounded-2xl`}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>
      </Menu.Dropdown>
    </Menu>
  );
}
