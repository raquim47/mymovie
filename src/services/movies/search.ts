import { handleRequestTMDB } from "utils/request-handler";
import { IMovieList } from "./types";

export const getSearchedMovies = (page: number, keyword: string) =>
  handleRequestTMDB<IMovieList>(
    `search/movie?query=${encodeURIComponent(keyword)}&page=${page}`
  );