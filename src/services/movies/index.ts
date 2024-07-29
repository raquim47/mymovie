import { IMovie, IMovieList, IReviews } from './types';
import { TMDB_CONFIG } from 'config';
import { doc, getDoc } from 'firebase/firestore';
import { db } from 'services/firebase';
import { handleAsyncError } from 'utils/error';

const fetchApi = async <T>(path: string): Promise<T> => {
  try {
    const querySeparator = path.includes('?') ? '&' : '?';
    const url = `${TMDB_CONFIG.basePath}/${path}${querySeparator}${TMDB_CONFIG.tailPath}`;
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

export const getMoviesLatest = () => fetchApi<IMovieList>('movie/now_playing');

export const getMoviesUpcoming = () => fetchApi<IMovieList>('movie/upcoming');

export const getMoviesTrending = () => fetchApi<IMovieList>('trending/movie/day');

export const getMoviesTopRated = () => fetchApi<IMovieList>('movie/top_rated');

export const getMovieDetail = (id: number) =>
  handleAsyncError(async () => {
    if (!id) throw new Error('No movie ID provided.');

    const movie = await fetchApi<IMovie>(`movie/${id}`);
    const reviewsRef = doc(db, 'reviews', String(id));
    const reviewsDoc = await getDoc(reviewsRef);
    const reviewsData = reviewsDoc.exists() ? (reviewsDoc.data() as IReviews) : undefined;
    return { ...movie, reviews: reviewsData };
  });

export const getSearchedMovies = (keyword: string, page: number) =>
  fetchApi<IMovieList>(`search/movie?query=${encodeURIComponent(keyword)}&page=${page}`);
