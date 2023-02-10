import Image from "next/image";
import Link from "next/link";


function SearchingMovies({data}) {

    return ( 
        <div className=" w-full px-10 flex flex-col gap-2 my-16">
            {data.results.map(result =>{
                return(
                    <Link key={result.id} href={`/Movies/${result.id}`} className='flex flex-row  bg-[#121212] rounded-lg ' passHref>
                    {result.poster_path ? <Image width={200} className='w-[100px] h-full object-cover sm:rounded-l-lg m-auto' height={300} src={`https://www.themoviedb.org/t/p/w220_and_h330_face${result.poster_path}`} alt={result.original_title} /> :  <Image width={200}  className='bg-slate-400 w-[100px] h-[150px] rounded-l-lg' height={300} src='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg' alt={result.original_title} />}
                        <div className="m-2 sm:m-6">
                            <h3 className="sm:text-1xl  font-bold text-sm ">{result.original_title || result.name}</h3>
                            <p className="text-gray-300 text-sm mb-2 sm:text-1xl">{result.release_date || result.first_air_date}</p>
                            <p className="font-serif sm:text-base text-xs">{result.overview.slice(0,200)}...</p>
                        </div>
                    </Link>
                )
            })}
        </div>
     );
}

export default SearchingMovies;