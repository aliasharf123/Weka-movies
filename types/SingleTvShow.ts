export type SingleTVSeries = {
    adult: boolean;
    backdrop_path: string;
    created_by: any[]; // Replace with the appropriate type if available
    episode_run_time: number[];
    first_air_date: string;
    genres: { id: number; name: string }[];
    homepage: string;
    id: number;
    in_production: boolean;
    languages: string[];
    last_air_date: string;
    last_episode_to_air: {
      id: number;
      name: string;
      overview: string;
      vote_average: number;
      vote_count: number;
      air_date: string;
      episode_number: number;
      episode_type: string;
      production_code: string;
      runtime: number;
      season_number: number;
      show_id: number;
      still_path: string;
    } | null;
    name: string;
    next_episode_to_air: null | any; // Replace with the appropriate type if available
    networks: any[]; // Replace with the appropriate type if available
    number_of_episodes: number;
    number_of_seasons: number;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: {
      id: number;
      logo_path: string;
      name: string;
      origin_country: string;
    }[];
    production_countries: any[]; // Replace with the appropriate type if available
    seasons: seasonType[];
    spoken_languages: {
      english_name: string;
      iso_639_1: string;
      name: string;
    }[];
    status: string;
    tagline: string;
    type: string;
    vote_average: number;
    vote_count: number;
  };
export type seasonType =  {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  vote_average: number;
}