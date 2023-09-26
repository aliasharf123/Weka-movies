import SingleMovie from "./SignleMoviePage";
import _ from 'lodash';
import getInfo from '../../../../src/getInfo'
import { ContentItem } from "@/types/ContentType";
async function getMoviesInfo(movieId : string){
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_DB_key}&language=en-US`)
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.NEXT_PUBLIC_DB_key}&language=en-US`);
    const response1 = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${process.env.NEXT_PUBLIC_DB_key}&page=1`)
    var recommendations = await response1.json();
    const data = await response.json();
    var video = data.results.filter((movie : any) => movie.type === 'Trailer')[0]
    var movie = await res.json();

    return {
        movie,
        video :  video ? video : 'sdsdsdd',
        recommendations
    }
}

export default async function SingleMoviePage({ params: { movieId }} : {params: { movieId : string }}) {
    const {movie ,video , recommendations} = await getMoviesInfo(movieId.split('-')[0])
    return ( <SingleMovie  movie={movie} video={video} recommendations={recommendations}/> );
}

export async function generateStaticParams() {
    const resDay = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.NEXT_PUBLIC_DB_key}`);
    const dataDay = await resDay.json();
    const resWeek = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.NEXT_PUBLIC_DB_key}`);
    const dataWeek = await resWeek.json();

    const data = _.merge(dataWeek.results,dataDay.results);
    return data.map((movie: ContentItem) => {
        const {title ,  type} = getInfo(movie)
        return{
            movieId: `/${type}/${movie.id}-${title?.replaceAll(' ' , '-')}`
        }
    });
}
   