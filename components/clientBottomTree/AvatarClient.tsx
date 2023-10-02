import React from 'react'
import { Avatar } from "@mui/material";

export default function AvatarClient({src} : {src : string}) {
  return (
    <Avatar src={src} sx={{ width: "60px", height: "60px" }} alt="none" />
  )
}
