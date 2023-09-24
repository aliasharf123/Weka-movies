'use client'
import React from 'react'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Link from 'next/link';

// render if No Movies in Favoorie list
export default function NoList() {
  return (
    <div className='flex flex-col py-10 h-[12rem] justify-center items-center'>
      <BookmarkBorderIcon className='text- ' />
      <div className='m-auto text-center'>
          <p className='font-bold'>Your watchlist is empty</p>
          <p>Save shows and movies to keep track of what you want to watch.</p>
          <Link  href={'/Movies'} className='text-[#F4181C] mt-6 p-2 px-6 rounded-sm font-medium bg-[#121212]'>
              Browse Popular movies
          </Link>
      </div>
  </div>
  )
}
