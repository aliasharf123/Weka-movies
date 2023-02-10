


function ResultsControl({children  , resultstate , setResultsState}) {
   
   
    return (  
        <div className="text-white flex flex-col mt-10 lg:flex-row ">
            <div className="flex flex-col  bg-[#121212] w-80   rounded-lg lg:h-72 ml-10 mt-16 lg:mb-[1000px]  ">
                <div className="bg-[#F4181C]  text-center rounded-t-lg  p-6">
                    <h1 className="font-bold text-2xl">Search results</h1>
                </div>
                <div className="flex lg:flex-col flex-row p-9 gap-20 ">
                    <button className={resultstate ==='movie' && `text-[#F4181C]`}  onClick={() => setResultsState('movie')}>Movies</button>
                    <button className={`lg:pb-4 ${resultstate ==='tv' && 'text-[#F4181C]'}`}   onClick={() => setResultsState('tv')}>Tv Show</button>
                </div>
            </div>
        {children}
     </div>
    );
}

export default ResultsControl;