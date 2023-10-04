// Import necessary modules and components
"use client";
import { auth } from "../firebase/Clients";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { message } from "antd";
import { AddtoFavorite } from "@/src/AddFavorite";
import { useEffect, useState } from "react";
import { FindMovie } from "@/src/CRUD/FindMovie";
// A Favorite Button icon component
function AddFavorite({ movie }: any) {
  const [user] = useAuthState(auth); // Get the authenticated user
  const [isInWatchList, setIsInWatchList] = useState(false);
  const router = useRouter();
  const [messageApiLoading, contextHolderLoading] = message.useMessage(); // message to determine a state of requests
  const [messageApiResult, contextHolderResult] = message.useMessage(); // message to determine a state of requests
  const Determine = async () => {
    if (user) {
      const res = await FindMovie(movie, user);
      setIsInWatchList(Boolean(res));
    }
  };
  useEffect(() => {
    Determine();
  }, []);
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
