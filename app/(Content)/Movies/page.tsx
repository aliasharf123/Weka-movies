// Import necessary modules and components

import GridResults from "@/components/GridResults";
import Filter from "../components/Filter";
import { makeQueryClient } from "@/app/components/TrendingSection/movies";

// Define an array of sorting options

export const metadata = {
    title: 'Explore movies - Weka movies',
    description: 'Welcome to Weka movies',
  }
interface Params  {
    searchParams :{
        style: 1 | 0,  // 1 mean flex layout and 0 is grid
        page: number | undefined,
        languge : string | undefined
        sort: 'vote_average.desc'|
        'vote_average.asc'|
        'release_date.asc'|
        'release_date.desc'|
        'popularity.desc'|
        'popularity.asc'|
        'revenue.asc'|
        'revenue.desc'|
        'primary_release_date.asc'|
        'primary_release_date.desc'|
        'original_title.asc'|
        'original_title.desc'|
        'vote_count.asc'|
        'vote_count.desc' | undefined,
        years : string | undefined,
        genere : string | undefined
    }, 
}
const queryClient = makeQueryClient() // to cache a decripe url 
export default async function Movies({searchParams} : Params) {
    // const style = searchParams.style ?? 1 // State to toggle between grid and table view
    const page = searchParams.page ?? '' // State to manage the current page of results
    const languge = searchParams.languge ?? ''
    const sort = searchParams.sort ?? 'popularity.desc' // State to manage sorting options
    const years = searchParams.years ?? ''
    const genere = searchParams.genere ?? ''
    const url = `https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=${sort}&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate${genere}${languge}${years}&`
    // const { data, loading } = useFetch(`https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=${sort}&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate${genere}${languge}${years}`)
    const data = await queryClient(url ,() => fetch(url + `&api_key=${process.env.NEXT_PUBLIC_DB_key}` ).then((res)=> res.json()))

    // // Check if there are no search results
    // if (!loading && data.total_pages == 0) {
    //     return (
    //         <div className={`m-11 ${loading && 'mb-[1000px]'} flex flex-col md:flex-row mt-[5.2rem]`}>
    //             <div className="flex  gap-4 flex-col  mx-auto   mb-10 max-lg:w-full" >
    //                 <div className={`flex justify-between  text-white   bg-[#121212]  px-1 py-2 rounded-lg   lg:w-56`}>
    //                     <button className={`m-auto`} onClick={() => setStyle(false)}>
    //                         <GridOnIcon className={!style && 'text-[#F4181C]' }/>
    //                     </button>
    //                     <button className={`m-auto`} onClick={() => setStyle(true)}>
    //                         <TableRowsIcon className={style && 'text-[#F4181C]' }/>
    //                     </button>
    //                 </div>
    //                 <MenuDrop setPage={setPage} setSort={setSort} dataSort={dataSort}/>
    //                 <GenereMovies setGenere={setGenere} genere={genere}  dataSort={dataSort}  setLanguges={setLanguges} setPage={setPage}  setYears={setYears} />
    //             </div>
    //             <div className="text-white mt-16 mb-5 w-full p-10"> There are no movies that matched your Filters.</div>
    //         </div>
    //     )
    // }

    // // Display loading indicator while fetching data
    // if (loading) {
    //     return (
    //         <div className={`m-11 ${loading && 'mb-[1000px]'} flex flex-col md:flex-row mt-[5.2rem]`}>
    //             <div className="flex  gap-4 flex-col  mx-auto   mb-10 max-lg:w-full" >
    //                 <div className={`flex justify_between  text-white   bg-[#121212]  px-1 py-2 rounded-lg   lg:w-56`}>
    //                     <button className={`m-auto`} onClick={() => setStyle(false)}>
    //                         <GridOnIcon className={!style && 'text-[#F4181C]' }/>
    //                     </button>
    //                     <button className={`m-auto`} onClick={() => setStyle(true)}>
    //                         <TableRowsIcon className={style && 'text-[#F4181C]' }/>
    //                     </button>
    //                 </div>
    //                 <MenuDrop setPage={setPage} setSort={setSort} dataSort={dataSort}/>
    //                 <GenereMovies setGenere={setGenere} genere={genere}  dataSort={dataSort}  setLanguges={setLanguges} setPage={setPage}  setYears={setYears} />
    //             </div>
    //             <Loader color='red' size='lg' className="w-full"/>
    //         </div>
    //     )
    // }
    // Render search results based on the selected style (grid or table view)
    return (
        <div className={'grid px-2 gap-3'}>
            <Filter/>
            {/* {(style )? */}
            {/* // <FlexResults page={page} media={'Movies'} data={data}/> */}
            {/* // : */}
            <GridResults page={page}  media={'Movies'}   data={data} /> 
            {/* // } */}
        </div>
    );
}

