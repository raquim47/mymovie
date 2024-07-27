export interface IMovieList {
  results: IMovie[];
  page: number;
  total_pages: number;
}

export interface IRatings {
  [userId: string]: {
    nickName: string;
    photoUrl: string;
    rating: number;
    timestamp: number;
  };
}

export interface IMovie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path?: string;
  genres?: IGenre[];
  genre_ids?: number[];
  overview?: string;
  tagline?: string;
  original_title?: string;
  release_date?: string;
  runtime?: number;
  ratings?: IRatings;
  rating?: number;
  comment?: string;
  timestamp?: number;
}

export interface IGenre {
  id: number;
  name: string;
}
