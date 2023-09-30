"use client";
import { fetcher } from "@/components/TrailerModel";
import { SinglePerson } from "@/types/PeopleType";
import { SocialMediaType } from "@/types/socialMediaType";
import React from "react";
import useSWR from "swr";
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Link from "next/link";
export default function SocialMedia({ person }: { person: SinglePerson }) {
  const {data , isLoading} : {data :  SocialMediaType,isLoading : boolean } = useSWR(
    `https://api.themoviedb.org/3/person/${person.id}/external_ids?api_key=${process.env.NEXT_PUBLIC_DB_key}
   `,
    fetcher
  ); 
  if(isLoading) return <h1>Loading....</h1>
  return (
    <div className="text-4xl flex flex-wrap gap-3">
        {data.facebook_id && <Link href={`https://www.facebook.com/${data.facebook_id}`}>
            <FacebookRoundedIcon fontSize="inherit"/>
        </Link>}
        {data.instagram_id && <Link href={`https://www.instagram.com/${data.instagram_id}`}>
            <InstagramIcon fontSize="inherit"/>
        </Link>}
        {data.twitter_id && <Link href={`https://twitter.com/${data.twitter_id}`}>
            <TwitterIcon fontSize="inherit"/>
        </Link>}
        {data.youtube_id && <Link href={`https://twitter.com/${data.youtube_id}`}>
            <YouTubeIcon fontSize="inherit"/>
        </Link>}
    </div>
  );
}
