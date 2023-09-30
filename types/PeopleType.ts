export type KnownForItem= {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  media_type: string;
  name?: string; // It's optional because it's only present in TV items.
  first_air_date?: string; // It's optional because it's only present in TV items.
  original_language: string;
  original_title?: string; // It's optional because it's only present in movie items.
  overview: string;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
  release_date?: string; // It's optional because it's only present in movie items.
  title?: string; // It's optional because it's only present in movie items.
  video?: boolean; // It's optional because it's only present in movie items.
  origin_country?: string[]; // It's optional because it's only present in TV items.
}

export type PageResult = {
  page: number;
  results: PersonResult[];
  total_pages: number;
  total_results: number;
}
export type PersonResult = {
  adult: boolean;
  gender: number;
  id: number;
  known_for: KnownForItem[];
  known_for_department: string;
  name: string;
  popularity: number;
  profile_path: string | null;
};

export type SinglePerson = {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string | null;
  gender: number;
  homepage: string | null;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string | null;
};