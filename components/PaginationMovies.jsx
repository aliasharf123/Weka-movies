import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


function PaginationMovies({value , setPage}) {

    const handleChange = (event, value) => {
        setPage(value);
    };

    return ( 

        <Stack spacing={2} className='m-auto mt-8 bg-white'>
            <Pagination count={value} sx={{
                '& .MuiPagination-text	':{
                    color: 'white'
                }
                
            }} variant="text"  shape="rounded" onChange={handleChange}/>
        </Stack> 
    
        
    );
}

export default PaginationMovies;