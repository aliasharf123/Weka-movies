import { searchProvider } from "@/pages/_app";
import { useContext } from "react";



function ResultsControl({children , resultstate , setResultsState ,setPage}) {
   const {search} = useContext(searchProvider)
   
    return (  
        <div className="text-white flex flex-col mt-10  gap-5 ">
            <div className="flex flex-col gap-10 border-b border-[rgba(255,255,255,0.2)] ">
                <h1 className="text-3xl text-center text-[rgba(255,255,255,0.8)]  font-medium">Search results: “{search}”</h1>
                <ul className="flex  font-medium text-center text-[rgba(255,255,255,0.8)] m-auto gap-5  ">
                    <li><button onClick={() =>setResultsState('movie')} className={` border-solid  px-2  pb-4 border-[#F4181C] ${resultstate =='movie' && 'border-b-2 text-white'}`}>Movies</button></li>
                    <li><button onClick={() =>setResultsState('tv')} className={` border-solid  px-2  pb-4 border-[#F4181C] ${resultstate !=='movie' && 'border-b-2 text-white'}`}>Tv show</button></li>
                </ul>
            </div>
            {children}
        </div>
    );
}

export default ResultsControl;