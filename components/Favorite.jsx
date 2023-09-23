// Import necessary modules and components
'use client'
import { auth, FindMovie, DeleteMovie, AddMovie } from '../firebase/Clients';
import { useRouter } from 'next/navigation';
import { useAuthState } from "react-firebase-hooks/auth";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useEffect, useState } from 'react';

// A Favorite Button icon component
function AddFavorite({ movie, media, Flex, single }) {
    const [user] = useAuthState(auth); // Get the authenticated user
    const router = useRouter();
    const [aleardy, setAleardy] = useState(false); // State to track if the movie is already favorited

    // Check if the movie is already favorited
    const IsFavority = async () => {
        if (user) {
            const state = await FindMovie(movie, user); // Get the movie's status
            setAleardy(state);
        } else {
            setAleardy(false);
        }
    }

    // Add or remove the movie from favorites
    const AddtoFavorite = async (movie) => {
        if (!user) { // Redirect to sign-in page if the user is not authenticated
            router.push('/signin');
        } else {
            const state = await FindMovie(movie, user);
            setAleardy(state);
            if (state === false) { // If the movie is not favorited, add it to favorites
                try {
                    const docRef = await AddMovie(movie, user, media);
                    console.log("Document written with ID: ", docRef.id);
                    setAleardy(true);
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            } else { // If the movie is favorited, remove it from favorites
                DeleteMovie(movie, user);
                setAleardy(false);
            }
        }
    }

    useEffect(() => { // Check the movie's status when the component mounts or when the user or aleardy status changes
        IsFavority();
    }, [user, aleardy]);

    return (
        <button className={`absolute ${Flex && 'right-0'} top-0 ${!single && 'bg-[rgba(0,0,0,0.4)] '}hover:brightness-125  z-30 text-white`} onClick={() => AddtoFavorite(movie)}>
            {/* Change icon appearance according to the favorited status */}
            {!aleardy ? <BookmarkBorderIcon /> : <BookmarkIcon />}
        </button>
    );
}

export default AddFavorite;
