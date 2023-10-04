"use client";
import useGetFilterParams from "@/src/hooks/useGetFilterParams";
import { Menu } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { DatePicker } from "@mantine/dates";

export default function ReleaseDatesMenu() {
  const { startDate, endDate } = useGetFilterParams();

  // get all navigation hooks
  const SearchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  // set a state for control a menu open
  const [opened, setOpened] = useState(false);

  // Change a parmas according to releses date
  const SelectRelesesDate = (
    date: Date | null,
    type: "startDate" | "endDate"
  ) => {
    const params = new URLSearchParams(SearchParams);
    // With clean select input
    if (!date) {
      params.delete(type);
    } else {
      //trun a date to sting

      // Get the year, month, and day components from the date
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1
      const day = String(date.getDate()).padStart(2, "0");

      // Form the formatted date string
      const formattedDate = `${year}-${month}-${day}`;
      // get a param
      const wantedparam = type === "startDate" ? startDate : endDate;
      if (!wantedparam) {
        params.append(type, formattedDate ?? "");
      } else {
        params.set(type, formattedDate ?? "");
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
      width={300}
      opened={opened}
      onChange={setOpened}
    >
      <Menu.Target>
        <button className="bg-[#25262B] w-32 text-sm items-center flex justify-between px-2 rounded  py-[0.37rem] text-[#C1C2C5] border-[0.5px] border-[#5C5F66]">
          Release Dates
          <IconChevronDown
            className={`${opened && "rotate-180"}  duration-200`}
            size={22}
          />
        </button>
      </Menu.Target>

      <Menu.Dropdown>
        {/* a from date input */}
        <Menu.Label>from:</Menu.Label>
        <div className="flex flex-col gap-2 px-3 pb-3">
          <div className="flex text-sm text-Paragraph flex-wrap gap-2">
            <DatePicker
              onChange={(e) => SelectRelesesDate(e, "startDate")}
              value={startDate ? new Date(startDate) : null}
            />
          </div>
        </div>

        <Menu.Divider />

        {/* a to date input */}
        <Menu.Label>to:</Menu.Label>
        <div className="flex flex-col gap-2 px-3 pb-3">
          <div className="flex text-sm text-Paragraph flex-wrap gap-2">
            <DatePicker
              onChange={(e) => SelectRelesesDate(e, "endDate")}
              value={endDate ? new Date(endDate) : null}
            />
          </div>
        </div>
      </Menu.Dropdown>
    </Menu>
  );
}
