import { ContentItem } from "@/types/ContentType";
import { AddMovie } from "./CRUD/AddMovie";
import { DeleteMovie } from "./CRUD/DeleteMovie";
import { FindMovie } from "./CRUD/FindMovie";
import getInfo from "./getInfo";
import { error, success } from "./messages";
import { User } from "firebase/auth";

    // Add or remove the movie from favorites
  export  const AddtoFavorite = async (movie : ContentItem , user: User| null | undefined , router : any , media: any ,messageApi : any) => {
      // console.log(movie , media)
      if (!user) {
        // Redirect to sign-in page if the user is not authenticated
        router.push("/signin");
      } else {
        const state = await FindMovie(movie, user);
        const { title } = getInfo(movie);
        if (!state) {
          // If the movie is not favorited, add it to favorites
          try {
            await AddMovie(movie, user, media);
            success(title, "Added", messageApi);
          } catch (e) {
            error(messageApi);
          }
        } else {
          // If the movie is favorited, remove it from favorites
          try {
            await DeleteMovie(movie, user);
            success(title, "deleted", messageApi);
          } catch (e) {
            error(messageApi);
          }
        }
      }
    }