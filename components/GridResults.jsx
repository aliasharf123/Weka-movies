'use client'

import StarIcon from '@mui/icons-material/Star';
import Image from "next/image";
import Link from 'next/link';
import AddFavorite from './Favorite';
import PaginationMovies from './PaginationMovies';
import DetaildContentCard from '@/app/(Content)/components/DetaildContentCard';
import ContentCard from '@/app/components/contentCard';



function GridResults({data , page ,  media}) {

  
    return ( 
        <div className="flex justify-center flex-col">
        <div className='grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 grid-flow-row  gap-5     mb-5 ' >
                {data.results && data.results.map(movie =>{
                    return(
                        <DetaildContentCard movie={movie}/>
                )
                    
            }) }
            </div> 
            {data.total_pages  > 1 &&<PaginationMovies page={page} value={data.total_pages} />}
        </div>
     );
}

export default GridResults;