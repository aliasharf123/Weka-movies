import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import useFetch from "@/src/useFetch";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Group, Button } from '@mantine/core';
import { Loader } from "@mantine/core";
import 'animate.css'
import { Skeleton } from "@mui/material";
function Video() {
    const [enabled, setEnabled] = useState('In Theaters');
    const [url, setUrl] = useState(`https://api.themoviedb.org/3/movie/now_playing?&language=en-US&page=1`)
    const [TVorMovie, setTVorMovie] = useState('movie')
    const {data , loading} =  useFetch(url)
    const [open2, setOpen] = useState(false);
    const [movieNow , setMovieNow] = useState('')
    const [videoKey, setVideoKey] = useState('');
    const [open1 , setOpen1] = useState(false);
    const refButton = useRef(null)
    const refButton1 = useRef(null)
    const refButton2 = useRef(null)
    const [image , setImage] = useState(!loading ?`https://image.tmdb.org/t/p/original${data.results[0].backdrop_path}`: '')
    const [opened, { open, close }] = useDisclosure(false);

    const handleToggle = () => {
      setOpen(!open);
    };
    const fetchVideo = async () =>{
        if(movieNow){
            const response = await fetch(`https://api.themoviedb.org/3/${TVorMovie}/${movieNow}/videos?api_key=${process.env.NEXT_PUBLIC_DB_key}&language=en-US`);
            if(response.ok){
                const data = await response.json();
                const video = data.results.filter(movie => movie.type === 'Trailer')[0]
                setVideoKey(video) ;
            }
           
        }        
    }
    

    useEffect(() =>{
        fetchVideo();
    }, [movieNow]) 
    useEffect(()=>{
        setImage(!loading ?`https://image.tmdb.org/t/p/original${data.results[0].backdrop_path}`: '')
    },[loading])
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
    const handleToggle1 = () =>{
                                    
        if(enabled === 'In Theaters'){
            return 'In Theaters'
        }
        else if(enabled === 'On Tv'){
            return 'On Tv'
        }
        else if(enabled === 'Streaming'){
            return 'Streaming'
        }
    }
    const handleToggle2 = (choose) =>{
        let chooseState =''
        if(choose === 1){
            chooseState = refButton.current.innerHTML
        }
        else if(choose === 2){
            chooseState = refButton1.current.innerHTML
        } 
        else {
            chooseState = refButton2.current.innerHTML
        } 
        if(chooseState === 'In Theaters'){
            setUrl(`https://api.themoviedb.org/3/movie/now_playing?&language=en-US&page=1`)
            setTVorMovie('movie')
        }
        else if(chooseState === 'On Tv'){
            setUrl(`https://api.themoviedb.org/3/tv/on_the_air?&language=en-US&page=1`)
            setTVorMovie('tv')
        }
        else{
            setUrl(`https://api.themoviedb.org/3/discover/tv?&with_watch_providers=337&watch_region=US`)
            setTVorMovie('tv')
        }
    }

    return ( 
        <div style={{backgroundImage:  `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),url(${image})` }} className='bg-no-repeat bg-cover pt-7 duration-300 transition bg-red-600'>
            <div  className='flex flex-row gap-6  '>
                <h1 className="text-header">Trailer</h1>
                <div className='sm:flex hidden border-2 border-[#F4181C] px-2 gap-[3.2rem]  rounded-full lg:w-80 h-8 relative mt-1 '>
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
                <div className='relative   sm:hidden  flex'>
                    <button className={`bg-[#F4181C]  w-32 py-1 ${!open1 ? 'rounded-lg' :'rounded-t-lg'}  flex justify-between px-3`} onClick={() =>  {
                        setOpen1(!open1)
                        if(open1){
                            setEnabled(refButton.current.innerHTML)
                            handleToggle2(1)
                        }   
                        }}>
                            <h1 ref={refButton} >{handleToggle1()}</h1> 
                            <ExpandMoreIcon/>
                        </button>
                    {open1 &&
                        <div className="absolute top-8 z-10">
                            <button className=' text-white bg-[#F4181C]  w-32 py-1 ' onClick={() =>  {
                                setOpen1(false)
                                setEnabled(refButton1.current.innerHTML)
                                handleToggle2(2)
                              
                            }}>
                                <h1 ref={refButton1}>{refButton.current.innerHTML !== 'In Theaters' ? 'In Theaters': 'On Tv' }</h1>
                             </button>
                            <button className=' text-white bg-[#F4181C]  w-32 py-1 rounded-b-lg' onClick={() =>  {
                                setOpen1(false)
                                setEnabled(refButton2.current.innerHTML)
                                handleToggle2(3)
                                
                            }}>
                                <h1 ref={refButton2}>{refButton.current.innerHTML === 'Streaming' ? 'On Tv': 'Streaming' }</h1>
                            </button>
                        </div>
                        }
                </div>
            </div>
            <div className=" overflow-scroll   overflow-y-hidden  pt-8 ">
            <div className="flex flex-row gap-4 ml-7  w-[8000px] pb-8 animate__animated animate__fadeIn" >
                   {!loading ? data.results.map(movie =>{
                       return (
                        <div className="gap-5 cursor-pointer flex-wrap relative text-center  h-[240px] " onMouseOver={() => setImage(`https://image.tmdb.org/t/p/original${movie.backdrop_path}`)} key={movie.id}> 
                           <div className=' gap-5 cursor-pointer flex-wrap relative transition hover:scale-105 duration-300' onClick={() =>{ 
                               handleToggle()
                               open()
                               setMovieNow(movie.id)
                            }}   >
                            {movie.backdrop_path && <Image className="object-cover rounded-lg "  alt={movie.id} width={480} height={240} src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}/>}
                            <PlayCircleOutlineIcon className="absolute top-[45%] left-[42%] text-5xl"/>
                            </div>
                            {movie.title || movie.name} 
                        </div>
                    )
                }):
                <div className="gap-5 cursor-pointer relative justify-center h-[240px] flex"> 
                   <Skeleton sx={{ bgcolor: 'rgba(0,0,0,0.6)' }} variant="rounded" width={480} height={240} />
                   <Skeleton sx={{ bgcolor: 'rgba(0,0,0,0.6)' }} variant="rounded" width={480} height={240} />
                   <Skeleton sx={{ bgcolor: 'rgba(0,0,0,0.6)' }} variant="rounded" width={480} height={240} />
                   <Skeleton sx={{ bgcolor: 'rgba(0,0,0,0.6)' }} variant="rounded" width={480} height={240} />
                   <Skeleton sx={{ bgcolor: 'rgba(0,0,0,0.6)' }} variant="rounded" width={480} height={240} />
                </div>
                
                
                } 
                 <Modal opened={opened} onClose={close} size='xl' className="" title={videoKey ? videoKey.name : 'no video'} centered>
                    <iframe  id="player" type="text/html"  className="w-full h-96 " allowFullScreen
                            src={`http://www.youtube.com/embed/${videoKey&& videoKey.key}?enablejsapi=1&origin=http://example.com`}
                            frameborder="0"></iframe>
                </Modal>
           
            </div>
            </div>
        </div> 
    );
}

export default Video;

