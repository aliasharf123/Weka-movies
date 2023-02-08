import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import StarIcon from '@mui/icons-material/Star';


function MoviesList({url}) {
    const [movies , setMovies] = useState()
    const fetchMovies = async () =>{
        const response = await fetch(url);
        const data = await response.json();
        setMovies(data.results)
        
    }
    useEffect(() =>{
        fetchMovies();
    }, [url]) 
    return (           
    <div className='overflow-scroll   overflow-y-hidden'>
    <div className='flex flex-row gap-3  w-[4000px]  ml-6' >
      {movies && movies.map(movie =>{
        return(
          <div key={movie.id} className='w-56 flex-wrap '>
            <Link  href={movie.media_type === 'movie' ? `/Movies/${movie.id}` : `/TvShow/${movie.id}`}  passHref>
                {movie.poster_path && <Image  src={`https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`} alt={movie.id} width={320} height={330}/>}
            </Link>
            <div className=" bg-[#121212] h-28 p-2 rounded-b-lg ">
              <div className="flex flex-row">
                <StarIcon className="text-yellow-400 "/>
                <p className=" text-gray-300">{movie.vote_average}</p>
              </div>
              <Link  href={movie.media_type === 'movie' ? `/Movies/${movie.id}` : `/TvShow/${movie.id}`}  passHref>
                <h1 className="font-bold hover:text-[#F4181C]">{movie.title || movie.name}</h1>
              </Link>
              <p className="text-gray-300">{movie.release_date || movie.first_air_date}</p>
            </div>
          </div>
        )
        
      }) }
    </div>
  </div> );
}

export default MoviesList;

