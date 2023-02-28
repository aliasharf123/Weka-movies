import Image from "next/image";
import Link from "next/link";
import StarIcon from '@mui/icons-material/Star';
import useFetch from "@/src/useFetch";
import AddFavorite from "./Favorite";

function MoviesList({url}) {
    const {data , loading} = useFetch(url) 


 
    return (           
    <div className='overflow-scroll   overflow-y-hidden'>
    <div className='flex flex-row gap-3  w-[4000px]  ml-6 ' >
      {!loading && data.results.map(movie =>{
        return(
          <div key={movie.id} className='w-56 flex-wrap  relative '>
            <AddFavorite movie={movie}/>
            <Link href={movie.media_type === 'movie' ? `/Movies/${movie.id}` : `/TvShow/${movie.id}`}  passHref>
                {movie.poster_path && <Image  className="hover:brightness-90 duration-300"  src={`https://www.themoviedb.org/t/p/w500${movie.poster_path}`} alt={movie.id} width={10000} height={10000}/>}
            </Link>
            <div className=" bg-[#121212] h-28 p-2 rounded-b-lg ">
              <div className="flex flex-row">
                <StarIcon className="text-yellow-400 "/>
                <p className=" text-gray-300">{movie.vote_average}</p>
              </div>
              <Link  href={movie.media_type === 'movie' ? `/Movies/${movie.id}` : `/TvShow/${movie.id}`}  passHref>
                <h1 className="font-bold hover:text-[#F4181C] duration-300">{movie.title || movie.name}</h1>
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

