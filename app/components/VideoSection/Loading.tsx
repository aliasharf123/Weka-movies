'use client'
import React from 'react'
import { Skeleton } from "@mui/material";

export default function Loading() {
  return (
    <div className="gap-5 cursor-pointer relative justify-center h-[240px] flex"> 
        <Skeleton sx={{ bgcolor: 'rgba(0,0,0,0.6)' }} variant="rounded" width={480} height={240} />
        <Skeleton sx={{ bgcolor: 'rgba(0,0,0,0.6)' }} variant="rounded" width={480} height={240} />
        <Skeleton sx={{ bgcolor: 'rgba(0,0,0,0.6)' }} variant="rounded" width={480} height={240} />
        <Skeleton sx={{ bgcolor: 'rgba(0,0,0,0.6)' }} variant="rounded" width={480} height={240} />
        <Skeleton sx={{ bgcolor: 'rgba(0,0,0,0.6)' }} variant="rounded" width={480} height={240} />
    </div>   
  )
}
