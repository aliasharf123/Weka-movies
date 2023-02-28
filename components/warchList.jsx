import Image from "next/image";
import Link from "next/link";
import StarIcon from '@mui/icons-material/Star';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { auth, GetMovies } from "@/firebase/Clients";
import { useRouter } from "next/router";

function WatchList() {
    const [user , loading ,error] = useAuthState(auth)
    const [docSnap , setDocSnap] = useState([])
    const router = useRouter()

    const getWatchList = async ()=>{
        if(user){
            const movie = await GetMovies(user)
            setDocSnap(movie)
        }

    }
    useEffect(()=>{
        getWatchList()
        console.log(docSnap)
    } ,[user ,docSnap ])

    if(!docSnap.length){
        return(
            <div className='flex flex-col py-10'>
                <BookmarkBorderIcon className='text-6xl  bg-[rgba(0,0,0,0.4)] text-white m-auto'/>
                <div className='m-auto text-center'>
                <p className='font-bold'>Your watchlist is empty</p>
                <p>Save shows and movies to keep track of what you want to watch.</p>
                <button onClick={() => router.push('/Movies')}  className='text-[#F4181C] mt-6    p-2 px-6 rounded-sm font-medium bg-[#121212]'>
                    Browse Popular movies
                </button>
                </div>
            </div>  
        )
    }      
    return (           
    <div className='overflow-scroll   overflow-y-hidden'>
    <div className='flex flex-row gap-3  w-fit  ml-6 ' >
      {!loading && docSnap.map(movie =>{
        return(
          <div key={movie.movie.id} className='w-48 flex-wrap  '>
            <Link href={movie.movie.media_type === 'movie' ? `/Movies/${movie.movie.id}` : `/TvShow/${movie.movie.id}`}  passHref>
                {movie.movie.poster_path && <Image  className="hover:brightness-90 duration-300"  src={`https://www.themoviedb.org/t/p/w500${movie.movie.poster_path}`} alt={movie.movie.id} width={10000} height={10000}/>}
            </Link>
            <div className=" bg-[#121212] h-28 p-2 rounded-b-lg ">
              <div className="flex flex-row">
                <StarIcon className="text-yellow-400 "/>
                <p className=" text-gray-300">{movie.movie.vote_average}</p>
              </div>
              <Link  href={movie.movie.media_type === 'movie' ? `/Movies/${movie.movie.id}` : `/TvShow/${movie.movie.id}`}  passHref>
                <h1 className="font-bold hover:text-[#F4181C] duration-300">{movie.movie.title || movie.movie.name}</h1>
              </Link>
              <p className="text-gray-300">{movie.movie.release_date || movie.movie.first_air_date}</p>
            </div>
          </div>
        )
        
      }) }
    </div>
  </div> );
}

export default WatchList;

