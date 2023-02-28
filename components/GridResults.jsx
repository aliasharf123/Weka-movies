import StarIcon from '@mui/icons-material/Star';
import Image from "next/image";
import Link from 'next/link';
import AddFavorite from './Favorite';
import PaginationMovies from './PaginationMovies';



function GridResults({data , setPage , media}) {

  
    return ( 
        <div className="flex justify-center flex-col">
        <div className='grid lg:grid-cols-5  md:grid-cols-3 grid-cols-2 w-full gap-3   sm:px-10 px-2  mb-5 ' >
                {data.results && data.results.map(movie =>{
                    return(
                        <div key={movie.id} className=' flex-wrap   w-auto relative top-0'>
                            <AddFavorite movie={movie}/>
                            <Link   href={ `/${media}/${movie.id}` }   passHref>
                                {movie.poster_path  ? <Image  src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`} alt={movie.id} width={1000} height={1000} unoptimized/> :<Image width={1000} className='bg-slate-400 h-[325px] ' height={1000} src='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg' alt={movie.original_title} unoptimized/>}
                            </Link>
                            <div className=" bg-[#121212] h-28 p-2 rounded-b-lg ">
                                <div className="flex flex-row">
                                    <StarIcon className="text-yellow-400 "/>
                                    <p className=" text-gray-300">{movie.vote_average}</p>
                                </div>
                                <Link  href={ `/${media}/${movie.id}` }  passHref>
                                    <h1 className="font-bold hover:text-[#F4181C] text-white xl:text-base text-xs">{movie.title || movie.name}</h1>
                                </Link>
                                <p className="text-gray-300 ">{movie.release_date || movie.first_air_date}</p>
                            </div>
                        </div>
                )
                    
            }) }
            </div> 
            {data.total_pages  > 1 &&<PaginationMovies value={data.total_pages}   setPage={setPage}/>}
        </div>
     );
}

export default GridResults;