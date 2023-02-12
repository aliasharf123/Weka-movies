import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useContext, useState } from 'react';
import 'animate.css';
import {Genere} from '../src/data'
import { languges } from '../src/data';
import {Autocomplete} from '@mantine/core'


function GenereMovies({setGenere ,genere  , setLanguges, setPage ,dataSort , setYears }) {
    const [open , setOpen] =useState(false);
    const [vaild , setVild] =useState('');
    const [vaild1 , setVild1] =useState('');
    
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
    const handleYears =(e) =>{
        e.preventDefault()
        if(dataSort.length > 7 ){
            setYears(`${'&primary_release_year='}${vaild}`)
        }
        else{
            setYears(`${'&first_air_date_year='}${vaild}`)

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
           <div className='divide-y absolute w-full left-0   md:w-auto md:relative'>
                <div className=' text-gray-200  bg-[#121212] '>
                    <div>
                       <h1 className='px-5 py-4'>Genres</h1>
                       <div  className='grid grid-cols-5 pb-4 md:grid-cols-2'>
                        {Genere.genres.map(gener =>{
                            return (
                                <button onClick={() => handleGenere(gener.id , '&with_genres=')} key={gener.id} className={` text-white text-center border-2 hover:bg-[#F4181C] border-solid hover:border-none py-1 px-0 m-2 rounded-full  ${genere.includes(gener.id) && 'bg-[#F4181C] border-none'}`}>
                                    <div className='m-auto text-[8px]  md:text-[12px]'>{gener.name}</div>
                                </button>
                            )
                        })}
                    </div>
                    </div>
                </div>  
                <div className=' text-gray-200  bg-[#121212]  flex flex-col rounded-sm pb-3'>
                    <h1   className='px-5 py-4 '>Release Dates</h1>
                    <form onSubmit={handleYears} method="get" className='mx-5 my-2'>
                        <input type="text" onChange={(e) => setVild(e.target.value)}   className='focus:outline-none  p-1 m-auto text-black  rounded-sm'/>
                    </form>
                    
                </div>
                <div className=' text-gray-200  bg-[#121212]  flex flex-col rounded-b-lg pb-3 '>
                     <h1 className='px-5 py-4'>Country</h1>
                     {/* <select  placeholder="String" onChange={(e) => handleLanguges(e.target.value , '&with_original_language=')}  className='mx-5  my-2 text-black  rounded-sm'>
                        {languges.map( lang => {
                            return(
                                <option key={lang.iso_639_1} value={lang.iso_639_1}>{lang.english_name}</option>
                            )
                        })}
                    </select> */}
                       <Autocomplete
                        className='mx-5 my-2'
                        onChange={(e) =>{
                            const lang  = languges.filter((lang) => lang.english_name === e);
                        
                            if(lang.length){
                                handleLanguges(lang[0].iso_639_1 , '&with_original_language=')
                                setPage(1)      
                            } 
                        }}
                        transition="pop-top-left"
                        transitionDuration={80}
                        transitionTimingFunction="ease"
                        placeholder="Pick one"
                        limit={5}
                        data={languges.map(lang => {return lang.english_name} )}
                        />
                </div>
               
           </div>
            }      
        </div>
    );
}

export default GenereMovies;