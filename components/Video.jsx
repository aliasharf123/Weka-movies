import Image from "next/image";
import { useEffect, useState } from "react";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import useFetch from "@/src/useFetch";

function Video() {
    const [enabled, setEnabled] = useState('In Theaters');
    const [url, setUrl] = useState(`https://api.themoviedb.org/3/movie/now_playing?&language=en-US&page=1`)
    const [TVorMovie, setTVorMovie] = useState('movie')
    const {data , loading} =  useFetch(url)
    const [open, setOpen] = useState(false);
    const [movieNow , setMovieNow] = useState('')
    const [videoKey, setVideoKey] = useState('');
 
    const handleToggle = () => {
      setOpen(!open);
    };
    const fetchVideo = async () =>{
        if(movieNow){
            const response = await fetch(`https://api.themoviedb.org/3/${TVorMovie}/${movieNow}/videos?api_key=${process.env.NEXT_PUBLIC_DB_key}&language=en-US`);
            if(response.ok){
                const data = await response.json();
                const video = data.results.filter(movie => movie.type === 'Trailer')[0]
                setVideoKey(video.key) ;
            }
           
        }        
    }
    

    useEffect(() =>{
        fetchVideo();
    }, [movieNow]) 
    
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
            <div className='flex flex-row gap-6  '>
                <h1 className="text-header">Trailer</h1>
                <div className='flex border-2 border-[#F4181C] px-2 gap-[3.2rem]  rounded-full lg:w-80 h-8 relative mt-1'>
                    <button onClick={() => {
                        setEnabled('In Theaters')
                        setUrl(`https://api.themoviedb.org/3/movie/now_playing?&language=en-US&page=1`)
                        setTVorMovie('movie')
                       }} className={`z-20 ${enabled === 'In Theaters' && 'text-black'}`}>
                        In Theaters 
                    </button>
                    <div className={`absolute  bg-[#F4181C]  ${handleToggleState()} h-8    -top-[2px] rounded-full duration-150 `}>
                    {' '}
                    </div>
                    <button onClick={() => {
                        setEnabled('On Tv')
                        setUrl(`https://api.themoviedb.org/3/tv/on_the_air?&language=en-US&page=1`)
                        setTVorMovie('tv')

                        }} className={`z-20    ${enabled === 'On Tv'&& 'text-black'}  `}>
                        On Tv
                    </button>
                    <button onClick={() => {
                        setEnabled('Streaming')
                        setUrl(`https://api.themoviedb.org/3/discover/tv?&with_watch_providers=337&watch_region=US`)
                        setTVorMovie('tv')
                        }} className={`z-20    ${enabled === 'Streaming'&& 'text-black'}  `}>
                       Streaming
                    </button>
                </div>
            </div>
            <div className="overflow-scroll   overflow-y-hidden  pt-8">
            <div className="flex flex-row gap-4 ml-7  w-[8000px] pb-8" >
                   {data.results && data.results.map(movie =>{
                       return (
                        <div className="gap-5 cursor-pointer flex-wrap relative text-center" key={movie.id}> 
                           <div className=' gap-5 cursor-pointer flex-wrap relative transition hover:scale-105' onClick={() =>{ 
                               handleToggle()
                               setMovieNow(movie.id)
                            }}   >
                            {movie.backdrop_path && <Image className="object-cover rounded-lg w-[520px] h-[240px] s"  alt={movie.id} width={520} height={240} src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}/>}
                            <PlayCircleOutlineIcon className="absolute top-[45%] left-[42%] text-5xl"/>
                            </div>
                            {movie.title || movie.name} 
                        </div>

                    )
                })} 
               {open && <div className="fixed z-40 bg-trans  lg:pl-[23%] lg:pt-[10%] pl-[10%] pt-[50%] top-0 left-0 w-full h-screen">
                    <button onClick={handleToggle} > Close</button>  
                    <iframe  id="player" type="text/html" className="lg:w-[840px] lg:h-[490px] "  
                            src={`http://www.youtube.com/embed/${videoKey}?enablejsapi=1&origin=http://example.com`}
                            frameborder="0"></iframe>
                </div>}
            </div>
            </div>
        </div> 
    );
}

export default Video;

