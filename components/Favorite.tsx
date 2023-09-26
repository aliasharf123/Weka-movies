// Import necessary modules and components
'use client'
import { auth} from '../firebase/Clients';
import { useRouter } from 'next/navigation';
import { useAuthState } from "react-firebase-hooks/auth";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { revalidatePath } from 'next/cache'
import { Button, message } from 'antd';
import { ContentItem } from '@/types/ContentType';
import { FindMovie } from '@/src/CRUD/FindMovie';
import { AddMovie } from '@/src/CRUD/AddMovie';
import { DeleteMovie } from '@/src/CRUD/DeleteMovie';
import getInfo from '@/src/getInfo';
import { success ,error } from '@/src/messages';
import { User } from 'firebase/auth';
import { AddtoFavorite } from '@/src/AddFavorite';

// A Favorite Button icon component
function AddFavorite({ movie, media} : any) {
    const [user] = useAuthState(auth); // Get the authenticated user
    const router = useRouter();
    const [messageApi, contextHolder] = message.useMessage(); // message to determine a state of requests
    
    return (
        <>
            <button className={`hover:brightness-125   text-white flex justify-center items-center`} onClick={() => AddtoFavorite(movie , user , router , media , messageApi)}>
                {/* Change icon appearance according to the favorited status */}
                {/* {!aleardy ?  */}
                <BookmarkBorderIcon  /> 
                {/* // : 
                // <BookmarkIcon fontSize='inherit'/>} */}
                <h1 className='hidden'>Add or remove from Favorite </h1>
            </button>
            {contextHolder}
        </>
    );
}

export default AddFavorite;
