import useForm from 'hooks/useForm';
import useToast from 'hooks/useToast';
import { useEffect } from 'react';
import { updateMovieComment } from 'services/movies/comment';
import { validateComment } from 'utils/form-validation';
import { invalidateMovieDetail, invalidateUserMe } from 'utils/invalidate';
import * as S from './styles';

const CommentForm = ({
  comment,
  movieId,
  closeCommentForm,
}: {
  comment: string;
  movieId: number;
  closeCommentForm: () => void;
}) => {
  const { addToast } = useToast();
  const { register, isLoading, handleSubmit, errors } = useForm(['comment'], {
    comment,
  });

  const onSubmit = handleSubmit(
    (values) => updateMovieComment({ ...values, movieId }),
    async () => {
      await invalidateUserMe();
      await invalidateMovieDetail(movieId);
      closeCommentForm();
    }
  );

  useEffect(() => {
    if (errors.comment) addToast(errors.comment);
  }, [errors, addToast]);

  return (
    <S.CommentForm onSubmit={onSubmit}>
      <textarea
        placeholder="작품에 대한 코멘트를 남겨주세요"
        required
        maxLength={80}
        minLength={2}
        {...register('comment', validateComment)}
      />
      <S.Buttons>
        <button type="submit" disabled={isLoading}>
          저장
        </button>
        <button type="button" onClick={closeCommentForm} disabled={isLoading}>
          취소
        </button>
      </S.Buttons>
    </S.CommentForm>
  );
};

export default CommentForm;
