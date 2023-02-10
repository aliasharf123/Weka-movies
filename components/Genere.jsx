import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import 'animate.css';
import {Genere} from '../src/data'




function GenereMovies() {
    const [open , setOpen] =useState(false);
    return ( 
        <div className='   w-56 rounded-lg divide-y'>
            <div className={`flex  text-white  bg-[#121212]  px-1 py-4 ${open ? 'rounded-t-lg' : 'rounded-lg'}`}>
                <button className={`flex  justify-between  w-full gap-14 `} onClick={() =>{setOpen(!open)}}>
                    <div className='m-auto font-bold'>Filters</div>
                   {!open ? <ArrowForwardIosIcon className='text-sm font-bold mt-1 m-auto'/> : <ExpandMoreIcon className='text-lg font-bold mt-1 m-auto'/>}
                </button>
                
            </div> 
            
           {open && 
           <div className='divide-y'>
                <div className=' text-gray-200  bg-[#121212] '>
                    <div>
                       <h1 className='px-5 py-4'>Genres</h1>
                       <div  className='grid grid-cols-2 pb-3'>
                        {Genere.genres.map(gener =>{
                            return (
                                <div key={gener.id} className='text-white text-center border-[0.01px] hover:bg-[#F4181C] hover:border-none py-1 px-0 m-2 rounded-full '>
                                    <div className='m-auto text-[12px] px-1 '>{gener.name}</div>
                                </div>
                            )
                        })}
                    </div>
                    </div>
                </div>  
                <div className=' text-gray-200  bg-[#121212]  flex flex-col rounded-sm pb-3'>
                    <h1   className='px-5 py-4'>Release Dates</h1>
                    <input type="date" className='focus:outline-none  p-1 m-auto '/>

                </div>
                <div className=' text-gray-200  bg-[#121212]  flex flex-col rounded-sm pb-3'>
                     <h1 className='px-5 py-4'>Country</h1>
                     
                </div>
           </div>
            }      
        </div>
    );
}

export default GenereMovies;