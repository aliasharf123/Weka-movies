export type Content = {
    page: number;
    results: Array<ContentItem>;
    total_pages: number;
    total_results: number;
  };
  
export type ContentItem = {
    adult: boolean;
    backdrop_path: string;
    id: number;
    title?: string; // Use title for movies
    name?: string; // Use name for TV shows
    original_language: string;
    original_title?: string; // Use original_title for movies
    original_name?: string; // Use original_name for TV shows
    overview: string;
    poster_path: string;
    media_type: 'movie' | 'tv';
    genre_ids: number[];
    popularity: number;
    release_date?: string; // Use release_date for movies
    first_air_date?: string; // Use first_air_date for TV shows
    video: boolean;
    vote_average: number;
    vote_count: number;
    origin_country?: string[]; // Use origin_country for TV shows
};


