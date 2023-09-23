import Home from "@/pages";

export default async function () {
    const response  = await fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.NEXT_PUBLIC_DB_key}`); 
    const data = await response.json();
    const image = data.results[Math.floor(Math.random() * (19 - 0 + 1)) + 0].backdrop_path ; 
    return ( 
        <Home data={image}/>
     );
}

