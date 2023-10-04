import { Suspense } from "react";
import PaginationMovies from "./PaginationMovies";
import DetaildContentCard from "@/app/(Content)/components/DetaildContentCard";

function GridResults({ data, page, media }: any) {
  return (
    <div>
      <div className="grid grid-cols-auto-fit max-sm:grid-cols-2  gap-5 mb-5  max-sm:px-6 px-10">
        {data.results &&
          data.results.map((movie: any) => {
            return <DetaildContentCard movie={movie} />;
          })}
      </div>
      <Suspense fallback={null}>
        {data.total_pages > 1 && (
          <PaginationMovies page={page} value={data.total_pages} />
        )}
      </Suspense>
    </div>
  );
}

export default GridResults;
