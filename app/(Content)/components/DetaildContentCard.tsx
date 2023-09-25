'use client'
import AddFavorite from '@/components/Favorite'
import { darkTheme } from '@/components/PaginationMovies'
import { GenresMap } from '@/src/GenreMap'
import { shimmer, toBase64 } from '@/src/blurUrl'
import getInfo from '@/src/getInfo'
import { ContentItem } from '@/types/ContentType'
import { Rating, ThemeProvider } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function DetaildContentCard({movie} : {movie : ContentItem}) {
    const {title , type , realseData} = getInfo(movie)
    const RealeseYear = new Date(realseData as any).getFullYear()
    const rate = movie.vote_average /2
    return (
        <Link href={`/Movies/${movie.id}`}>
            <div className='group '>
                <div className='overflow-hidden rounded-t-xl '>
                    {movie.poster_path && <Image className=" rounded-t-xl group-hover:brightness-75  duration-300 group-hover:scale-105"   src={`https://www.themoviedb.org/t/p/w500${movie.poster_path}`} alt={title as any} width={400} height={200} />}
                    
                </div>  
                <div className='bg-[#1D1F21] text-white p-3 rounded-b-xl flex flex-col gap-1'>
                    <h1 className='font-medium text-lg truncate group-hover:text-redColor duration-300'>{title}</h1> 
                <h1 className='text-[#515457] flex gap-2 textLine text-sm'>
                        {movie.genre_ids.slice(0,2).map((genreId)=>(
                            <span key={genreId}>{GenresMap[genreId.toString() as keyof typeof GenresMap]}</span>
                        ))}
                </h1>
                <ThemeProvider theme={darkTheme}>
                        <Rating  size='small' readOnly  name="half-rating" defaultValue={rate} precision={0.5} />
                </ThemeProvider>
                </div>
            </div>
        </Link>
    )
}
