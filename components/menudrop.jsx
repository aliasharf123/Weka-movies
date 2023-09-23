'use client'

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {  useState } from 'react';
import {Autocomplete} from '@mantine/core'

function MenuDrop({setSort ,setPage ,dataSort}) {
    const [open , setOpen] =useState(false);
  
 
    return ( 
        <div className='  w-full lg:w-56 rounded-lg divide-y m-auto sm:m-0'>
            <div className={`flex  text-white  bg-[#121212]  px-1 py-4 ${open ? 'rounded-t-lg' : 'rounded-lg'}`}>
                <button className={`flex  justify-between  w-full gap-14 `} onClick={() =>{setOpen(!open)}}>
                    <div className='m-auto font-bold'>Sort</div>
                   {!open ? <ArrowForwardIosIcon className='text-sm font-bold mt-1 m-auto'/> : <ExpandMoreIcon className='text-lg font-bold mt-1 m-auto'/>}
                </button>
                
            </div> 
            
           {open && 
           <div className=''>
                <div className='bg-[#121212] rounded-lg flex justify-center p-3'>
                <Autocomplete
                    onChange={(e) => {
                        if(dataSort.includes(e)){
                            setSort(e);
                            setPage(1);
                        }
                    }}
                     transition="pop-top-left"
                    transitionDuration={80}
                    transitionTimingFunction="ease"
                    placeholder="Pick one"
                    data={dataSort}
                    />
                </div>
           </div>
            }      
        </div>
    );
}

export default MenuDrop;