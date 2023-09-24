'use client'

import React from 'react'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Link from 'next/link';

export default function NoUser() {
  console.log('Nouser')
  return (
    <div className="flex flex-col justify-center items-center h-[12rem]">
        <BookmarkBorderIcon className="text-6xl  bg-[rgba(0,0,0,0.4)] text-white" />
        <div className="flex flex-col  text-center items-center gap-2 ">
          <div className='grid place-content-center'>
            <p className="font-bold">Sign in to see suggestion</p>
            <p>
            Save shows and movies to keep track of what you want to watch.
            </p>
          </div>
          <Link
            href={'/signin'}
            className="p-2 px-6 rounded-lg font-medium bg-redColor w-fit"
            >
            Sign in to weka
          </Link>
        </div>
    </div>
  )
}
