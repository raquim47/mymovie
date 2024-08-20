import { handleRequestTMDB } from 'utils/request-handler';
import { getMovieReviews } from './reviews';
import { IMovie } from './types';

export const fetchMovieDetail = async (movieId: number) => {
  const movie = await handleRequestTMDB<IMovie>(`movie/${movieId}`);
  movie.reviews = await getMovieReviews(movieId);
  return movie;
};
