// Import necessary modules and components
"use client";
import { auth, users } from "../firebase/Clients";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { message } from "antd";
import { AddtoFavorite } from "@/src/AddFavorite";
import { collection, query, where } from "firebase/firestore";
// A Favorite Button icon component
function AddFavorite({ movie }: any) {
  const [user] = useAuthState(auth); // Get the authenticated user
  // get a real time update from firebase store 
  const q =user ?  query(users, where("uid", "==", user?.uid) , where('movie.id' , '==' , movie.id)) : null
  const [data] = useCollectionData(q)
  // determine if there is a movie in a watch list
  const isInWatchList = data?.length ? true : false
  const router = useRouter();
  const [messageApiLoading, contextHolderLoading] = message.useMessage(); // message to determine a state of requests
  const [messageApiResult, contextHolderResult] = message.useMessage(); // message to determine a state of requests

  return (
    <div>
      <button
        className={`hover:brightness-125   text-white flex justify-center items-center`}
        onClick={(e) => {
          e.preventDefault();
          AddtoFavorite(
            movie,
            user,
            router,
            messageApiResult,
            messageApiLoading
          );
        }}
      >
        {/* Change icon appearance according to the favorited status */}
        {!isInWatchList ? (
          <BookmarkBorderIcon fontSize="inherit" />
        ) : (
          <BookmarkIcon fontSize="inherit" />
        )}
        <h1 className="hidden">Add or remove from Favorite </h1>
      </button>
      {contextHolderLoading}
      {contextHolderResult}
    </div>
  );
}

export default AddFavorite;
