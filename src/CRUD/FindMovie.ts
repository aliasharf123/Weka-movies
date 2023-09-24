import { users } from "@/firebase/Clients";
import { ContentItem } from "@/types/ContentType";
import { User } from "firebase/auth";
import { getDocs, query, where } from "firebase/firestore";
import { cache } from 'react'



// Determine a movie is Favorite or not 
export const FindMovie = cache( async (movies : ContentItem , user : User) =>{
    const movie = []
    const q = query(users, where("uid", "==", user.uid) , where('movie.id' , '==' , movies.id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      movie.push(doc.data())
    });
    return movie.length ;
})