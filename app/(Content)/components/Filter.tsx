'use client'
import { Button, MantineProvider, Menu, SegmentedControl, Select } from '@mantine/core';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import FilterMenu from './FilterMenu';

export default function Filter() {
  const router = useRouter()
  return (
    <div className="text-white flex flex-col gap-2 mt-2">
      <MantineProvider theme={{ colorScheme: "dark" }}>
        <Link className="w-fit  sm:px-10" href={"/"}>
          {" "}
          <ChevronLeftIcon className="text-SecondaryText" /> Home
        </Link>
        <hr className="border-[#1D1F21] border-2" />
        <div className='sm:px-10  '>
          <SegmentedControl
            style={{ backgroundColor: "#1D1F21" }}
            className=" w-80"
            data={["Top Rated", "Popular", "Up Coming"]}
            />
        </div>
        <hr className="border-[#1D1F21] border-2" />
        <div className='sm:px-10 flex justify-end gap-2 my-2'>
          <FilterMenu >
            <button className='FilterBtn gap-1'>
              <AddIcon fontSize='small' className='text-SecondaryText'/>
              Add Filter
            </button>
          </FilterMenu>
          <button onClick={()=> router.push('/Movies')} className='FilterBtn  text-SecondaryText'>
            <RestartAltIcon/>
          </button>
        </div>
        
      </MantineProvider>
    </div>
  );
}
