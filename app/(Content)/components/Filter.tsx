import Link from 'next/link'
import React from 'react'

export default function Filter() {
  return (
    <div className='text-white grid gap-3'>
      <Link href={'/'}> {'<'} Home</Link>
      <hr className='border-[#1D1F21] border-2'/>
    </div>
  )
}
