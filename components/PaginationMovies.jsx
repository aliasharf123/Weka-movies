'use client'

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });


function PaginationMovies({value , page , setPage}) {

    const handleChange = (event, value) => {
        setPage(value);
        window.scrollTo({top:0 ,left:0 , behavior:'smooth'})
    };

    return ( 
        <ThemeProvider theme={darkTheme}>
            <Stack spacing={2} className='m-auto mt-8 bg-[#121212] rounded-sm'>
                <Pagination color='primary' page={page}  count={value -2}  className='w-auto'  shape="rounded" onChange={handleChange}/>
            </Stack> 
        </ThemeProvider>
        
    );
}

export default PaginationMovies;