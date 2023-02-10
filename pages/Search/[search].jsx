import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import useFetch from "@/src/useFetch";
import ResultsControl from "@/components/Results";
import Link from "next/link";


function Search() {
    const router = useRouter()
    const search = router.query.search ; 
    const [resultstate , setResultsState] = useState('movie')
    const { data, loading } = useFetch(`https://api.themoviedb.org/3/search/${resultstate}?language=en-US&query=${search}&page=1`)


    if( !loading && data.total_pages == 0 ) {
        return (
            <ResultsControl resultstate={resultstate} setResultsState={setResultsState}>
                <h1 className="w-full">There are no movies that matched your query.</h1>
             </ResultsControl>
        )
    }
    if(loading){
        return ( 
             <ResultsControl resultstate={resultstate} setResultsState={setResultsState}>
                <h1 className="w-full">Loading...</h1>
             </ResultsControl>
            )
    }
    return ( 
            <ResultsControl resultstate={resultstate} setResultsState={setResultsState}>
                 <div className=" w-full px-10 flex flex-col gap-2 my-16 ">
                    {data.results.map(result =>{
                        return(
                            <Link key={result.id} href={`/Movies/${result.id}`} className='flex sm:flex-row flex-col    bg-[#121212] rounded-lg hover:scale-105 transform' passHref>
                            {result.poster_path ? <Image width={200} className='w-[100px] h-full object-cover sm:rounded-l-lg m-auto' height={300} src={`https://www.themoviedb.org/t/p/w220_and_h330_face${result.poster_path}`} alt={result.original_title} /> :  <Image width={200}  className='bg-slate-400 w-[100px] h-[150px] rounded-l-lg' height={300} src='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg' alt={result.original_title} />}
                                <div className="m-6">
                                    <h3 className="text-1xl font-bold">{result.original_title || result.name}</h3>
                                    <p className="text-gray-300 mb-2">{result.release_date || result.first_air_date}</p>
                                    <p className="font-serif">{result.overview.slice(0,200)}...</p>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </ResultsControl>
    );
}

export default Search;

