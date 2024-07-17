export interface IMovieList {
  results: IMovie[];
  page: number;
  total_pages: number;
}

export interface IMovie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  genre_ids: number[];
  genres?: IGenre[];
  backdrop_path?: string;
  overview?: string;
  tagline?: string;
  original_title?: string;
  release_date?: string;
  runtime?: number;
  rate?: number;
  comment?: string;
  timestamp?: number;
}

export interface IGenre {
  id: number;
  name: string;
}