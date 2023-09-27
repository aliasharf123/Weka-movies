import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Wilson from '../public/static/Screenshot_2023-09-27_120721-removebg-preview.png'
export default function NotFoundStyle() {
  return (
    <div className='h-screen w-full flex max-md:flex-col  text-white   gap-6  items-center justify-center'> 
        <div className='flex flex-col gap-5 max-md:items-center max-md:text-center px-4'>
          <h1 className='text-5xl font-medium max-md:text-4xl w-2/3'>Page you are looking for is <span className='text-redColor'>cast away</span> </h1>
          <Link href={'/'} className='RedBtn w-fit'>Take me back home</Link>
        </div>
        <div className='flex relative px-2 '>
          <Image  src={Wilson} width={600} height={600}  alt='wilson'/>
        </div>
    </div>
  )
}
