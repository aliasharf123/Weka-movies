'use client'

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';


export const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });


function PaginationMovies({value , page} : any) {
    const router = useRouter()
    const searchParams = useSearchParams()!
    const pathname = usePathname()
    const handleChange = (event : any, value : number) => {
        const params = new URLSearchParams(searchParams) // pass params to URLSearchParams to set another params
        params.set('page' , value.toString())
        router.push(pathname + '?' + params.toString())
        window.scrollTo({top:0 ,left:0 , behavior:'smooth'})
    };

    return ( 
        <ThemeProvider theme={darkTheme}>
            <Stack spacing={2} className='m-auto mt-8 bg-[#121212] rounded-sm'>
                <Pagination color='primary' page={Number(page)}  count={value -2}  className='w-auto'  shape="rounded" onChange={handleChange}/>
            </Stack> 
        </ThemeProvider>
        
    );
}

export default PaginationMovies;