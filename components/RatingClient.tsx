'use client' 
import React from "react";
import { darkTheme } from '@/components/PaginationMovies'
import { Rating, ThemeProvider } from '@mui/material'

export default function RatingClient({rate} : {rate : number}) {
  return (
    <ThemeProvider theme={darkTheme}>
      <Rating
        size="small"
        readOnly
        name="half-rating"
        defaultValue={rate}
        precision={0.5}
      />
    </ThemeProvider>
  );
}
