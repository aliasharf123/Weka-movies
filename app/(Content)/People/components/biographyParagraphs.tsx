"use client";
import React, { useState, useRef } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

export default function BiographyParagraphs({
  biography,
}: {
  biography: string;
}) {
  const biographyParagraphs = biography.split("\n");
  const [readmore, setReadmore] = useState(false);
  const ref = useRef<HTMLDivElement>();
  const isLarge = !readmore && biographyParagraphs.length > 1 // to detect if bio is large so need readmore
  const handleReadMore = () => {
    setReadmore(true);
    // document.getElementById('Di  v')?.classList.remove("Fade");
  };
  return (
    <>
      {biography ? (
        <div
          id="Div"
          className={`grid ${
            isLarge&& "h-56 Fade"
          }  overflow-hidden relative  gap-2`}
        >
          {biographyParagraphs.map((paragraph, index) => (
            <p className="" key={index}>
              {paragraph}
            </p>
          ))}
          {isLarge && (
            <button
              className="absolute bottom-0  bg-[#111310] pl-6 rounded-lg  right-0 z-40 text-redColor font-medium "
              onClick={handleReadMore}
            >
              Read More
              <ChevronLeftIcon className="rotate-180" />
            </button>
          )}
        </div>
      ) : (
        <div>Can't find biography</div>
      )}
    </>
  );
}
