import { useQuery } from '@tanstack/react-query';
import { handleRequestTMDB } from 'utils/tmdb';
import { doc, getDoc } from 'firebase/firestore';
import { IMovie, IReviews } from 'hooks/movies/types';
import { db } from 'utils/firebase';

const getMovieReviews = async (movieId: number) => {
  const reviewsRef = doc(db, 'reviews', String(movieId));
  const reviewsDoc = await getDoc(reviewsRef);
  return reviewsDoc.exists() ? (reviewsDoc.data() as IReviews) : undefined;
};

export const getMovieDetail = async (movieId: number) => {
  const movie = await handleRequestTMDB<IMovie>(`movie/${movieId}`);
  const reviews = await getMovieReviews(movieId);

  return { ...movie, reviews };
};

export const useGetMovieDetail = (id: number) => {
  return useQuery({
    queryKey: ['movies', id],
    queryFn: () => getMovieDetail(id),
  });
};
