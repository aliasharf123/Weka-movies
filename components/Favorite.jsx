import { auth ,users ,FindMovie,  DeleteMovie, AddMovie } from '@/firebase/Clients';
import { useRouter } from 'next/router';
import { useAuthState } from "react-firebase-hooks/auth";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { addDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

// A Favorite Button icon 
function AddFavorite({movie , media , Flex , single}) {
    const [user ] = useAuthState(auth)
    const router = useRouter();
    const [aleardy ,setAleardy] = useState(false)

    // Cheack if movies aleardy Favority
    const IsFavority = async () =>{
      if(user){
        const state = await FindMovie(movie , user) // get a movie status
        setAleardy(state) 
      }
      else{
        setAleardy(0)
      }
    }
    // Add or remove movie to/from favorite 
    const AddtoFavorite = async (movie) =>{
      if(!user){ // can't click on button without sign in or up
        router.push('/signin')
      } 
      else{
        const state = await FindMovie(movie , user) 
        setAleardy(state);
        if(state === 0){
          try {
            const docRef = await AddMovie(movie , user , media)
            
            console.log("Document written with ID: ", docRef.id);
            setAleardy(1) 
          } catch (e) {
            console.error("Error adding document: ", e);
          }
          }
          else{
            DeleteMovie(movie , user)
            setAleardy(0)
          }
        }
      }
      useEffect( () =>{ // Cheack a Movie status according to user and aleardy status
        IsFavority()
      } , [user , aleardy] )
      
    return ( 
        <button className={`absolute ${Flex && 'right-0'}  top-0 ${!single &&  'bg-[rgba(0,0,0,0.4)] ' }hover:brightness-125  z-30 text-white`} onClick={() =>AddtoFavorite(movie)} >
          {/* Change icon appearness according to status  */}
          {!aleardy ?  <BookmarkBorderIcon/> :<BookmarkIcon  /> }
        </button>
     );
}

export default AddFavorite;