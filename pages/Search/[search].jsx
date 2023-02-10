import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import useFetch from "@/src/useFetch";
import ResultsControl from "@/components/Results";
import Link from "next/link";
import SearchingMovies from "@/components/SearchingMovies";


function Search() {
    const router = useRouter()
    const search = router.query.search ; 
    const [resultstate , setResultsState] = useState('movie')
    const { data, loading } = useFetch(`https://api.themoviedb.org/3/search/${resultstate}?language=en-US&query=${search}&page=1`)


    if( !loading && data.total_pages == 0 ) {
        return (
            <ResultsControl resultstate={resultstate} setResultsState={setResultsState}>
                <h1 className="w-full my-16 px-8">There are no movies that matched your query.</h1>
             </ResultsControl>
        )
    }
    if(loading){
        return ( 
             <ResultsControl resultstate={resultstate} setResultsState={setResultsState}>
                <h1 className="w-full my-16 px-8">Loading...</h1>
             </ResultsControl>
            )
    }
    return ( 
            <ResultsControl resultstate={resultstate} setResultsState={setResultsState}>
                <SearchingMovies data={data}/>
            </ResultsControl>
    );
}

export default Search;

