import { deleteField, doc, writeBatch } from 'firebase/firestore';
import { useState } from 'react';
import { db, getCurrentUser } from 'utils/firebase';
import { IMovieSummary } from 'hooks/movies/types';
import useRequireLogin from './useRequireLogin';
import useUsersMutation from './useUsersMutation';

const updateMovieRating = async ({
  rating,
  movie,
  isCancel = false,
}: {
  rating: number;
  movie: IMovieSummary;
  isCancel?: boolean;
}) => {
  const { userRef, userId, userData } = await getCurrentUser();
  const reviewsRef = doc(db, 'reviews', String(movie.id));

  const batch = writeBatch(db);
  const userRatingData = isCancel
    ? { [`reviewList.${movie.id}`]: deleteField() }
    : {
        [`reviewList.${movie.id}`]: {
          ...movie,
          rating,
          timestamp: Date.now(),
        },
      };

  const reviewsData = isCancel
    ? { [userId]: deleteField() }
    : {
        [userId]: { ...userData, rating, timestamp: Date.now() },
      };

  batch.update(userRef, userRatingData);
  batch.set(reviewsRef, reviewsData, { merge: true });
  await batch.commit();
};

const useSetMovieRating = (movieId: number) => {
  const { user, requireLogin } = useRequireLogin();
  const { mutate, isPending } = useUsersMutation(updateMovieRating, movieId);

  const rating = (user?.reviewList && user.reviewList[movieId]?.rating) || 0;
  const [key, setKey] = useState(0);

  const handleChange = (newRating: number, movie: IMovieSummary) => {
    setKey((prev) => prev + 1);
    if (!requireLogin()) return;

    mutate({ rating: newRating, movie, isCancel: rating === newRating });
  };

  return { rating, handleChange, key, isPending };
};

export default useSetMovieRating;
