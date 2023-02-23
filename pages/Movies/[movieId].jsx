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
function SingleMovie({movie ,video ,recommendations}) {
    const router = useRouter()
    const [more , setMore] = useState(false)
    const [select , setSelect] = useState('Cast')
    const {data : Cast , loading: loadingCast} = useFetch(`https://api.themoviedb.org/3/movie/${movie && movie.id}/credits?`)
    const {data : Reviews , loading: loadingReviews} = useFetch(`https://api.themoviedb.org/3/movie/${movie && movie.id}/reviews?`)
    const {data : Photos, loading: loadingPhotos} = useFetch(`https://api.themoviedb.org/3/movie/${movie && movie.id}/images?language=en-US&include_image_language=null`)
    if(router.isFallback){
        return <div>Loading...</div>
    }
    return ( 
        <div className=''>
            <div style={{backgroundImage:  `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),url(https://www.themoviedb.org/t/p/original${movie.backdrop_path})` }} className='text-white bg-center   border-b-[#F4181C] border-b-2 bg-cover bg-no-repeat w-full '>
                <div className='md:pl-36 pl-20 pt-20 pb-36 pr-11  w-full'>
                    <div className='container flex flex-col justify-center'>
                        <div className=''>
                            <h1 className='text-2xl'>{movie.title}</h1>
                        </div>
                        <div className='flex  gap-9 mt-10  max-lg:flex-col container  m-auto '>
                            <div className='flex  gap-9  max-md:flex-col'>
                                <div className=''>
                                    <Image width={100000} height={1000000}  className='object-cover w-[210px] rounded-md container' src={`https://www.themoviedb.org/t/p/original${movie.poster_path}`} alt="mai1n" unoptimized/>
                                </div>
                                <div className='lg:w-80 text-[rgba(255,255,255,0.7)] flex flex-col justify-center'>
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
                                    <h1>Country:{' '} <span className='text-[#F4181C]'>{movie.production_countries[0]&& movie.production_countries[0].iso_3166_1 }</span> </h1>
                                    
                                    <p className='mt-4' >{more ?  movie.overview : `${movie.overview.slice(0,250)}..`}</p>
                                    {movie.overview.length > 210 && <button className='m-auto' onClick={() =>{setMore(!more)} }>
                                            <MoreHorizIcon  />
                                        </button>}
                                </div>
                            </div>
                            <div className='rounded-md w-[45%] h-[300px]  max-lg:w-full'>
                                <iframe   id="player" type="text/html"  className="rounded-md w-full h-full "
                                            src={`https://www.youtube.com/embed/${video.key}?enablejsapi=1&origin=https://example.com`}
                                            frameborder="0"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
                <div className='flex flex-col justify-center' >
                    <div className='bg-[rgb(18,18,18)] h-36  pl-6  pt-8 lg:pl-40 flex flex-col justify-between mb-10'> 
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
                    <div className='flex max-lg:flex-col  w-3/4  m-auto gap-10'>
                        <div className='lg:w-[70%]  text-white '>
                            {select ==='Cast' &&  
                            (  !loadingCast ?  <div className='animate__animated animate__fadeIn '>
                                    <h1 className='text-4xl p-4 pt-0'>Cast</h1>
                                    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
                                        { Cast.cast && Cast.cast.map(Actor =>{
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
                                    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
                                        {Cast.crew && Cast.crew.map(Actor =>{
                                            return(
                                                
                                                <div key={Actor.id} className='flex flex-row gap-3 '>
                                                    <div className='' >

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
                               (!loadingReviews ? <div className='animate__animated animate__fadeIn '>
                                    <div className='flex flex-col  gap-10'>
                                        {Reviews.results.length > 0 ? Reviews.results.map((review =>{
                                            return(
                                                <div className=' gap-5 '>
                                                        <div className='flex flex-col justify-center gap-5'>
                                                            <div className='flex flex-row align-middle  justify-between'>
                                                                <div className='flex  gap-6'>
                                                                    <Avatar sx={{width: '60px'  , height: '60px' }}  alt='none'/>
                                                                    <div className='my-auto'>
                                                                        <h1 className='text-2xl'>A review made by {review.author}</h1>
                                                                        <p className='text-[rgba(255,255,255,0.7)] text-sm'>Created by  {review.author} on {review.created_at}</p>
                                                                    </div>
                                                                </div>
                                                                <div className='my-auto flex font-bold '>
                                                                    <StarIcon className='text-[#F4181C] my-auto '  />
                                                                    <p >{review.author_details.rating}</p>
                                                                </div>
                                                            </div>
                                                                <p  className='text-[rgba(255,255,255,0.7)] max-md:text-xs  p-5 rounded-sm bg-[#121212] '> {review.content} </p>
                                                        </div>
                                                    </div> 
                                            )
                                        })): <div className='text-white'>No Reviews</div>} 
                                </div>
                                </div> : <div>loading</div>)
                            }
                            {select ==='Photos' &&(!loadingPhotos ? 
                                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6  animate__animated animate__fadeIn'>
                                    {Photos.backdrops.length > 0 ? Photos.backdrops.map( photo =>{
                                        return(
                                            <Link href={`https://image.tmdb.org/t/p/original${photo.file_path}`} passHref>
                                                <Image className='rounded-md ' src={`https://image.tmdb.org/t/p/original${photo.file_path}`} width={1250} height={1250} alt={photo.file_path} unoptimized/>
                                            </Link>
                                            )

                                    }) : <div>No Photo</div>}
                                </div> 
                            
                            
                            : <div>loading</div>)}
                        </div>
                        <div className=' lg:w-[30%]  '>
                            <div className='text-white '>
                                <h1 className='text-3xl font-extralight '>You may also like</h1>
                                <div className='grid lg:grid-cols-2  md:grid-cols-3 grid-cols-2 w-full gap-3  mt-10' >
                                        {recommendations.results && recommendations.results.map(movie =>{
                                            return(
                                                <div key={movie.id} className=' flex-wrap   w-auto '>
                                                    <Link   href={ `/Movies/${movie.id}` }   passHref>
                                                        {movie.poster_path  ? <Image  src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`} alt={movie.id} width={1000} height={1000} unoptimized/> :<Image width={1000} height={1000} className='bg-slate-400 '  src='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg' alt={movie.original_title} unoptimized/>}
                                                    </Link>
                                                    <div className=" bg-[#121212] h-28 p-2 rounded-b-lg ">
                                                        <div className="flex flex-row">
                                                            <StarIcon className="text-yellow-400 "/>
                                                            <p className=" text-gray-300">{movie.vote_average}</p>
                                                        </div>
                                                        <Link  href={ `/Movies/${movie.id}` }  passHref>
                                                            <h1 className="font-bold hover:text-[#F4181C] text-white xl:text-base text-xs">{movie.title || movie.name}</h1>
                                                        </Link>
                                                        <p className="text-gray-300 ">{movie.release_date || movie.first_air_date}</p>
                                                    </div>
                                                </div>
                                        )
                                            
                                    }) }
                                </div> 
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
    const response1 = await fetch(`https://api.themoviedb.org/3/movie/${movieid}/recommendations?api_key=${process.env.NEXT_PUBLIC_DB_key}&page=1`)
    var recommendations = await response1.json();
    if(response.ok){
        const data = await response.json();
        if(data.results){
            var video = data.results.filter(movie => movie.type === 'Trailer')[0]
        }
    }
    if(res.ok){
        var movie = await res.json();
    }
    return {
        props: {
            movie,
            video :  video ? video : 'sdsdsdd',
            recommendations
        }
    }
}
