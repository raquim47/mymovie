export interface IMovieList {
  results: IMovie[];
  page: number;
  total_pages: number;
}

export interface IReviews {
  [userId: string]: {
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
}

export interface IMovieSummary {
  id: number;
  title: string;
  poster_path?: string;
  genres?: IGenre[];
  timestamp?: number;
}

export interface IReviewListMovie extends IMovieSummary {
  rating: number;
  comment?: string;
}

export interface IGenre {
  id: number;
  name: string;
}
