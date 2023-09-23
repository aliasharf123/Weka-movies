// Import necessary modules and components
'use client'
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import useFetch from "@/src/useFetch";
import ResultsControl from "@/components/Results";
import GridOnIcon from '@mui/icons-material/GridOn';
import TableRowsIcon from '@mui/icons-material/TableRows';
import { Loader } from '@mantine/core';
import FlexResults from "@/components/FlexResults";
import GridResults from "@/components/GridResults";

function Search() {
    const router = useRouter()
    const [style, setStyle] = useState(false) // State to toggle between grid and table view
    const search =  useParams()['search'] // get a search param 
    const [resultstate, setResultsState] = useState('movie'); // State to manage the type of search results (e.g., movie, TV show)
    const [page, setPage] = useState(1); // State to manage the current page of results
    const { data, loading } = useFetch(`https://api.themoviedb.org/3/search/${resultstate}?language=en-US&query=${search}&page=${page}`)

    // Check if there are no search results
    if (!loading && data.results.length === 0) {
        return (
            <ResultsControl search={search} resultstate={resultstate} setResultsState={setResultsState} setPage={setPage}>
                <h1 className="w-full  px-8 text-white text-center">There are no movies that matched your query.</h1>
            </ResultsControl>
        )
    }

    // Display loading indicator while fetching data
    if (loading) {
        return (
            <ResultsControl search={search} resultstate={resultstate} setResultsState={setResultsState} setPage={setPage}>
                <div className="w-screen h-screen ">
                    <Loader color='red' size='lg' className="w-full"/>
                </div>
            </ResultsControl>
        )
    }

    // Render search results based on the selected style (grid or table view)
    return (
        <ResultsControl search={search} resultstate={resultstate} setResultsState={setResultsState} setPage={setPage}>
            <div className=" sm:mx-10 mx-4 gap-5 flex justify-end">
                <button onClick={() => setStyle(false)}>
                    <GridOnIcon className={!style && 'text-[#F4181C]'}/>
                </button>
                <button onClick={() => setStyle(true)}>
                    <TableRowsIcon className={style && 'text-[#F4181C]'}/>
                </button>
            </div>
            {style ? <FlexResults media={resultstate === 'movie' ? 'Movies' : 'TvShow'} page={page} setPage={setPage} data={data}/> : <GridResults media={resultstate === 'movie' ? 'Movies' : 'TvShow'} page={page} setPage={setPage} data={data} /> }
        </ResultsControl>
    );
}

export default Search;