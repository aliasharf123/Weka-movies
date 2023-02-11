import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useContext, useState } from 'react';
import 'animate.css';
import {Genere} from '../src/data'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { languges } from '../src/data';
import { MoviesContext } from '@/pages/Movies';


function GenereMovies() {
    const [open , setOpen] =useState(false);
    const {setGenere ,genere , setLanguges, setPage  } =useContext(MoviesContext);

    const handleGenere = (id , type) =>{
        if(genere.includes(id)){
            setGenere(genere.replace(id , ''))
        }
        else if(genere.includes(type)){
            setGenere(genere +` ,${id}`)
        }else{
            setGenere(`${type} ${id}`)
        }
        setPage(1)
    }
    const handleLanguges =(id , type) =>{
        if(id === "xx"){
            setLanguges('')
        }
        else{
            setLanguges(`${type}${id}`)
        }
        setPage(1)
    }

    return ( 
        <div className='   w-56 rounded-lg divide-y m-auto sm:m-0'>
            <div className={`flex  text-white  bg-[#121212]  px-1 py-4 ${open ? 'rounded-t-lg' : 'rounded-lg'}`}>
                <button className={`flex  justify-between  w-full gap-14 `} onClick={() =>{setOpen(!open)}}>
                    <div className='m-auto font-bold'>Filters</div>
                   {!open ? <ArrowForwardIosIcon className='text-sm font-bold mt-1 m-auto'/> : <ExpandMoreIcon className='text-lg font-bold mt-1 m-auto'/>}
                </button>
                
            </div> 
            
           {open && 
           <div className='divide-y absolute'>
                <div className=' text-gray-200  bg-[#121212] '>
                    <div>
                       <h1 className='px-5 py-4'>Genres</h1>
                       <div  className='grid grid-cols-2 pb-4'>
                        {Genere.genres.map(gener =>{
                            return (
                                <button onClick={() => handleGenere(gener.id , '&with_genres=')} key={gener.id} className={` text-white text-center border-2 hover:bg-[#F4181C] border-solid hover:border-none py-1 px-0 m-2 rounded-full  ${genere.includes(gener.id) && 'bg-[#F4181C] border-none'}`}>
                                    <div className='m-auto text-[12px] px-1 '>{gener.name}</div>
                                </button>
                            )
                        })}
                    </div>
                    </div>
                </div>  
                <div className=' text-gray-200  bg-[#121212]  flex flex-col rounded-sm pb-3'>
                    <h1   className='px-5 py-4 '>Release Dates</h1>
                    <input type="date" className='focus:outline-none  p-1 m-auto text-black  rounded-sm'/>

                </div>
                <div className=' text-gray-200  bg-[#121212]  flex flex-col rounded-sm pb-3 '>
                     <h1 className='px-5 py-4'>Country</h1>
                     <select  placeholder="String" onClick={(e) => handleLanguges(e.target.value , '&with_original_language=')}  className='mx-5  my-2 text-black  rounded-sm'>
                        {languges.map( lang => {
                            return(
                                <option key={lang.iso_639_1} value={lang.iso_639_1}>{lang.english_name}</option>
                            )
                        })}
                    </select>
                </div>
                <div className=' text-gray-200  bg-[#121212]  flex flex-col rounded-sm pb-3 '>
                     <h1 className='px-5 py-4'>keywords</h1>
                     <input type="text"  className='mx-5 my-2 text-black p-1 focus:outline-none rounded-sm focus:ring-1 focus:border-[#F4181C] border-2  focus:ring-offset-[#F4181C]' placeholder='Enter keyword'/>
                </div>
           </div>
            }      
        </div>
    );
}

export default GenereMovies;