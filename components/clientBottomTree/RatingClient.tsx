'use client' 
import React from "react";
import { darkTheme } from '@/components/PaginationMovies'
import { Rating, ThemeProvider } from '@mui/material'

export default function RatingClient({rate} : {rate : number}) {
  return (
    <ThemeProvider theme={darkTheme}>
    {rate ?  <Rating
        size="small"
        readOnly
        name="half-rating"
        defaultValue={rate}
        precision={0.5}
      /> : <h1 className="text-Paragraph italic">Nr</h1>}
    </ThemeProvider>
  );
}
