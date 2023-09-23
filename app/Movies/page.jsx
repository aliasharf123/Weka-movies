// Import necessary modules and components
'use client'
import GenereMovies from "@/components/Genere";
import MenuDrop from "@/components/menudrop";
import GridOnIcon from '@mui/icons-material/GridOn';
import TableRowsIcon from '@mui/icons-material/TableRows';
import { useState } from "react";
import useFetch from "@/src/useFetch";
import GridResults from "@/components/GridResults";
import FlexResults from "@/components/FlexResults";
import { Loader } from "@mantine/core";

// Define an array of sorting options
const dataSort = [
    'vote_average.desc',
    'vote_average.asc',
    'release_date.asc',
    'release_date.desc',
    'popularity.desc',
    'popularity.asc',
    'revenue.asc',
    'revenue.desc',
    'primary_release_date.asc',
    'primary_release_date.desc',
    'original_title.asc',
    'original_title.desc',
    'vote_count.asc',
    'vote_count.desc'
];

function Movies() {
    const [style, setStyle] = useState(false); // State to toggle between grid and table view
    const [page, setPage] = useState(1); // State to manage the current page of results
    const [languge, setLanguges] = useState('');
    const [sort, setSort] = useState('popularity.desc'); // State to manage sorting options
    const [years, setYears] = useState('');
    const [genere, setGenere] = useState('');
    const { data, loading } = useFetch(`https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=${sort}&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate${genere}${languge}${years}`)

    // Check if there are no search results
    if (!loading && data.total_pages == 0) {
        return (
            <div className={`m-11 ${loading && 'mb-[1000px]'} flex flex-col md:flex-row mt-[5.2rem]`}>
                <div className="flex  gap-4 flex-col  mx-auto   mb-10 max-lg:w-full" >
                    <div className={`flex justify-between  text-white   bg-[#121212]  px-1 py-2 rounded-lg   lg:w-56`}>
                        <button className={`m-auto`} onClick={() => setStyle(false)}>
                            <GridOnIcon className={!style && 'text-[#F4181C]' }/>
                        </button>
                        <button className={`m-auto`} onClick={() => setStyle(true)}>
                            <TableRowsIcon className={style && 'text-[#F4181C]' }/>
                        </button>
                    </div>
                    <MenuDrop setPage={setPage} setSort={setSort} dataSort={dataSort}/>
                    <GenereMovies setGenere={setGenere} genere={genere}  dataSort={dataSort}  setLanguges={setLanguges} setPage={setPage}  setYears={setYears} />
                </div>
                <div className="text-white mt-16 mb-5 w-full p-10"> There are no movies that matched your Filters.</div>
            </div>
        )
    }

    // Display loading indicator while fetching data
    if (loading) {
        return (
            <div className={`m-11 ${loading && 'mb-[1000px]'} flex flex-col md:flex-row mt-[5.2rem]`}>
                <div className="flex  gap-4 flex-col  mx-auto   mb-10 max-lg:w-full" >
                    <div className={`flex justify_between  text-white   bg-[#121212]  px-1 py-2 rounded-lg   lg:w-56`}>
                        <button className={`m-auto`} onClick={() => setStyle(false)}>
                            <GridOnIcon className={!style && 'text-[#F4181C]' }/>
                        </button>
                        <button className={`m-auto`} onClick={() => setStyle(true)}>
                            <TableRowsIcon className={style && 'text-[#F4181C]' }/>
                        </button>
                    </div>
                    <MenuDrop setPage={setPage} setSort={setSort} dataSort={dataSort}/>
                    <GenereMovies setGenere={setGenere} genere={genere}  dataSort={dataSort}  setLanguges={setLanguges} setPage={setPage}  setYears={setYears} />
                </div>
                <Loader color='red' size='lg' className="w-full"/>
            </div>
        )
    }

    // Render search results based on the selected style (grid or table view)
    return (
        <div className={`m-11 ${loading && 'mb-[1000px]'} flex flex-col md:flex-row mt-[5.2rem]`}>
            <div className="flex  gap-4 flex-col  mx-auto   mb-10 max-lg:w-full" >
                <div className={`flex justify-between  text-white   bg-[#121212]  px-1 py-2 rounded-lg   lg:w-56`}>
                    <button className={`m-auto`} onClick={() => setStyle(false)}>
                        <GridOnIcon className={!style && 'text-[#F4181C]' }/>
                    </button>
                    <button className={`m-auto`} onClick={() => setStyle(true)}>
                        <TableRowsIcon className={style && 'text-[#F4181C]' }/>
                    </button>
                </div>
                <MenuDrop setPage={setPage} setSort={setSort} dataSort={dataSort}/>
                <GenereMovies setGenere={setGenere} genere={genere}  dataSort={dataSort}  setLanguges={setLanguges} setPage={setPage}  setYears={setYears} />
            </div>
            {(style )?<FlexResults page={page} media={'Movies'} setPage={setPage} data={data}/>:<GridResults page={page}  media={'Movies'}  setPage={setPage} data={data} /> }
        </div>
    );
}

export default Movies;
