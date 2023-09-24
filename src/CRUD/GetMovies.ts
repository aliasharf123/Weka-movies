import { users } from "@/firebase/Clients";
import { ContentItem } from "@/types/ContentType";
import { User } from "firebase/auth";
import { getDocs, query, where } from "firebase/firestore";
import { cache } from "react";



// get all favorite movies
export const GetMovies =cache( async (user : User) : Promise<ContentItem[]> =>{
    const movie : ContentItem[] = []
    const q = query(users, where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      movie.push(doc.data() as any)
    });
    return movie;
  } )