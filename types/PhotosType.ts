export type Backdrop = {
  aspect_ratio: number;
  height: number;
  iso_639_1: string | null;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
};

export type Poster = {
  aspect_ratio: number;
  height: number;
  iso_639_1: string | null;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
};

export type MovieImages = {
  backdrops: Backdrop[];
  id: number;
  logos: any[]; // You can define a specific type for logos if needed.
  posters: Poster[];
};
