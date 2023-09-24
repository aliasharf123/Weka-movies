import { users } from "@/firebase/Clients"
import { ContentItem } from "@/types/ContentType"
import { User } from "firebase/auth"
import { addDoc } from "firebase/firestore"
import { cache } from "react"


// Add Movie to Favorite List
export const AddMovie = cache( async (movie : ContentItem, user :User , media : string) =>{
    return await addDoc(users, {
        uid :user.uid,
        movie: {...movie, media_type : (media || movie.media_type )}
    })
})