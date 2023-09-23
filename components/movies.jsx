'use client'

import Image from "next/image";
import Link from "next/link";
import StarIcon from '@mui/icons-material/Star';
import useFetch from "@/src/useFetch";
import AddFavorite from "./Favorite";
import { Loader } from "@mantine/core";
import Skeleton from '@mui/material/Skeleton';

function MoviesList({url}) {
    const {data , loading} = useFetch(url) 


 
    return (           
    <div className='overflow-scroll   overflow-y-hidden  '>
    <div className='flex flex-row gap-3  w-[4000px]   ml-6 ' >
      {!loading ? data.results.map(movie =>{
        return(
          <div key={movie.id} className='w-56 flex-wrap  relative bg-[#121212] '>
            <AddFavorite movie={movie}/>
            <Link href={movie.media_type === 'movie' ? `/Movies/${movie.id}` : `/TvShow/${movie.id}`}  passHref>
                {movie.poster_path && <Image  className="hover:brightness-90 duration-300 h-[70%]"  src={`https://www.themoviedb.org/t/p/w500${movie.poster_path}`} alt={movie.id} width={10000} height={10000}/>}
            </Link>
            <div className="p-2  rounded-b-lg h-fit">
              <div className="flex flex-row ">
                <StarIcon className="text-yellow-400 "/>
                <p className=" text-gray-300">{movie.vote_average.toString().slice(0,3)}</p>
              </div>
              <Link   href={movie.media_type === 'movie' ? `/Movies/${movie.id}` : `/TvShow/${movie.id}`}  passHref>
                <h1 className="font-semibold hover:text-[#F4181C] duration-300">{movie.title || movie.name}</h1>
              </Link>
              <p className="text-gray-300">{movie.release_date || movie.first_air_date}</p>
            </div>
          </div>
        )
        
      }): 
      <div className="flex gap-3">
      <Skeleton
      sx={{ bgcolor: 'grey.900' }}
      variant="rectangular"
      width='14rem'
      height='390px'
      />
         <Skeleton
      sx={{ bgcolor: 'grey.900' }}
      variant="rectangular"
      width='14rem'
      height='390px'
      />
         <Skeleton
      sx={{ bgcolor: 'grey.900' }}
      variant="rectangular"
      width='14rem'
      height='390px'
      />
         <Skeleton
      sx={{ bgcolor: 'grey.900' }}
      variant="rectangular"
      width='14rem'
      height='390px'
      />
           <Skeleton
      sx={{ bgcolor: 'grey.900' }}
      variant="rectangular"
      width='14rem'
      height='390px'
      />
           <Skeleton
      sx={{ bgcolor: 'grey.900' }}
      variant="rectangular"
      width='14rem'
      height='390px'
      />
      </div>
      }
    </div>
  </div> );
}

export default MoviesList;

