'use client'
import { MantineProvider, Modal } from '@mantine/core'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import useSWR from 'swr';
import { VideoType } from '@/types/videoType';

const serilizeID = (trailerId : string) =>{
    const arr = trailerId.split("-")
    return {
        id:arr[1] ,
        media : arr[0],
    }
} 
export const fetcher = (url : string) => fetch(url).then(r => r.json())

type Response = {
    data : {
        results : VideoType[] 
    },
    isLoading : boolean ,
    error: any
}

export default  function Model() {
    const SearchParams = useSearchParams()
    const pathName = usePathname()
    const trailerId  = SearchParams.get('trailerId')
    const router = useRouter()
    const {id , media } =  serilizeID(trailerId ?? '') 
    const {data  ,isLoading ,error} : Response  = useSWR(`https://api.themoviedb.org/3/${media}/${id}/videos?api_key=${process.env.NEXT_PUBLIC_DB_key}&language=en-US` , fetcher)
    const OfficalTrailer =!isLoading && !error ?  data.results[0] : {} as VideoType
    const title = isLoading ? 'Loading' : error ? 'Something went wrong' : OfficalTrailer ? OfficalTrailer.name : ''
    const close = () =>{
        const params = new URLSearchParams(SearchParams)
        params.delete('trailerId')
        router.push(pathName + '?' + params.toString() , {scroll: false})
    }

    if(!trailerId) return <div></div>
    return (
        <>
            <MantineProvider theme={{ colorScheme: "dark" }}>
                <Modal opened={trailerId ? true : false} onClose={close} size='xl'  title={title} centered>
                    {isLoading ? 
                    <div className='text-white w-full h-96 flex justify-center items-center'>loading...</div>
                    :error ? 
                    <div>Error</div>
                    :
                    data.results.length ?
                    <iframe  id="player" typeof="text/html"  className="w-full h-96 " allowFullScreen
                        src={`https://www.youtube.com/embed/${OfficalTrailer.key}?enablejsapi=1&origin=http://example.com`}
                        ></iframe>
                    : <div className='text-white w-full h-96 flex justify-center items-center'>No Video </div>
                    }
                </Modal>
            </MantineProvider>
        </>
    )
}
