import { doc, getDoc, writeBatch } from 'firebase/firestore';
import { db } from 'services/firebase';
import { getCurrentUser } from 'services/users/user';
import { ERRORS } from 'utils/errors';
import { handleRequest } from 'utils/request-handler';

export const updateMovieComment = async ({
  comment,
  movieId,
}: {
  comment: string;
  movieId: number;
}) =>
  handleRequest(async () => {
    const { userRef, userId, userData } = await getCurrentUser();
    const reviewsRef = doc(db, 'reviews', String(movieId));
    const reviewsDoc = await getDoc(reviewsRef);
    const existingReview = reviewsDoc.data()?.[userId];

    if (!reviewsDoc.exists() || !reviewsDoc.data()?.[userId]) {
      throw new Error(ERRORS.NOT_FOUND_REVIEWS);
    }

    const batch = writeBatch(db);
    const userCommentData = {
      [`reviewed.${movieId}.comment`]: comment,
      [`reviewed.${movieId}.timestamp`]: Date.now(),
    };

    const reviewsData = {
      [userId]: {
        ...existingReview,
        ...userData,

        comment,
        timestamp: Date.now(),
      },
    };

    batch.update(userRef, userCommentData);
    batch.set(reviewsRef, reviewsData, { merge: true });
    await batch.commit();
  });

export const fetchUserReviewedMovies = async (page: number, size: number = 20) =>
  handleRequest(async () => {
    const { userData } = await getCurrentUser();
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
