import _ from 'lodash';
import { useRouter } from 'next/router';
import Image from 'next/image';
import StarIcon from '@mui/icons-material/Star';
import { useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import useFetch from '@/src/useFetch';
import { Avatar } from '@mui/material';
import 'animate.css'
import Link from 'next/link';

const selection = [ 'Cast' , 'Reviews' , 'Photos']
function SingleMovie({movie ,video}) {
    const router = useRouter()
    const [more , setMore] = useState(false)
    const [select , setSelect] = useState('Cast')
    
    const {data : Cast , loading: loadingCast} = useFetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?`)
    const {data : Reviews , loading: loadingReviews} = useFetch(`https://api.themoviedb.org/3/movie/${movie.id}/reviews?`)
    const {data : Photos, loading: loadingPhotos} = useFetch(`https://api.themoviedb.org/3/movie/${movie.id}/images?language=en-US&include_image_language=null`)
    if(router.isFallback){
        return <div>Loading...</div>
    }
    
    return ( 
        <div>
            <div className=' text-white relative  border-b-[#F4181C] border-b-2'>
                <Image width={100000} height={1000000}  className='object-cover w-full brightness-[0.2]  h-[640px]  ' src={`https://www.themoviedb.org/t/p/original${movie.backdrop_path}`} alt="mai1n" unoptimized/>
                <div className='absolute top-0 ml-36 mt-20'>
                    <div className=''>
                        <div className='m-auto'>
                            <h1 className='text-2xl'>{movie.title}</h1>
                        </div>
                        <div className='flex flex-row gap-9 mt-10'>
                            <div>
                                <Image width={100000} height={1000000}  className='object-cover w-[210px] rounded-md' src={`https://www.themoviedb.org/t/p/original${movie.poster_path}`} alt="mai1n" unoptimized/>
                            </div>
                            <div className='w-80 text-[rgba(255,255,255,0.7)] flex flex-col justify-center'>
                                <div className='flex'>
                                    <StarIcon className='text-[#F4181C]' />
                                    <p className=' text-lg'>{movie.vote_average.toString().slice(0,3)}</p>
                                </div>
                                <h1>Genere: {' '}
                                {movie.genres.map( genere =>{
                                    return(
                                        <span className='text-[#F4181C]'> {genere.name}, {' '}</span>
                                        )
                                        
                                    }
                                    )}
                                </h1>
                                <h1>Release year: {' '}{ movie.release_date}</h1>
                                <h1>Running Time: {' '}{movie.runtime} min</h1>
                                <h1>Country:{' '} <span className='text-[#F4181C]'>{movie.production_countries[0].iso_3166_1 }</span> </h1>
                                
                                <p className='mt-4 transition  duration-700' >{more ?  movie.overview : `${movie.overview.slice(0,250)}..`}</p>
                                {movie.overview.length > 210 && <button className='m-auto' onClick={() =>{setMore(!more)} }>
                                        <MoreHorizIcon  />
                                    </button>}
                            </div>
                            <div className='rounded-md bg-black w-[600px] h-[300px]'>
                                <iframe   id="player" type="text/html"  className="rounded-md w-full h-full"
                                            src={`http://www.youtube.com/embed/${video.key}?enablejsapi=1&origin=http://example.com`}
                                            frameborder="0"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
                <div>
                    <div className='bg-[#121212] h-36   pt-8 pl-40 flex flex-col justify-between '> 
                        <h1 className='text-white text-4xl '>Discover</h1>
                        <div className='text-[rgba(255,255,255,0.7)]  '>
                            <ul className='flex flex-row gap-5 pb-3 font-light'>
                                {selection.map(selectItem =>{
                                    return(
                                        <li key={selectItem} className={selectItem === select? 'text-[#F4181C] border-b-[#F4181C] border-b-2' : 'text-[rgba(255,255,255,0.7)]'}>
                                           <button onClick={() => setSelect(selectItem)}> {selectItem} </button> 
                                        </li>
                                        )
                                    })}
                            </ul>
                        </div>
                    </div>
                    <div className='flex flex-row mx-32'>
                        <div className='w-[75%]  text-white '>
                            {select ==='Cast' &&  
                            (  !loadingCast ?  <div className='animate__animated animate__fadeIn mb-10'>
                                    <h1 className='text-4xl p-4'>Cast</h1>
                                    <div className='grid grid-cols-3 gap-5'>
                                        { Cast.cast.map(Actor =>{
                                            return(
                                                
                                                <div key={Actor.id} className='flex flex-row gap-6'>
                                                <div>

                                                    {Actor.profile_path ? <Avatar  sx={{width: '80px' , height: '80px'}}  src={`https://www.themoviedb.org/t/p/w500${Actor.profile_path}`} alt="mai1n" />
                                                    :<Avatar sx={{width: '80px' , height: '80px'}}  alt='none'/>}
                                                </div>
                                                <div className='flex flex-col justify-center'>
                                                    <h1 className='text-2xl'>{Actor.name}</h1>
                                                    <p className='text-[rgba(255,255,255,0.7)]'> {Actor.character} </p>
                                                </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <h1 className='text-4xl p-4 '>Crew</h1>
                                    <div className='grid grid-cols-3 gap-5'>
                                        {Cast.crew.map(Actor =>{
                                            return(
                                                
                                                <div key={Actor.id} className='flex flex-row gap-3'>
                                                <div >

                                                    {Actor.profile_path ? <Avatar  sx={{width: '80px'  , height: '80px' }}  src={`https://www.themoviedb.org/t/p/w500${Actor.profile_path}`} alt="mai1n" />
                                                    :<Avatar sx={{width: '80px'  , height: '80px' }}  alt='none'/>}
                                                </div>
                                                <div className='flex flex-col justify-center'>
                                                    <h1 className='text-2xl'>{Actor.name}</h1>
                                                    <p className='text-[rgba(255,255,255,0.7)]'> {Actor.known_for_department} </p>
                                                </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div> : <div>Loading</div>)
                                }
                            {select ==='Reviews' &&  
                               (!loadingReviews ? <div className='animate__animated animate__fadeIn mt-10 mb-10'>
                                    <div className='flex flex-col  gap-10'>
                                        {Reviews.results.map((review =>{
                                            return(
                                                <div className=' gap-5'>
                                                        <div className='flex flex-col justify-center gap-5'>
                                                            <div className='flex flex-row align-middle  justify-between'>
                                                                <div className='flex  gap-6'>
                                                                    <Avatar sx={{width: '60px'  , height: '60px' }}  alt='none'/>
                                                                    <div className='my-auto'>
                                                                        <h1 className='text-2xl'>A review made by {review.author}</h1>
                                                                        <p className='text-[rgba(255,255,255,0.7)] text-sm'>Created by  {review.author} on {review.created_at}</p>
                                                                    </div>
                                                                </div>
                                                                <div className='my-auto flex font-bold'>
                                                                    <StarIcon className='text-[#F4181C] my-auto '  />
                                                                    <p >{review.author_details.rating}</p>
                                                                </div>
                                                            </div>
                                                                <p className='text-[rgba(255,255,255,0.7)] p-5 rounded-sm bg-[#121212] '> {review.content} </p>
                                                        </div>
                                                    </div> 
                                            )
                                        }))} 
                                </div>
                                </div> : <div>loading</div>)
                            }
                            {select ==='Photos' &&(!loadingPhotos ? 
                                <div className='grid grid-cols-3 gap-6 mt-10  animate__animated animate__fadeIn'>
                                    {Photos.backdrops.map( photo =>{
                                        return(
                                            <Link href={`https://image.tmdb.org/t/p/original${photo.file_path}`} passHref>
                                                <Image className='rounded-md w-72' src={`https://image.tmdb.org/t/p/original${photo.file_path}`} width={1250} height={1250} alt={photo.file_path} unoptimized/>
                                            </Link>
                                            )

                                    })}
                                </div> 
                            
                            
                            : <div>loading</div>)}
                        </div>
                        <div className=' w-[25%]'>
                            <div>
                              
                            </div>  
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default SingleMovie;


export const getStaticPaths = async () =>{
    const resDay = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.NEXT_PUBLIC_DB_key}`);
    const dataDay = await resDay.json();
    const resWeek = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.NEXT_PUBLIC_DB_key}`);
    const dataWeek = await resWeek.json();

    const data = _.merge(dataWeek.results,dataDay.results);
    const paths = data.map((movie) => ({
        params: {
            movieId: movie.id.toString()
        }
    }));
    
    return {
        paths , 
        fallback: true,
    }
}
export const getStaticProps = async (ctx) => {
    const movieid = ctx?.params.movieId;
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movieid}?api_key=${process.env.NEXT_PUBLIC_DB_key}&language=en-US`)
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieid}/videos?api_key=${process.env.NEXT_PUBLIC_DB_key}&language=en-US`);
    const movie = await res.json();
    if(response.ok){
        const data = await response.json();
        var video = data.results.filter(movie => movie.type === 'Trailer')[0]
        
    }
    return {
        props: {
            movie,
            video
        }
    }
}
