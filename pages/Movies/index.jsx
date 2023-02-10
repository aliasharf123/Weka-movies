import GenereMovies from "@/components/Genere";
import MenuDrop from "@/components/menudrop";
import GridOnIcon from '@mui/icons-material/GridOn';
import TableRowsIcon from '@mui/icons-material/TableRows';
import { useState } from "react";


function Movies() {
    const [style ,setStyle] = useState(false)
    return ( 
        <div className="m-11 mb-[2000px]">
            <div className="flex flex-col gap-4">
                <div className={`flex justify-between  text-white   bg-[#121212]  px-1 py-2 rounded-lg  w-56`}>
                    <button className={`m-auto`} onClick={() =>setStyle(false)}>
                        <GridOnIcon className={!style && 'text-[#F4181C]' }/>
                    </button>
                    <button className={`m-auto`} onClick={() =>setStyle(true)}>
                        <TableRowsIcon className={style && 'text-[#F4181C]' }/>
                    </button>
                </div> 
                <MenuDrop/>
                <GenereMovies/>
            </div>
        </div>
    );
}

export default Movies;