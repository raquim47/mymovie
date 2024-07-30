import { doc, getDoc, writeBatch } from 'firebase/firestore';
import { useState } from 'react';
import { db, getCurrentUser } from 'utils/firebase';
import { ERRORS } from 'utils/error';
import useUsersMutation from './useUsersMutation';
import useToast from 'hooks/ui/useToast';
import useGetMyMovieReview from './useGetMyMovieReview';

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
  const toast = useToast();
  const { mutate, isPending } = useUsersMutation(updateMovieComment, movieId);
  const { rating } = useGetMyMovieReview();
  const [onCommentForm, setOnCommentForm] = useState(false);

  const onComment = () => {
    if (!rating) return toast(ERRORS.REQUIRED_RATING);
    setOnCommentForm(true);
  };
  const offComment = () => setOnCommentForm(false);
  const submitComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const comment = formData.get('comment') as string | undefined;

    if (!comment || comment.length > 80) return toast(ERRORS.INVALID_INPUT);

    mutate({ comment, movieId }, { onSuccess: offComment });
  };
  const removeComment = () => mutate({ comment: '', movieId });
  return {
    onCommentForm,
    onComment,
    offComment,
    submitComment,
    removeComment,
    isPending,
  };
};

export default useSetMovieComment;
