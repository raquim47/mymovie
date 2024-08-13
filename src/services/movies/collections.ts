import { handleRequestTMDB } from "utils/request-handler";
import { IMovieList } from "./types";

export const getHomeMovies = async () => {
  const [latest, upcoming, trending, topRated] = await Promise.all([
    handleRequestTMDB<IMovieList>('movie/now_playing'),
    handleRequestTMDB<IMovieList>('movie/upcoming'),
    handleRequestTMDB<IMovieList>('trending/movie/day'),
    handleRequestTMDB<IMovieList>('movie/top_rated'),
  ]);

  return { latest, upcoming, trending, topRated };
};

export const getLatestMovies = () => handleRequestTMDB<IMovieList>('movie/now_playing');
export const getUpcomingMovies = () => handleRequestTMDB<IMovieList>('movie/upcoming');
export const getTrendingMovies = () => handleRequestTMDB<IMovieList>('trending/movie/day');
export const getTopRatedMovies = () => handleRequestTMDB<IMovieList>('movie/top_rated');
