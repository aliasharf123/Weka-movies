'use client'
import { ContentItem } from '@/types/ContentType'
import React from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { MantineProvider, Menu } from '@mantine/core';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DescriptionIcon from '@mui/icons-material/Description';
import Link from 'next/link';
import getInfo from '@/src/getInfo';
import { message } from 'antd';
import { AddtoFavorite } from '@/src/AddFavorite';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/Clients';
import { useRouter } from 'next/navigation';
export default function SeeMore({movie} : {movie : ContentItem}) {
    const {title, realseData , type} = getInfo(movie)
    const [user , loading] = useAuthState(auth)
    const router = useRouter()
    const [messageApi, contextHolder] = message.useMessage(); // message to determine a state of requests

    const ClickSeeMore = (e : any) =>{
        e.preventDefault()
    }
    

    return (
      <MantineProvider theme={{ colorScheme: "dark" }}>
        <Menu shadow="md">
          <Menu.Target>
            <div
              onClick={ClickSeeMore}
              className="absolute top-0 right-0 m-2 bg-WhiteTransparent rounded-full flex justify-center items-center p-px hover:brightness-75 duration-300 "
            >
              <MoreHorizIcon />
            </div>
          </Menu.Target>

          <Menu.Dropdown onClick={ClickSeeMore} className="z-50">
            <Menu.Item>
              <div onClick={() => AddtoFavorite(movie , user , router , movie.media_type , messageApi)} className="flex items-center justify-center gap-1">
                <FavoriteIcon fontSize="small" /> Favorite
              </div>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item>
              <Link href={`/${type}/${movie.id}-${title?.replaceAll(' ' , '-')}`} className="flex items-center  gap-1 text-start">
                <DescriptionIcon fontSize="small" /> Page
              </Link>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
        {contextHolder}
      </MantineProvider>
    );
}
