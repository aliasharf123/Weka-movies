import getInfo from '@/src/getInfo';
import { Content, ContentItem } from '@/types/ContentType';
import Image from 'next/image';
import React from 'react'
import {PlayCircleOutlined} from '@ant-design/icons'
export default async function Videos({url}: {url: string}) {
    const res  = await  fetch(url + `&api_key=${process.env.NEXT_PUBLIC_DB_key}` ,{next : {revalidate : 3600}})
    const data : any = await res.json()
    function HandelClick(movie: ContentItem){
            // handleToggle();
            // open();
            // setMovieNow(movie.id);
    }
    return (
        <>
            {data.results.map((movie : ContentItem) => {
            const { title, realseData } = getInfo(movie);
            const Year = new Date(realseData as any).getFullYear();
            return (
                <div
                className="gap-5 cursor-pointer flex-wrap relative text-center  h-[240px] "
                key={movie.id}
                >
                <div
                    className="cursor-pointer  relative  hover:scale-105 duration-300 flex justify-center items-center"
                    onClick={() => HandelClick(movie)}
                >
                    {movie.backdrop_path && (
                    <Image
                        className="object-cover rounded-xl brightness-[.80]"
                        alt={movie.id as any}
                        width={480}
                        height={240}
                        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                    />
                    )}
                    <PlayCircleOutlined  className='absolute text-white text-2xl'/>
                    <div className="absolute bottom-0 left-0 m-3">
                        <h1 className="font-medium">{title}</h1>
                        <h1 className="text-left text-gray-300">{Year}</h1>
                    </div>
                </div>
                </div>
            );
            })}
        </>
    );
}
