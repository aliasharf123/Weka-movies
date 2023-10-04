'use client'
import { useSearchParams } from "next/navigation";

// initilize  FilterParams
export default function useGetFilterParams() {
  const searchParams = useSearchParams();
  return {
    page: searchParams.get("page") ?? "",
    languge: searchParams.get("languge") ?? "",
    startDate :  searchParams.get("startDate") ?? "",
    endDate :  searchParams.get("endDate") ?? "",
    sort: searchParams.get("sort") ?? "popularity.desc",
    genere: searchParams.get("genere") ?? "",
  };
}
