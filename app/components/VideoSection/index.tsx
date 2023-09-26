'use client'

import { Suspense, useEffect, useRef, useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import 'animate.css'
import Videos from "./videos";
import Loading from "./Loading";
import Model from "./model";
import { useSearchParams } from "next/navigation";

function Video() {
    const [enabled, setEnabled] = useState<string | undefined>('In Theaters');
    const [url, setUrl] = useState(`https://api.themoviedb.org/3/movie/now_playing?&language=en-US&page=1`)
    const trailerId = useSearchParams().get('trailerId')
    const [open1 , setOpen1] = useState(false);
    const refButton = useRef<HTMLHeadingElement >(null)
    const refButton1 = useRef<HTMLHeadingElement >(null)
    const refButton2 = useRef<HTMLHeadingElement >(null)

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
    const handleToggle2 = (choose : number) =>{
        let chooseState : string | undefined =''
        if(choose === 1){
            chooseState = refButton.current?.innerHTML
        }
        else if(choose === 2){
            chooseState = refButton1.current?.innerHTML
        } 
        else {
            chooseState = refButton2.current?.innerHTML
        } 
        if(chooseState === 'In Theaters'){
            setUrl(`https://api.themoviedb.org/3/movie/now_playing?&language=en-US&page=1`)
        }
        else if(chooseState === 'On Tv'){
            setUrl(`https://api.themoviedb.org/3/tv/on_the_air?&language=en-US&page=1`)
        }
        else{
            setUrl(`https://api.themoviedb.org/3/discover/tv?&with_watch_providers=337&watch_region=US`)
        }
    }
    return ( 
        <div  className='bg-no-repeat bg-cover pt-7 duration-300 transition '>
            <div  className='flex flex-row gap-6  '>
                <h1 className="text-header">Trailer</h1>
                <div className='sm:flex hidden border-2 border-[#F4181C] px-2 gap-[3.2rem]  rounded-full lg:w-80 h-8 relative mt-1 '>
                    <button onClick={() => {
                        setEnabled('In Theaters')
                        setUrl(`https://api.themoviedb.org/3/movie/now_playing?&language=en-US&page=1`)
                       }} className={`z-20 ${enabled === 'In Theaters' && 'text-black'}`}>
                        In Theaters 
                    </button>
                    <div className={`absolute  bg-[#F4181C]  ${handleToggleState()} h-8    -top-[2px] rounded-full duration-150 `}>
                    {' '}
                    </div>
                    <button onClick={() => {
                        setEnabled('On Tv')
                        setUrl(`https://api.themoviedb.org/3/tv/on_the_air?&language=en-US&page=1`)
                        

                        }} className={`z-20    ${enabled === 'On Tv'&& 'text-black'}  `}>
                        On Tv
                    </button>
                    <button onClick={() => {
                        setEnabled('Streaming')
                        setUrl(`https://api.themoviedb.org/3/discover/tv?&with_watch_providers=337&watch_region=US`)
                        
                        }} className={`z-20    ${enabled === 'Streaming'&& 'text-black'}  `}>
                       Streaming
                    </button>
                </div>
                <div className='relative   sm:hidden  flex'>
                    <button className={`bg-[#F4181C]  w-32 py-1 ${!open1 ? 'rounded-lg' :'rounded-t-lg'}  flex justify-between px-3`} onClick={() =>  {
                        setOpen1(!open1)
                        if(open1){
                            setEnabled(refButton.current?.innerHTML)
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
                                setEnabled(refButton1.current?.innerHTML)
                                handleToggle2(2)
                              
                            }}>
                                <h1 ref={refButton1}>{refButton.current?.innerHTML !== 'In Theaters' ? 'In Theaters': 'On Tv' }</h1>
                             </button>
                            <button className=' text-white bg-[#F4181C]  w-32 py-1 rounded-b-lg' onClick={() =>  {
                                setOpen1(false)
                                setEnabled(refButton2.current?.innerHTML)
                                handleToggle2(3)
                                
                            }}>
                                <h1 ref={refButton2}>{refButton.current?.innerHTML === 'Streaming' ? 'On Tv': 'Streaming' }</h1>
                            </button>
                        </div>
                        }
                </div>
            </div>
            <div className=" overflow-scroll   overflow-y-hidden  pt-8  removeScroll">
                <div className="flex flex-row gap-4 ml-7  w-[8000px]  animate__animated animate__fadeIn  " >
                    <Suspense fallback={<Loading/>}>  {/*it is not perfect way you shouldn't make a server component inside client with this way */}
                        <Videos url={url}/>
                    </Suspense>
                </div>
            </div>
            {trailerId && <Model/>}
        </div> 
    );
}

export default Video;

