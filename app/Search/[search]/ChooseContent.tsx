"use client";
import { ContentTypes } from "@/types/ContentNames";
import { useParams, useSearchParams , useRouter } from "next/navigation";
import React from "react";

export default function ChooseContent() {
  const router = useRouter();
  const Query = useSearchParams().get('q')
  const SearchContent = (useParams() as {search : string}).search
  const ChangeContent = (Content : string) => {
    router.push(`/Search/${Content}?q=${Query}`)
  }
  return (
    <div className="flex flex-col gap-10 border-b border-[rgba(255,255,255,0.2)] ">
      <h1 className="text-3xl text-center text-[rgba(255,255,255,0.8)]  font-medium">
        Search results: “{decodeURIComponent(Query ?? '' as any)}”
      </h1>
      <ul className="flex  font-medium text-center text-[rgba(255,255,255,0.8)] m-auto gap-5  ">
        {ContentTypes.map((Content, index) => {
          return (
            <li key={index}>
              <button
                onClick={() => {
                 ChangeContent(Content);
                }}
                className={` border-solid  px-2  pb-4 border-[#F4181C] ${
                    SearchContent == Content && "border-b-2 text-white"
                }`}
              >
                {Content}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
