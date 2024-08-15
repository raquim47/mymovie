import { handleRequestTMDB } from "utils/request-handler";
import { IMovieList } from "./types";

export const fetchLatestMovies = () => handleRequestTMDB<IMovieList>('movie/now_playing');
export const fetchUpcomingMovies = () => handleRequestTMDB<IMovieList>('movie/upcoming');
export const fetchTrendingMovies = () => handleRequestTMDB<IMovieList>('trending/movie/day');
export const fetchTopRatedMovies = () => handleRequestTMDB<IMovieList>('movie/top_rated');
