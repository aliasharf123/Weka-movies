import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useContext, useState } from 'react';
import 'animate.css';
import { MoviesContext } from '@/pages/Movies';

function MenuDrop() {
    const [open , setOpen] =useState(false);
    const {setSort ,setPage} = useContext(MoviesContext)
 
    return ( 
        <div className='   w-56 rounded-lg divide-y m-auto sm:m-0'>
            <div className={`flex  text-white  bg-[#121212]  px-1 py-4 ${open ? 'rounded-t-lg' : 'rounded-lg'}`}>
                <button className={`flex  justify-between  w-full gap-14 `} onClick={() =>{setOpen(!open)}}>
                    <div className='m-auto font-bold'>Sort</div>
                   {!open ? <ArrowForwardIosIcon className='text-sm font-bold mt-1 m-auto'/> : <ExpandMoreIcon className='text-lg font-bold mt-1 m-auto'/>}
                </button>
                
            </div> 
            
           {open && 
           <div className=''>
                <div className='bg-[#121212] rounded-lg'>
                    <select  placeholder="String" onChange={(e) => {
                        setSort(e.target.value)
                        setPage(1)
                         }
                        } className='m-3  bg-slate-50'>
                        <option value=""></option>
                        <option value="popularity.asc">popularity.asc</option>
                        <option value="popularity.desc">popularity.desc</option>
                        <option value="release_date.asc">release_date.asc</option>
                        <option value="release_date.desc">release_date.desc</option>
                        <option value="revenue.asc">revenue.asc</option>
                        <option value="revenue.desc">revenue.desc</option>
                        <option value="primary_release_date.asc">primary_release_date.asc</option>
                        <option value="primary_release_date.desc">primary_release_date.desc</option>
                        <option value="original_title.asc">original_title.asc</option>
                        <option value="original_title.desc">original_title.desc</option>
                        <option value="vote_average.asc">vote_average.asc</option>
                        <option value="vote_average.desc">vote_average.desc</option>
                        <option value="vote_count.asc">vote_count.asc</option>
                        <option value="vote_count.desc">vote_count.desc</option>
                    </select>
                </div>
           </div>
            }      
        </div>
    );
}

export default MenuDrop;