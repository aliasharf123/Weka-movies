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
import { auth } from "@/firebase/Clients";
import { useRouter } from "next/navigation";
import { FindMovie } from "@/src/CRUD/FindMovie";
export default function SeeMore({ movie }: { movie: ContentItem }) {
  const { title } = getInfo(movie);
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [isInWatchList, setIsInWatchList] = useState(false);

  const [messageApiLoading, contextHolderLoading] = message.useMessage(); // message to determine a state of requests
  const [messageApiResult, contextHolderResult] = message.useMessage(); // message to determine a state of requests

  const ClickSeeMore = (e: any) => {
    e.preventDefault();
  };
  const Determine = async () => {
    if (user) {
      const res = await FindMovie(movie, user);
      setIsInWatchList(Boolean(res));
    }
  };
  useEffect(() => {
    Determine();
  }, [movie.id]);

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
