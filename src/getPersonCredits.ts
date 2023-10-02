import { CreditsResponceType } from "@/types/credits";
import { cache } from "react";

export const getAllCredits = cache(async (person_id: number) => {
  // return a array of known for works and all movies credits and tv hows
  const url = `https://api.themoviedb.org/3/person/${person_id}/`;
  const key = `?api_key=${process.env.NEXT_PUBLIC_DB_key}`
  const combined_credits_Responce = await fetch(url + "combined_credits"+ key);
  const movie_credits_Responce = await fetch(url + "movie_credits" + key);
  const tv_credits_Responce = await fetch(url + "tv_credits" + key);

  const combined_credits : CreditsResponceType = await combined_credits_Responce.json();
  const movie_credits :CreditsResponceType = await movie_credits_Responce.json();
  const tv_credits  : CreditsResponceType= await tv_credits_Responce.json();


  return {combined_credits, movie_credits, tv_credits};
});
