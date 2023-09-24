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

// A Favorite Button icon component
function AddFavorite({ movie, media, Flex , single } : any) {
    const [user] = useAuthState(auth); // Get the authenticated user
    const router = useRouter();
    const [messageApi, contextHolder] = message.useMessage(); // message to determine a state of requests
    
    const success = (Name : string | undefined , Type : 'deleted' | 'Added') => {
        messageApi.open({
          type: 'success',
          content: Name + ' is successfully ' + Type ,
        });
      };
    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'This is an error message',
        });
    };

    // Add or remove the movie from favorites
    const AddtoFavorite = async (movie : ContentItem) => {
        if (!user) { // Redirect to sign-in page if the user is not authenticated
            router.push('/signin');
        } else {
            const state = await FindMovie(movie, user);
            const {title } = getInfo(movie)
            if (!state ) { // If the movie is not favorited, add it to favorites
                try {
                    await AddMovie(movie, user, media);
                    success(title , 'Added')
                } catch (e) {
                    error()
                }
            } else { // If the movie is favorited, remove it from favorites
                try {
                    await DeleteMovie(movie, user);
                    success(title, 'deleted')
                } catch (e) {
                    error()
                }
            }
            revalidatePath('/componenets/WatchListSection/watchList')
        }
    }
    return (
        <>
            <button className={`hover:brightness-125   text-white flex justify-center items-center`} onClick={() => AddtoFavorite(movie)}>
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
