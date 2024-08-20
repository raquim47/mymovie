import { deleteField, doc, getDoc, writeBatch } from 'firebase/firestore';
import { db } from 'services/firebase';
import { getLoggedInUser } from 'services/users/user';
import { handleRequest } from 'utils/request-handler';
import { IMovieSummary, IReviews } from './types';

export const getMovieReviews = async (movieId: number) =>
  handleRequest(async () => {
    const reviewsRef = doc(db, 'reviews', String(movieId));
    const reviewsDoc = await getDoc(reviewsRef);
    return reviewsDoc.exists() ? (reviewsDoc.data() as IReviews) : undefined;
  });

export const updateUserReview = async (movie: IMovieSummary) =>
  handleRequest(async () => {
    const { userId, userRef } = await getLoggedInUser();
    const reviewsRef = doc(db, 'reviews', String(movie.id));
    const reviewsDoc = await getDoc(reviewsRef);
    const existingReview = reviewsDoc.data()?.[userId];
    const batch = writeBatch(db);

    const newRating = movie.rating ?? existingReview?.rating;
    const newComment = movie.comment ?? existingReview?.comment;

    if (!newRating && !newComment) {
      batch.update(userRef, { [`reviewed.${movie.id}`]: deleteField() });
      batch.update(reviewsRef, { [userId]: deleteField() });
    } else {
      const updatedData = {
        ...existingReview,
        ...movie,
        timestamp: Date.now(),
      };

      const userRatingData = { [`reviewed.${movie.id}`]: updatedData };
      const reviewsData = { [userId]: updatedData };

      batch.update(userRef, userRatingData);
      batch.set(reviewsRef, reviewsData, { merge: true });
    }

    await batch.commit();
  });

export const fetchUserReviewedMovies = async (page: number, size: number = 20) =>
  handleRequest(async () => {
    const { userData } = await getLoggedInUser();
    const reviewedMovies = userData.reviewed || {};

    const allMovies = Object.values(reviewedMovies);
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    const paginatedMovies = allMovies.slice(startIndex, endIndex);

    return {
      results: paginatedMovies,
      page,
      total_pages: Math.ceil(allMovies.length / size),
    };
  });
