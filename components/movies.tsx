
import { ContentItem } from "@/types/ContentType";
import ContentCard from "./contentCard";

export default async function MoviesList({url}: {url : string}) {
    const res = await fetch(url+`&api_key=${process.env.NEXT_PUBLIC_DB_key}`)
    const data = await res.json()
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