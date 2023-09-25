'use client'
import { Menu } from '@mantine/core';
import React, { useState } from 'react'

export const dataSort = {
    'Highest Rated': 'vote_average.desc',
    'Lowest Rated': 'vote_average.asc',
    'Oldest Release': 'release_date.asc',
    'Newest Release': 'release_date.desc',
    'Most Popular': 'popularity.desc',
    'Least Popular': 'popularity.asc',
    'Lowest Revenue': 'revenue.asc',
    'Highest Revenue': 'revenue.desc',
    'Oldest Release Date': 'primary_release_date.asc',
    'Newest Release Date': 'primary_release_date.desc',
    'Title A-Z': 'original_title.asc',
    'Title Z-A': 'original_title.desc',
    'Lowest Vote Count': 'vote_count.asc',
    'Highest Vote Count': 'vote_count.desc'
  };
  
  

export default function FilterMenu({children}: {children : React.ReactNode}) {
    const [value, setValue] = useState<Date | null>(null);

  return (
    <Menu position="bottom-end">
      <Menu.Target>
        {children}
      </Menu.Target>

      <Menu.Dropdown>
        <div className='w-72 p-1 divide-y-2 flex flex-col gap-2 divide-SecondaryText'>
            <h1 className='text-lg'>Filter</h1>
            <div>
                <h1>sort by</h1>
                
            </div>
        </div>
      </Menu.Dropdown>
    </Menu>
  );
}
