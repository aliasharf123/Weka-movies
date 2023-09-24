import { db, users } from "@/firebase/Clients";
import { ContentItem } from "@/types/ContentType";
import { User } from "firebase/auth";
import { deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { cache } from "react";



// delete A movie from Favorite
export const DeleteMovie =cache( async (movie : ContentItem , user : User)=>{
    let id ;
    const q = query(users, where("movie.id", "==", movie.id) , where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      id = doc.id
    });
    if(id){
        await deleteDoc(doc(db, "Users", id));
    }
})