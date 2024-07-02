import { IMovieDetails, IMovieList } from './types';
import { TMDB_CONFIG } from 'config';

const fetchApi = async <T>(path: string): Promise<T> => {
  try {
    const url = `${TMDB_CONFIG.basePath}/${path}?${TMDB_CONFIG.tailPath}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('서버에서 데이터를 받아오는데 실패했습니다.');
    }
    return await response.json();
  } catch (error) {
    console.error('API 호출 중 오류가 발생했습니다:', error);
    throw error;
  }
};

export const getMoviesLatest = (): Promise<IMovieList> =>
  fetchApi<IMovieList>('movie/now_playing');

export const getMoviesUpcoming = (): Promise<IMovieList> =>
  fetchApi<IMovieList>('movie/upcoming');

export const getMoviesTrending = (): Promise<IMovieList> =>
  fetchApi<IMovieList>('trending/movie/day');

export const getMoviesTopRated = (): Promise<IMovieList> =>
  fetchApi<IMovieList>('movie/top_rated');

export const getMovieDetail = (id: number): Promise<IMovieDetails> => {
  if (!id) {
    throw new Error('No movie ID provided.');
  }
  return fetchApi<IMovieDetails>(`movie/${id}`);
};

export const getSearchedMovies = (
  keyword: string,
  page: number
): Promise<IMovieList> =>
  fetchApi<IMovieList>(
    `search/movie?query=${encodeURIComponent(keyword)}&page=${page}`
  );
