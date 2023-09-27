import React from 'react'
import Link from 'next/link';
import BookmarkBorderIconClient from '@/components/BookmarkBorderIconClient';

export default function NoUser() {
  return (
    <div className="flex flex-col justify-center items-center h-[12rem]">
        <div className='text-6xl bg-[rgba(0,0,0,0.4)] text-white'>
          <BookmarkBorderIconClient/>
        </div>
        <div className="flex flex-col  text-center items-center gap-2 ">
          <div className='grid place-content-center px-2'>
            <p className="font-bold">Sign in to see suggestion</p>
            <p className='italic text-SecondaryText'>
            It says here we should work in teams. Who wants to be my spotter?
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
