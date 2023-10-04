"use client";
import useGetFilterParams from "@/src/hooks/useGetFilterParams";
import React, { useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { sortingOptions } from "@/src/SortingOptions";
import { Button, MantineProvider, Menu, Select, Text } from "@mantine/core";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { languges } from "@/src/data";
import {
  IconChevronDown,
  IconMessageCircle,
  IconPhoto,
  IconSearch,
  IconSettings,
} from "@tabler/icons-react";
import GeneryMenu from "./GeneryMenu";
import ReleaseDatesMenu from "./ReleaseDatesMenu";
export default function ShowFiltersAndSorting({type} : {type : 'tv' | 'movie'}) {
  const { sort, languge } = useGetFilterParams();
  // get all navigation hooks
  const SearchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  // change sort params
  const SortBy = (value: string) => {
    const params = new URLSearchParams(SearchParams);

    const SortParam = Object.keys(sortingOptions).find(
      (key) => value === sortingOptions[key]
    );
    if (!SearchParams.get("sort")) {
      params.append("sort", SortParam ?? "");
    } else {
      params.set("sort", SortParam ?? "");
    }
    // delete page param to reset pages to 1
    params.delete("page");
    router.push(pathName + "?" + params.toString(), { scroll: false });
  };
  // Change a parmas according to original Langauge
  const SelectOriginalLangauge = (Language: string) => {
    const params = new URLSearchParams(SearchParams);
    // With clean select input
    if (!Language) {
      params.delete("languge");
    } else {
      // get iso of language (iso_639_1)
      const Selectedlang = languges.find(
        (lang) => lang.english_name === Language
      )?.iso_639_1;
      if (!languge) {
        params.append("languge", Selectedlang ?? "");
      } else {
        params.set("languge", Selectedlang ?? "");
      }
    }
    // delete page param to reset pages to 1
    params.delete("page");
    router.push(pathName + "?" + params.toString(), { scroll: false });
  };
  return (
    <div className="md:flex flex-wrap justify-end items-end gap-3">
      <MantineProvider theme={{ colorScheme: "dark" }}>
        <div className="flex  gap-3  ">
          {/* Select Release Date */}
          <ReleaseDatesMenu />
          {/* Select Genery */}
          <GeneryMenu type={type}/>
        </div>
        {/* Select language */}
        <Select
          label="Select Original Language"
          placeholder="Pick value"
          onChange={SelectOriginalLangauge}
          value={
            languges.find((lang) => languge === lang.iso_639_1)?.english_name ??
            ""
          }
          data={languges.map((lang) => {
            return lang.english_name;
          })}
          clearable
          searchable
          mt="md"
        />
        {/* Select sorting type */}
        <Select
          label="Sort by"
          placeholder="Pick value"
          onChange={SortBy}
          value={sortingOptions[sort]}
          data={Object.values(sortingOptions)}
          mt="md"
        />
      </MantineProvider>
    </div>
  );
}
