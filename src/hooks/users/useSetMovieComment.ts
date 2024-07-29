import { useAppSelector } from "hooks/useAppSelector";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateMovieComment } from "services/user";
import { addToast } from "store/toast";
import { ERRORS } from "utils/error";
import useUsersMutation from "./useUsersMutation";

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
