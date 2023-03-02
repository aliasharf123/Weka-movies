import GenereMovies from "@/components/Genere";
import MenuDrop from "@/components/menudrop";
import GridOnIcon from '@mui/icons-material/GridOn';
import TableRowsIcon from '@mui/icons-material/TableRows';
import { useState } from "react";
import useFetch from "@/src/useFetch";
import React from "react";
import GridResults from "@/components/GridResults";
import FlexResults from "@/components/FlexResults";
import { Loader } from "@mantine/core";

const dataSort =[
    'vote_average.desc',
    'vote_average.asc',
    'first_air_date.desc',
    'first_air_date.asc',
    'popularity.desc',
    'popularity.asc'
]

function TvShow() {
    const [style ,setStyle] = useState(false)
    const [page , setPage] = useState(1)
    const [languge , setLanguges] = useState('')
    const [sort , setSort] = useState('popularity.desc');
    const [years, setYears] = useState('')
    const [genere , setGenere] = useState('')
    const {data , loading } = useFetch(`https://api.themoviedb.org/3/discover/tv?language=en-US&sort_by=${sort}&page=${page}&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate${genere}${languge}${years}`)



    if( !loading && data.total_pages == 0 ) {
        return (
            <div className={`m-11 ${loading && 'mb-[1000px]'} flex flex-col lg:flex-row mt-[5.2rem]`}>
                <div className="flex  gap-4 flex-col  mx-auto  mb-10 " >
                    <div className={`flex justify-between  text-white   bg-[#121212]  px-1 py-2 rounded-lg w-56 `}>
                        <button className={`m-auto`} onClick={() =>setStyle(false)}>
                            <GridOnIcon className={!style && 'text-[#F4181C]' }/>
                        </button>
                        <button className={`m-auto`} onClick={() =>setStyle(true)}>
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
    if(loading){
        return(
            <div className={`m-11 ${loading && 'mb-[1000px]'} flex flex-col lg:flex-row  mt-[5.2rem]`}>
                <div className="flex  gap-4 flex-col  mx-auto  mb-10" >
                    <div className={`flex justify-between  text-white   bg-[#121212]  px-1 py-2 rounded-lg w-56 `}>
                        <button className={`m-auto`} onClick={() =>setStyle(false)}>
                            <GridOnIcon className={!style && 'text-[#F4181C]' }/>
                        </button>
                        <button className={`m-auto`} onClick={() =>setStyle(true)}>
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
    
    return ( 
            <div className={`m-11 ${loading && 'mb-[1000px]'} flex flex-col md:flex-row mt-[5.2rem]`}>
                <div className="flex  gap-4 flex-col  mx-auto  mb-10" >
                    <div className={`flex justify-between  text-white   bg-[#121212]  px-1 py-2 rounded-lg w-56 `}>
                        <button className={`m-auto`} onClick={() =>setStyle(false)}>
                            <GridOnIcon className={!style && 'text-[#F4181C]' }/>
                        </button>
                        <button className={`m-auto`} onClick={() =>setStyle(true)}>
                            <TableRowsIcon className={style && 'text-[#F4181C]' }/>
                        </button>
                    </div> 
                    <MenuDrop setPage={setPage} setSort={setSort} dataSort={dataSort}/> 
                    <GenereMovies setGenere={setGenere} genere={genere}  dataSort={dataSort} setLanguges={setLanguges} setPage={setPage}  setYears={setYears} />
                </div>
            {(style )?<FlexResults page={page} media={'TvShow'} setPage={setPage} data={data}/>:<GridResults media={'TvShow'}  page={page}   setPage={setPage} data={data} /> }
            </div>
    );
}

export default TvShow;

