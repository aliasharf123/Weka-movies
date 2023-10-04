import { ContentItem } from "@/types/ContentType";
import React from "react";
import ContentBanner from "./ContentBanner";
import TopCast from "./TopCast";
import Reviews from "./Reviews/Reviews";
import Photos from "./Photos";
import Recommendation from "./Recommendation";
import Model from "@/components/TrailerModel";
import SeasonSection from "./Seasons/SeasonSection";
import ContentInfo from "./SideContentInfo";

export default function SingleContent({
  Cotent,
  trailerId,
}: {
  Cotent: any;
  trailerId: string;
}) {
  return (
    <div className="flex flex-col gap-8">
      <ContentBanner Content={Cotent as any} />
      <div className="flex gap-4  max-lg:flex-col md:px-10">
        <div className="flex flex-1 flex-col gap-8">
          <TopCast Content={Cotent} />
          {Cotent.last_episode_to_air && <SeasonSection Cotent={Cotent} />}
          <Reviews Content={Cotent} />
          <Photos Content={Cotent} />
          <Recommendation Content={Cotent} />
        </div>
        <ContentInfo Content={Cotent as any} />
      </div>
      {trailerId && <Model />}
    </div>
  );
}
