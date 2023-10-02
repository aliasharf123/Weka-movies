import { ContentItem } from "@/types/ContentType";
import { AddMovie } from "./CRUD/AddMovie";
import { DeleteMovie } from "./CRUD/DeleteMovie";
import { FindMovie } from "./CRUD/FindMovie";
import getInfo from "./getInfo";
import { error, loading, success } from "./messages";
import { User } from "firebase/auth";
import { MessageInstance } from "antd/es/message/interface";

// Add or remove the movie from favorites
export const AddtoFavorite = async (
  movie: ContentItem,
  user: User | null | undefined,
  router: any,
  messageApi: MessageInstance,
  messageApiLoading: MessageInstance
) => {
  // console.log(movie , media)
  if (!user) {
    // Redirect to sign-in page if the user is not authenticated
    router.push("/signin");
  } else {
    const { title ,type } = getInfo(movie);
    loading(messageApiLoading, title);
    const state = await FindMovie(movie, user);
    if (!state) {
      // If the movie is not favorited, add it to favorites
      try {
        await AddMovie(movie, user);
        success(title, "Added", messageApi);
        messageApiLoading.destroy();
      } catch (e) {
        error(messageApi);
        messageApiLoading.destroy();
      }
    } else {
      // If the movie is favorited, remove it from favorites
      try {
        await DeleteMovie(movie, user);
        success(title, "deleted", messageApi);
        messageApiLoading.destroy();
      } catch (e) {
        error(messageApi);
        messageApiLoading.destroy(); // stop loading
      }
    }
  }
};
