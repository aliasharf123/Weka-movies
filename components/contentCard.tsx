'use client'
import { ContentItem } from "@/types/ContentType";
import AddFavorite from "./Favorite";
import Link from "next/link";
import Image from "next/image";
import StarIcon from '@mui/icons-material/Star';
import getInfo from "@/src/getInfo";

export default function ContentCard({movie} : {movie : ContentItem}) {
    const {title , type , realseData} = getInfo(movie)
    const RealeseYear = new Date(realseData as any).getFullYear()
    
    return ( 
        <div key={movie.id} className='relative   min-w-[12rem] max-w-[12rem]'>
            {movie.poster_path && <Image className=" rounded-xl brightness-[.80] duration-300   relative w-full h-full"  src={`https://www.themoviedb.org/t/p/w500${movie.poster_path}`} alt={title as any} width={300} height={200} />}
            <div className="flex  top-0 absolute bg-black rounded-full p-1 px-2 m-2 text-xs  items-center">
                <StarIcon fontSize="inherit" className="text-yellow-400 " />
                <p className=" text-gray-300">{movie.vote_average}</p>
            </div>
            <div className="p-2 rounded-b-lg h-fit pb-2 absolute bottom-0 w-full flex flex-col gap-3">
                <div className="grid leading-5">
                    <h1 className="font-semibold  duration-300 truncate">{title}</h1>
                    <p className="text-gray-300">{RealeseYear}</p>
                </div>
                <div className="flex gap-2 justify-between">
                    <Link href={movie.media_type?.toUpperCase().startsWith('M') ? `/Movies/${movie.id}` : `/TvShow/${movie.id}`} passHref className="bg-redColorTransparent rounded-lg px-2 p-1 ">See More</Link>
                    <div className="bg-WhiteTransparent rounded-lg flex justify-center items-center  relative px-2 text-xl">
                         <AddFavorite movie={movie} Flex={false} media={movie.media_type}  single={false}/>
                    </div>
                </div>
            </div>
        </div>
     );
}

