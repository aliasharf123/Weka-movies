import React from 'react'
import ContentCard from '@/app/components/contentCard'
import { GetMovies } from '@/src/CRUD/GetMovies';
import NoList from './noList';
import { ContentItem } from '@/types/ContentType';
import { auth } from '@/firebase/Clients';

export const revalidate = 0 


export default async function WatchList() {
  const movies : ContentItem[] = await GetMovies(auth.currentUser as any)

  if(!movies.length) return <NoList/>

  return (
    <div className='overflow-scroll overflow-y-auto removeScroll '>
        <div className= 'flex  gap-5  ml-6  '>
            {movies.map((movie :any , index : number) => {
                return (
                    <ContentCard key={index} movie={movie.movie}/>
                )
            })}
        </div>
    </div>
  )
}
