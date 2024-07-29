import { doc, getDoc, writeBatch } from 'firebase/firestore';
import { useAppSelector } from 'store';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { db, getCurrentUser } from 'utils/firebase';
import { addToast } from 'store/toast';
import { ERRORS } from 'utils/error';
import useUsersMutation from './useUsersMutation';

export const updateMovieComment = async ({
  comment,
  movieId,
}: {
  comment: string;
  movieId: number;
}) => {
  const { userRef, userId, userData } = await getCurrentUser();
  const reviewsRef = doc(db, 'reviews', String(movieId));
  const reviewsDoc = await getDoc(reviewsRef);
  const existingReview = reviewsDoc.data()?.[userId];

  if (!reviewsDoc.exists() || !reviewsDoc.data()?.[userId]) {
    throw new Error(ERRORS.NOT_FOUND_REVIEWS);
  }

  const batch = writeBatch(db);
  const userCommentData = {
    [`reviewList.${movieId}.comment`]: comment,
    [`reviewList.${movieId}.timestamp`]: Date.now(),
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
};

const useSetMovieComment = (movieId: number) => {
  const dispatch = useDispatch();
  const { mutate, isPending } = useUsersMutation(updateMovieComment, movieId);
  const user = useAppSelector((state) => state.user.userData);
  const rating = (user?.reviewList && user.reviewList[movieId]?.rating) || 0;

  const [onCommentForm, setOnCommentForm] = useState(false);
  const offComment = () => setOnCommentForm(false);
  const onComment = () => {
    if (!rating) return dispatch(addToast(ERRORS.REQUIRED_RATING));

    setOnCommentForm(true);
  };

  const submitComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const comment = formData.get('comment') as string | undefined;

    if (!comment || comment.length > 80) {
      dispatch(addToast(ERRORS.INVALID_INPUT));
      return;
    }

    mutate({ comment, movieId }, { onSuccess: offComment });
  };

  return { onCommentForm, onComment, offComment, submitComment, isPending };
};

export default useSetMovieComment;
