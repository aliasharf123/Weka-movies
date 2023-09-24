import { ContentItem } from "@/types/ContentType";
import Image from "next/image";
import Link from "next/link";
import { GenresMap } from "@/src/GenreMap";
import AddFavorite from "@/components/Favorite";
import getInfo from "@/src/getInfo";

async function getRandomMovie() : Promise<ContentItem> {
    // Fetch data from the API using the API key from environment variables
    const response = await fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.NEXT_PUBLIC_DB_key}` , {next: {revalidate: 60}});
    
    // Parse the JSON response
    const data = await response.json();

    // Generate a random index to select a backdrop image
    const randomIndex = Math.floor(Math.random() * data.results.length);

    // Get the random movie
    const movie = data.results[randomIndex];

    return movie;

}

export default async function BackgroundSection() {
    const data = await getRandomMovie()
    const {title , type} = getInfo(data)
    return ( 
        <div className="relative  lg:my-5 ">
            {/* Background Image */}
            <Image
            width={100000}
            height={1000000}
            priority
            className="object-cover w-full h-[500px] brightness-75 lg:rounded-xl   shadow-white bg-HeaderColor"
            src={`https://www.themoviedb.org/t/p/w1280${data.backdrop_path}`}
            alt="main"
            />
            {/* Content Overlay */}
            <div className="absolute z-20 text-slate-100 bottom-0 p-8 lg:p-14 flex flex-col gap-8">
                <div className="grid gap-4">
                    <h1 className="font-bold text-5xl">{title}</h1>
                    <div className="flex gap-2 items-center">
                        <h1 className="text flex text-slate-300">
                            {data.genre_ids.length ? data.genre_ids.map((genreId , index)=>{
                                const GeneryName = GenresMap[genreId.toString() as keyof typeof GenresMap]
                            return <span key={index}>{GeneryName?.toUpperCase()}</span>
                            }) : <span>No Genre</span>}
                        </h1>
                        <h1 >{(data.vote_average * 10).toFixed(1)}% Rating</h1>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Link href={`${type}/${data.id}`} className="bg-[#F4181C] hover:bg-red-600 rounded-lg p-2 px-4 text-lg items-center flex">See More</Link>
                    <button className="relative flex justify-center items-center text-xl p-3  rounded-lg bg-[rgba(255,255,255,0.1)] ">
                        <AddFavorite movie={data} media={data.media_type} Flex={false} single={true} />
                    </button>
                </div>
            </div>
        </div>
     );
}
