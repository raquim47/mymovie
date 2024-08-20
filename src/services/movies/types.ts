export interface IMovieList<T = IMovie> {
  results: T[];
  page: number;
  total_pages: number;
}

export interface IReviews {
  [userId: string]: {
    email: string;
    nickName: string;
    photoUrl: string;
    rating: number;
    comment?: string;
    timestamp: string;
  };
}

export interface IMovie {
  id: number;
  title: string;
  poster_path?: string;
  backdrop_path?: string;
  genres?: IGenre[];
  genre_ids?: number[];
  overview?: string;
  tagline?: string;
  original_title?: string;
  release_date?: string;
  runtime?: number;
  reviews?: IReviews;
}

export interface IMovieSummary {
  id: number;
  title: string;
  poster_path?: string;
  genres?: IGenre[];
  genre_ids?: number[];
  timestamp?: number;
  rating?: number;
  comment?: string;
  isWatchList?: boolean;
}

export interface IGenre {
  id: number;
  name: string;
}
