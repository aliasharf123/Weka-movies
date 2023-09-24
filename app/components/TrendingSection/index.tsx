'use client'
import { Suspense, useRef, useState } from "react";
import MoviesList from '@/components/movies';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Loading from "./loading";

function Trending() {
    // State variables for managing the component's behavior
    const [enabled, setEnabled] = useState('day'); // State for a day/night mode toggle

    // State variables for managing a modal/dialog
    const [open, setOpen] = useState(false); // State for controlling the visibility of a modal/dialog
    const refButton = useRef(null); // Ref to a button element for opening the modal


    return ( 
        <>
            <div className="flex flex-row gap-6 ">
                <h1 className="text-header">Trending</h1>

                {/* Day/Week Toggle */}
                <div className="hidden gap-10 border-2 border-[#F4181C] px-2  rounded-full w-44 h-8 relative mt-1 sm:flex">
                <button
                    onClick={() => setEnabled("day")}
                    className={`z-20 ${!(enabled === "week") && "text-black"}`}
                >
                    Today
                </button>
                <div
                    className={`absolute  bg-[#F4181C]  w-16 h-8  -left-1 -top-[2px] rounded-full  ${
                    enabled === "week"
                        ? "w-[6.3rem] translate-x-[80%]  duration-150 "
                        : "duration-150"
                    }`}
                >
                    {" "}
                </div>
                <button
                    onClick={() => setEnabled("week")}
                    className={`z-20    ${enabled === "week" && "text-black"}  `}
                >
                    This Week
                </button>
                </div>

                {/* Mobile Toggle */}
                <div className="relative sm:hidden   flex ">
                <button
                    className={`bg-[#F4181C]  w-32 py-1 ${
                    !open ? "rounded-lg" : "rounded-t-lg"
                    }  flex justify-between px-3`}
                    onClick={() => {
                    setOpen(!open);
                    if (open) {
                        if ((refButton.current as any).innerHTML === "Today") {
                        setEnabled("day");
                        } else {
                        setEnabled("week");
                        }
                    }
                    }}
                >
                    <h1 ref={refButton}>
                    {!(enabled === "day") ? "This Week" : "Today"}
                    </h1>
                    <ExpandMoreIcon />
                </button>
                {open && (
                    <button
                    className="absolute top-8 text-white bg-[#F4181C]  w-32 py-1 rounded-b-lg z-50"
                    onClick={() => {
                        setOpen(false);
                        if ((refButton.current as any).innerHTML === "Today") {
                        setEnabled("week");
                        } else {
                        setEnabled("day");
                        }
                    }}
                    >
                    <h1>{enabled === "week" ? "Today" : "This Week"}</h1>
                    </button>
                )}
                </div>
            </div>

            {/* Movies List Component */}
            <div className='overflow-scroll   overflow-y-hidden  removeScroll'>
                <div className='flex flex-row gap-3  w-[4000px]   ml-6 ' >
                    <Suspense fallback={<Loading/>}>
                        <MoviesList
                            url={`https://api.themoviedb.org/3/trending/all/${enabled}?`}
                        />    
                    </Suspense>
                </div>
            </div>
        </>
     );
}

export default Trending;