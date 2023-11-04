
import { Content, ContentItem } from "@/types/ContentType";
import ContentCard from "../contentCard";

// This function creates a query client that caches query results based on their names.
export function makeQueryClient() {
  // Create a Map to store promises associated with query names.
  const fetchMap = new Map<string, Promise<any>>();

  // Define the queryClient function that accepts a query name and a query function.
  return function queryClient<QueryResult>(
    name: string,               // The name of the query, used as a key in the cache.
    query: () => Promise<QueryResult> // The function that returns a promise for the query.
  ): Promise<QueryResult> {
    // Check if a promise for this query name already exists in the cache.
    if (!fetchMap.has(name)) {
      // If not, set a new promise in the cache by calling the query function.
      fetchMap.set(name, query());
    }
    // remove cach after 3000000 ms 
    setTimeout(() =>  fetchMap.delete(name), 30000000)
    // Return the promise associated with this query name (either existing or newly created).
    return fetchMap.get(name)!;
  };
}

const queryClient = makeQueryClient();
export default async function MoviesList({url}: {url : string}) {
    const data = await queryClient<Content>(url , ()=> fetch(url+`&api_key=${process.env.NEXT_PUBLIC_DB_key}`).then((res) => res.json()))
    return (           
      <>
        {data.results.map((movie: ContentItem) =>{
          return(
            <ContentCard key={movie.id} movie={movie}/>
          ) 
        })}
      </>  
      );   
}