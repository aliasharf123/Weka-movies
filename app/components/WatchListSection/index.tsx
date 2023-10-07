"use client";
import React from "react";
import { auth, users } from "@/firebase/Clients";
import NoUser from "./noUser";
import Loading from "./Loading";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import NoList from "./noList";
import ContentCard from "../contentCard";

export default function WatchListSection() {
  const [user, loading] = useAuthState(auth);
  // get a real time update from firebase store
  const q = user ? query(users, where("uid", "==", user.uid)) : null;
  const [movies] = useCollectionData(q);

  if (loading || !movies) return <Loading />;
  if (!user) return <NoUser />; // Mange Auth
  if (movies && !movies.length) return <NoList />;

  return (
    <div className="overflow-scroll overflow-y-auto md:pb-8 Custome-Scroll max-md:removeScroll ">
      <div className="flex  gap-5  ml-6  animate__animated animate__fadeIn">
        {movies.map((movie: any, index: number) => {
          return <ContentCard key={index} movie={movie.movie} />;
        })}
      </div>
    </div>
  );
}
