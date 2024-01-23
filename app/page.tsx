import { Suspense } from "react";
import BackgroundSection from "./components/BackgroundSection";
import WatchListSection from "./components/WatchListSection";
import Trending from "./components/TrendingSection";
import Video from "./components/VideoSection";
import Loading from "./components/BackgroundSection/Loading";

export default function Home() {
  return (
    <main className=" lg:px-40 flex flex-col gap-9">
      {/* Background Image Section */}
      <Suspense fallback={<Loading />}>
        <BackgroundSection />
      </Suspense>

      <div>
        {/* What to Watch Section */}
        <div className="text-white  flex flex-col ">
          <h1 className="text-header mb-4">What to watch</h1>
          <WatchListSection />
        </div>

        {/* Video and Trending Section */}
        <div className="text-white  flex flex-col  gap-6">
          {/* Video Component */}
          <Video />
          {/* Trending Component */}
          <Trending />
        </div>
      </div>
    </main>
  );
}
