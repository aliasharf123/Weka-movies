import GenereMovies from "@/components/Genere";
import MenuDrop from "@/components/menudrop";
import PaginationMovies from "@/components/PaginationMovies";
import StarIcon from '@mui/icons-material/Star';
import GridOnIcon from '@mui/icons-material/GridOn';
import TableRowsIcon from '@mui/icons-material/TableRows';
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import useFetch from "@/src/useFetch";
import React from "react";

export const MoviesContext = React.createContext(null);

function Movies() {
    const [style ,setStyle] = useState(false)
    const [page , setPage] = useState(1)
    const [keyword , setKeyword] = useState('')
    const [languge , setLanguges] = useState('')
    const [sort , setSort] = useState('popularity.desc');
    const [years, setYears] = useState('')
    const [genere , setGenere] = useState('')
    const {data , loading } = useFetch(`https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=${sort}&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate${genere}${languge}${years}${keyword}`)


    if(loading){
        return(
            <MoviesContext.Provider value={{setSort , setPage , setYears  , setKeyword , setLanguges , setGenere , genere}}>
            <div className={`m-11 ${loading && 'mb-[1000px]'} flex flex-col lg:flex-row `}>
                <div className="flex  gap-4 flex-col  m-auto my-16" >
                    <div className={`flex justify-between  text-white   bg-[#121212]  px-1 py-2 rounded-lg w-56 `}>
                        <button className={`m-auto`} onClick={() =>setStyle(false)}>
                            <GridOnIcon className={!style && 'text-[#F4181C]' }/>
                        </button>
                        <button className={`m-auto`} onClick={() =>setStyle(true)}>
                            <TableRowsIcon className={style && 'text-[#F4181C]' }/>
                        </button>
                    </div> 
                    <MenuDrop/>
                    <GenereMovies/>
                </div>
                <div className="text-white mt-16 mb-5 w-full"> Loading</div>
            </div>
        </MoviesContext.Provider>
        )
    }
    
    return ( 
        <MoviesContext.Provider value={{setSort , setPage , setYears  , setKeyword , setLanguges , setGenere , genere}}>
            <div className={`m-11 ${loading && 'mb-[1000px]'} flex flex-col md:flex-row `}>
                <div className="flex  gap-4 flex-col  m-auto my-16" >
                    <div className={`flex justify-between  text-white   bg-[#121212]  px-1 py-2 rounded-lg w-56 `}>
                        <button className={`m-auto`} onClick={() =>setStyle(false)}>
                            <GridOnIcon className={!style && 'text-[#F4181C]' }/>
                        </button>
                        <button className={`m-auto`} onClick={() =>setStyle(true)}>
                            <TableRowsIcon className={style && 'text-[#F4181C]' }/>
                        </button>
                    </div> 
                    <MenuDrop/>
                    <GenereMovies/>
                </div>
            {(style )?
            
                <div className="flex flex-col justify-center mt-16 mb-5 text-white">
                        <div className=" w-full sm:px-10 px-0 flex flex-col gap-2 ">
                            {data.results.map(result =>{
                                return(
                                    <Link key={result.id} href={`/Movies/${result.id}`} className='flex flex-row  bg-[#121212] rounded-lg ' passHref>
                                    {result.poster_path ? <Image width={200} className='w-[120px]  object-cover sm:rounded-l-lg  ml-0'  height={300} src={`https://image.tmdb.org/t/p/w780${result.poster_path}`} alt={result.original_title} /> :  <Image width={200}  className='bg-slate-400 w-[100px] h-[150px] rounded-l-lg' height={300} src='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg' alt={result.original_title} />}
                                        <div className="m-2 sm:m-6 ">
                                            <h3 className="sm:text-1xl  font-bold text-sm ">{result.original_title || result.name}</h3>
                                            <p className="text-gray-300 text-sm mb-2 sm:text-1xl">{result.release_date || result.first_air_date}</p>
                                            <p className="font-serif sm:text-base text-xs">{result.overview.slice(0,500)}</p>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                        <PaginationMovies value={data.total_pages}  setPage={setPage}/>
                </div> :
                <div className="flex justify-center flex-col">
                    <div className='grid lg:grid-cols-5  md:grid-cols-3 grid-cols-2 w-full gap-3   sm:px-10 px-0  mb-5 mt-16 ' >
                        {data.results && data.results.map(movie =>{
                            return(
                                <div key={movie.id} className=' flex-wrap   w-auto '>
                            <Link   href={ `/Movies/${movie.id}` }   passHref>
                                {movie.poster_path  ? <Image  src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`} alt={movie.id} width={10000} height={10000}/> :<Image width={10000} className='bg-slate-400 h-[325px] rounded-l-lg' height={10000} src='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg' alt={movie.original_title} />}
                            </Link>
                            <div className=" bg-[#121212] h-28 p-2 rounded-b-lg ">
                                <div className="flex flex-row">
                                    <StarIcon className="text-yellow-400 "/>
                                    <p className=" text-gray-300">{movie.vote_average}</p>
                                </div>
                                <Link  href={ `/Movies/${movie.id}` }  passHref>
                                    <h1 className="font-bold hover:text-[#F4181C] text-white xl:text-base text-xs">{movie.title || movie.name}</h1>
                                </Link>
                                <p className="text-gray-300 ">{movie.release_date || movie.first_air_date}</p>
                            </div>
                            </div>
                        )
                            
                    }) }
                    </div> 
                    <PaginationMovies value={data.total_pages}   setPage={setPage}/>
                </div>
                }
            </div>
        </MoviesContext.Provider>
    );
}

export default Movies;

