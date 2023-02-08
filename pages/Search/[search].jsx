import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const url = 'https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&query=asss&page=1&include_adult=false'

function Search({params} ) {
    const router = useRouter()
    const search = router.query.search ; 
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [resultstate , setResultsState] = useState('movie')
    const [error, setError] = useState(null)


    const fetchResults =async () =>{
        try {
            setLoading(true)
            const response = await fetch(`https://api.themoviedb.org/3/search/${resultstate}?api_key=${process.env.NEXT_PUBLIC_DB_key}&language=en-US&query=${search}&page=1`)
            const data = await response.json()
            setResults(data.results)
            setLoading(false)
        } catch (error) {
            setError(error)
            setLoading(false)
        }
    }
    useEffect(() => {fetchResults()}, [resultstate])
    if(loading){
        return ( 
             <div className="text-white flex flex-row mt-10 ">
                  <div className=" flex flex-col gap-4 bg-[#121212] w-[15%] rounded-lg h-52 ml-10 mt-16 mb-[1000px]">
                    <div className="bg-[#F4181C] h-full text-center align-middle rounded-t-lg  pt-8">
                        <h1>Search results</h1>
                    </div>
                    <div className="flex flex-col gap-16 ">
                        <button className={resultstate ==='movie' && `text-[#F4181C]`}  onClick={() => setResultsState('movie')}>Movies</button>
                        <button className={resultstate ==='tv' && `text-[#F4181C]`}   onClick={() => setResultsState('tv')}>Tv Show</button>
                    </div>
                </div>
                <div className="mx-36">Loading...</div>
            </div>
            )
    }
    return ( 
            <div className="text-white flex flex-row mt-10 ">
                <div className=" flex flex-col gap-4 bg-[#121212] w-[15%] rounded-lg h-52 ml-10 mt-16 mb-[1000px]">
                    <div className="bg-[#F4181C] h-full text-center align-middle rounded-t-lg  pt-8">
                        <h1>Search results</h1>
                    </div>
                    <div className="flex flex-col gap-16 ">
                        <button className={resultstate ==='movie' && `text-[#F4181C]`}  onClick={() => setResultsState('movie')}>Movies</button>
                        <button className={resultstate ==='tv' && `text-[#F4181C]`}   onClick={() => setResultsState('tv')}>Tv Show</button>
                    </div>

                </div>
                <div className="mx-36 flex flex-col gap-2 my-16 ">
                    {results.map(result =>{
                        return(
                            <div key={result.id} className='flex flex-row  bg-[#121212] rounded-lg'>
                            {result.poster_path ? <Image width={200} className='w-[100px] h-[150px] object-cover rounded-l-lg' height={300} src={`https://www.themoviedb.org/t/p/w220_and_h330_face${result.poster_path}`} alt={result.original_title} /> :  <Image width={200}  className='bg-slate-400 w-[100px] h-[150px] rounded-l-lg' height={300} src='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg' alt={result.original_title} />}
                                <div className=" m-6">
                                    <h3 className="text-1xl font-bold">{result.original_title || result.name}</h3>
                                    <p className="text-gray-300 mb-2">{result.release_date || result.first_air_date}</p>
                                    <p className="font-serif">{result.overview.slice(0,200)}...</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div> 
    );
}

export default Search;

