import { deleteField, doc, writeBatch } from 'firebase/firestore';
import { db } from 'services/firebase';
import { IMovieSummary } from 'services/movies/types';
import { handleRequest } from 'utils/request-handler';
import { getCurrentUser } from '../users/user';

export const updateMovieRating = async ({
  rating,
  movie,
  isCancel = false,
}: {
  rating: number;
  movie: IMovieSummary;
  isCancel?: boolean;
}) =>
  handleRequest(async () => {
    const { userRef, userId } = await getCurrentUser();
    const reviewsRef = doc(db, 'reviews', String(movie.id));
    const batch = writeBatch(db);

    const userRatingData = isCancel
      ? { [`reviewed.${movie.id}`]: deleteField() }
      : {
          [`reviewed.${movie.id}`]: {
            ...movie,
            rating,
            comment: '',
            timestamp: Date.now(),
          },
        };

    const reviewsData = isCancel
      ? { [userId]: deleteField() }
      : {
          [userId]: { rating, timestamp: Date.now() },
        };

    batch.update(userRef, userRatingData);
    batch.set(reviewsRef, reviewsData, { merge: true });
    await batch.commit();
  });
