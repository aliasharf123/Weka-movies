// Import the Home component from the correct path

import Home from "./components/HomePage";

// Function to fetch a random backdrop image from the API
async function getImage() {
        // Fetch data from the API using the API key from environment variables
        const response = await fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.NEXT_PUBLIC_DB_key}`);
        
        // Parse the JSON response
        const data = await response.json();

        // Generate a random index to select a backdrop image
        const randomIndex = Math.floor(Math.random() * data.results.length);

        // Get the backdrop path for the selected image
        const image = data.results[randomIndex].backdrop_path;

        return image;
    
}


export default async function HomePage() {
    const image = await getImage(); 
    return ( 
        <Home data={image}/>
     );
}


