import { auth ,users ,FindMovie,  DeleteMovie } from '@/firebase/Clients';
import { useRouter } from 'next/router';
import { useAuthState } from "react-firebase-hooks/auth";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { addDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';


function AddFavorite({movie , media , Flex , single}) {
    const [user ] = useAuthState(auth)
    const router = useRouter();
    const [aleardy ,setAleardy] = useState(false)


    const aleardyFunction = async () =>{
      if(user){
        const state = await FindMovie(movie , user)
        setAleardy(state)

      }
      else{
        setAleardy(0)
      }
    }

    const AddtoFavorite = async (movie) =>{
      if(!user){
        router.push('/signin')
      } 
      else{
        const state = await FindMovie(movie , user)
        setAleardy(state);
        if(state === 0){
          try {
            const docRef = await addDoc(users, {
              uid :user.uid,
              movie: {...movie, media_type : (media || movie.media_type )}
            });
            
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
      useEffect( () =>{
        aleardyFunction()
        // console.log(aleardy)
      } , [user , aleardy] )
      


    return ( 
        <button className={`absolute ${Flex && 'right-0'}  top-0 ${!single &&  'bg-[rgba(0,0,0,0.4)] ' }hover:brightness-125  z-30 text-white`} onClick={() =>AddtoFavorite(movie)} >
          {!aleardy ?  <BookmarkBorderIcon/> :<BookmarkIcon  /> }
        </button>
     );
}

export default AddFavorite;