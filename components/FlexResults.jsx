import Image from "next/image";
import Link from "next/link";
import PaginationMovies from "./PaginationMovies";


function FlexResults({data , setPage , media}) {
    return ( 
        <div className="flex flex-col justify-center   text-white">
            <div className=" w-full sm:px-10 px-2 flex flex-col gap-2 ">
                {data.results.map(result =>{
                    return(
                        <Link key={result.id} href={`/${media}/${result.id}`} className='flex flex-row  bg-[#121212] rounded-lg ' passHref>
                        {result.poster_path ? <Image width={200} className='w-[140px]  object-cover sm:rounded-l-lg  ml-0'  height={300} src={`https://image.tmdb.org/t/p/w780${result.poster_path}`} alt={result.original_title}  unoptimized/> :  <Image width={200} unoptimized  className='bg-slate-400 w-[140px]  rounded-l-lg' height={300} src='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg' alt={result.original_title} />}
                            <div className="m-2 sm:m-6 ">
                                <h3 className="sm:text-1xl  font-bold text-sm ">{result.original_title || result.name}</h3>
                                <p className="text-gray-300 text-sm mb-2 sm:text-1xl">{result.release_date || result.first_air_date}</p>
                                <p className="font-serif sm:text-base text-xs">{result.overview.slice(0,500)}</p>
                            </div>
                        </Link>
                    )
                })}
            </div>
            {data.total_pages  > 1 &&<PaginationMovies value={data.total_pages}   setPage={setPage}/>}
    </div> 
     );
}

export default FlexResults;