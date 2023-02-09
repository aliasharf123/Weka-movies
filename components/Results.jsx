


function ResultsControl({children  , resultstate , setResultsState}) {
   
   
    return (  
        <div className="text-white flex flex-row mt-10 ">
            <div className=" flex flex-col gap-4 bg-[#121212] w-[15%] rounded-lg h-52 ml-10 mt-16 mb-[1000px]">
                <div className="bg-[#F4181C] h-full text-center align-middle rounded-t-lg  pt-8">
                    <h1>Search results</h1>
                </div>
                <div className="flex flex-col gap-16 ">
                    <button className={resultstate ==='movie' && `text-[#F4181C]`}  onClick={() => setResultsState('movie')}>Movies</button>
                    <button className={resultstate ==='tv' && `text-[#F4181C]`}   onClick={() => setResultsState('tv')}>Tv Show</button>
                </div>
            </div>
        {children}
     </div>
    );
}

export default ResultsControl;