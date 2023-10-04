import { ContentItem } from "@/types/ContentType";
import { SingleMovieData } from "@/types/SingleMovieType";
import { SingleTVSeries } from "@/types/SingleTvShow";
import React , {Suspense} from "react";
import SocialMedia from "../SocialMedia";
import getInfo from "@/src/getInfo";
import { languges } from "@/src/data";
import Image from "next/image";
import Keywords from "./keywords";

export default async function ContentInfo({
  Content,
}: {
  Content: SingleMovieData | SingleTVSeries;
}) {
  const { type } = getInfo(Content as any);
  return (
    <div className="lg:w-60 max-md:px-6 text-white flex flex-col gap-6">
      {/* Social media links */}
      <SocialMedia Type={type === "Movies" ? "movie" : "tv"} id={Content.id} />
      {/* Status of content */}
      <div>
        <h1 className="font-medium">Status</h1>
        <p className="text-Paragraph">{Content.status}</p>
      </div>
      {/* Original Language of content */}
      <div>
        <h1 className="font-medium">Original Language</h1>
        <p className="text-Paragraph">
          {
            languges.find(
              (lang) => lang.iso_639_1 === Content.original_language
            )?.english_name
          }
        </p>
      </div>
      {/* Budget of movie */}
      {(Content as SingleMovieData).budget  > 0 && (
        <div>
          <h1 className="font-medium">Budget</h1>
          <p className="text-Paragraph">${(Content as SingleMovieData).budget.toLocaleString("en-us")}</p>
        </div>
      )}
      {/* Revenue of movie */}
      {(Content as SingleMovieData).revenue > 0 && (
        <div>
          <h1 className="font-medium">Revenue</h1>
          <p className="text-Paragraph">${(Content as SingleMovieData).revenue.toLocaleString("en-us")}</p>
        </div>
      )}
      {/* A network own a tv show */}
      {(Content as SingleTVSeries).networks && (
        (Content as SingleTVSeries).networks.length > 0 && (
          <div>
            <h1 className="font-medium">Networks</h1>
            <div className="flex flex-wrap gap-1">
              {(Content as SingleTVSeries).networks.map((network, index) => (
                <Image
                  width={80}
                  height={80}
                  className="h-8"
                  alt={network.name}
                  key={index}
                  src={`https://www.themoviedb.org/t/p/w500${network.logo_path}`}
                />
              ))}
            </div>
          </div>
        )
      ) }
      {/* Type of tv show */}
       {(Content as SingleTVSeries).type && (
        <div>
          <h1 className="font-medium">Type</h1>
          <p className="text-Paragraph">{(Content as SingleTVSeries).type}</p>
        </div>
      )}
      {/* KeyWords of content */}
      <Suspense fallback={<h1 className="font-medium">Loading...</h1>}>
        <Keywords Content={Content}/>
      </Suspense>
    </div>
  );
}
