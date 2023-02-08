import Image from "next/image";
import { useEffect, useState } from "react";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function Video() {
    const [enabled, setEnabled] = useState('In Theaters');
    const [url, setUrl] = useState(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_DB_key}&language=en-US&page=1`)
    const [movies , setMovies] = useState()
    const [TVorMovie, setTVorMovie] = useState()
    const [open, setOpen] = useState(false);

    const handleClose = () => {
      setOpen(false);
    };

    const handleToggle = () => {
      setOpen(!open);
    };
    const fetchMovies = async () =>{
        if(url){
            const response = await fetch(url);
            const data = await response.json();
            setMovies(data.results)
        }
    }
    const fetchVideo = async (url) =>{
           
    }
    
    useEffect(() =>{
        fetchMovies();
    }, [url]) 
    const handleToggleState = () =>{
        if(enabled === 'In Theaters'){
            return 'w-28 left-0'
        }   
        else if(enabled === 'On Tv'){
            return 'w-24 left-28 '
        }
        else if(enabled === 'Streaming'){
            return 'w-28 left-[12.82rem]'
        }
    }
    return ( 
        <div>
            <div className='flex flex-row gap-6 '>
                <h1 className="text-header">Trailer</h1>
                <div className='flex border-2 border-[#F4181C] px-2 gap-[3.2rem]  rounded-full w-80 h-8 relative mt-1'>
                    <button onClick={() => {
                        setEnabled('In Theaters')
                        setUrl(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_DB_key}&language=en-US&page=1`)
                        setTVorMovie('movie')
                       }} className={`z-20 ${enabled === 'In Theaters' && 'text-black'}`}>
                        In Theaters 
                    </button>
                    <div className={`absolute  bg-[#F4181C]  ${handleToggleState()} h-8    -top-[2px] rounded-full duration-150 `}>
                    {' '}
                    </div>
                    <button onClick={() => {
                        setEnabled('On Tv')
                        setUrl(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.NEXT_PUBLIC_DB_key}&language=en-US&page=1`)
                        setTVorMovie('tv')

                        }} className={`z-20    ${enabled === 'On Tv'&& 'text-black'}  `}>
                        On Tv
                    </button>
                    <button onClick={() => {
                        setEnabled('Streaming')
                        setUrl(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_DB_key}&with_watch_providers=337&watch_region=CA`)
                        setTVorMovie('tv')
                        }} className={`z-20    ${enabled === 'Streaming'&& 'text-black'}  `}>
                       Streaming
                    </button>
                </div>
            </div>
            <div className="overflow-scroll   overflow-y-hidden  pt-8">
            <div className="flex flex-row gap-4 ml-7  w-[8000px] pb-8">
                   {movies && movies.map(movie =>{
                       return (
                           <div className=' gap-5 cursor-pointer flex-wrap relative transition hover:scale-105' onClick={handleToggle}   key={movie.id}>
                            {movie.backdrop_path && <Image className="rounded-lg " width={520} height={240} src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}/>}
                            <PlayCircleOutlineIcon className="absolute top-[45%] left-[42%] text-5xl"/>

                            <Backdrop
                                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                open={open}
                                onClick={handleClose}
                            >
                                <div>
                                    <iframe id="player" type="text/html" width="640" height="390"
                                        src={`http://www.youtube.com/embed/${fetchVideo(`https://api.themoviedb.org/3/movie/315162/videos?api_key=${process.env.NEXT_PUBLIC_DB_key}&language=en-US`)}?enablejsapi=1&origin=http://example.com`}
                                        frameborder="0"></iframe>
                                </div>
                            </Backdrop>
                        </div>
                    )
                })} 
            </div>
            </div>
        </div> 
    );
}

export default Video;

