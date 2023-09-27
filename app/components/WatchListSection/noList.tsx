import React from "react";
import Link from "next/link";
import BookmarkBorderIconClient from "@/components/BookmarkBorderIconClient";

// render if No Movies in Favoorie list
export default function NoList() { //That means that he fired the gun empty
  return (
    <div className="flex flex-col justify-center items-center h-[12rem]">
      <div className="text-6xl bg-[rgba(0,0,0,0.4)] text-white">
        <BookmarkBorderIconClient />
      </div>
      <div className="flex flex-col  text-center items-center gap-2 ">
        <div className="grid place-content-center">
          <p className="font-bold">Your watchlist is empty</p>
          <p className="italic text-SecondaryText">That means that he fired the gun empty - The Shawshank Redemption</p>
          
        </div>
        <Link
          href={"/Movies"}
          className="p-2 px-6 rounded-lg font-medium bg-redColor w-fit"
        >
          Browse Popular movies
        </Link>
      </div>
    </div>
  );
}
