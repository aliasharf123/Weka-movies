"use client";
import { ContentItem } from "@/types/ContentType";
import React, { useEffect, useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { MantineProvider, Menu } from "@mantine/core";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import DescriptionIcon from "@mui/icons-material/Description";
import Link from "next/link";
import getInfo from "@/src/getInfo";
import { message } from "antd";
import { AddtoFavorite } from "@/src/AddFavorite";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, users } from "@/firebase/Clients";
import { useRouter } from "next/navigation";
import { query, where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
export default function SeeMore({ movie }: { movie: ContentItem }) {
  const { title } = getInfo(movie);
  const [user] = useAuthState(auth);
  const router = useRouter();
  // get a real time update from firebase store 
  const q =user ?  query(users, where("uid", "==", user?.uid) , where('movie.id' , '==' , movie.id)) : null
  const [data] = useCollectionData(q)
  // determine if there is a movie in a watch list
  const isInWatchList = data?.length ? true : false
  const [messageApiLoading, contextHolderLoading] = message.useMessage(); // message to determine a state of requests
  const [messageApiResult, contextHolderResult] = message.useMessage(); // message to determine a state of requests

  const ClickSeeMore = (e: any) => {
    e.preventDefault();
  };
  return (
    <MantineProvider theme={{ colorScheme: "dark" }}>
      <Menu shadow="md"  position="bottom-end"  withArrow>
        <Menu.Target>
          <div
            onClick={ClickSeeMore}
            className="absolute top-0 right-0 m-2 bg-WhiteTransparent rounded-full flex justify-center items-center p-px hover:brightness-75 duration-300 "
          >
            <MoreHorizIcon />
          </div>
        </Menu.Target>

        <Menu.Dropdown  onClick={ClickSeeMore}>
          <Menu.Item>
            <div
              onClick={() =>
                AddtoFavorite(
                  movie,
                  user,
                  router,
                  messageApiResult,
                  messageApiLoading
                )
              }
              className="flex  items-center justify-center gap-1"
            >
              {!isInWatchList ? (
                <BookmarkBorderIcon fontSize="small" />
              ) : (
                <BookmarkIcon fontSize="small" />
              )}
              Favorite
            </div>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item>
            <Link
              href={`/${movie.media_type}/${movie.id}-${title?.replaceAll(
                " ",
                "-"
              )}`}
              className="flex items-center  gap-1 text-start"
            >
              <DescriptionIcon fontSize="small" /> Page
            </Link>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      {contextHolderLoading}
      {contextHolderResult}
    </MantineProvider>
  );
}
