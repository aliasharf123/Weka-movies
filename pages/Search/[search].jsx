import { useRouter } from "next/router";
import {  useState } from "react";

import useFetch from "@/src/useFetch";
import ResultsControl from "@/components/Results";
import GridOnIcon from '@mui/icons-material/GridOn';
import TableRowsIcon from '@mui/icons-material/TableRows';
import { Loader } from '@mantine/core';

import FlexResults from "@/components/FlexResults";
import GridResults from "@/components/GridResults";

function Search() {
    const router = useRouter()
    const [style ,setStyle] = useState(false)
    const search = router.query.search ; 
    const [resultstate , setResultsState] = useState('movie')
    const [page, setPage] = useState(1)
    const { data, loading } = useFetch(`https://api.themoviedb.org/3/search/${resultstate}?language=en-US&query=${search}&page=${page}`)


   
    if( !loading && data.total_pages == 0 ) {
        return (
            <ResultsControl search={search} resultstate={resultstate} setResultsState={setResultsState} setPage={setPage}>
                <h1 className="w-full  px-8 text-white">There are no movies that matched your query.</h1>
             </ResultsControl>
        )
    }

    if(loading){
        return ( 
             <ResultsControl search={search}  resultstate={resultstate} setResultsState={setResultsState} setPage={setPage}>
                <div className="w-screen h-screen ">
                    <Loader color='red' size='lg' className="w-full"/>
                </div>
             </ResultsControl>
            )
    }
    return ( 
            <ResultsControl search={search} resultstate={resultstate} setResultsState={setResultsState} setPage={setPage}>
                <div className=" sm:mx-10 mx-4 gap-5 flex justify-end">
                    <button  onClick={() =>setStyle(false)}>
                                <GridOnIcon className={!style && 'text-[#F4181C]' }/>
                    </button>
                    <button  onClick={() =>setStyle(true)}>
                                <TableRowsIcon className={style && 'text-[#F4181C]' }/>
                    </button>
                </div>
               {(style )?<FlexResults media={resultstate ==='movie' ? 'Movies':'TvShow'} setPage={setPage} data={data}/>:<GridResults media={resultstate ==='movie' ? 'Movies':'TvShow'}  setPage={setPage} data={data} /> }
            </ResultsControl>
    );
}

export default Search;

