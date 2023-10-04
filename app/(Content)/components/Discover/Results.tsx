import { makeQueryClient } from "@/app/components/TrendingSection/movies";
import React, { Suspense } from "react";
import DetaildContentCard from "../DetaildContentCard";
import PaginationMovies from "@/components/PaginationMovies";

const queryClient = makeQueryClient(); // to cache a decripe url

export default async function Results({
  url,
  page,
}: {
  url: string;
  page: string;
}) {
  const data = await queryClient(url, () =>
    fetch(url + `&api_key=${process.env.NEXT_PUBLIC_DB_key}`).then((res) =>
      res.json()
    )
  );
  return (
    <>
      <div
        className="grid gap-5 grid-cols-auto-fit-discover place-content-start  max-sm:grid-cols-2  "
        key={url}
      >
        {data.results.length ? (
          data.results.map((movie: any) => {
            return <DetaildContentCard movie={movie} />;
          })
        ) : (
          <h1 className="h-screen">No Result Found</h1>
        )}
      </div>
      <Suspense fallback={null}>
        {data.total_pages > 1 && (
          <PaginationMovies page={page} value={data.total_pages} />
        )}
      </Suspense>
    </>
  );
}
