import ErrorMessage from 'components/form/error-message';
import useForm from 'hooks/useForm';
import { updateUserReview } from 'services/movies/reviews';
import { IMovieSummary } from 'services/movies/types';
import { validateComment } from 'utils/form-validation';
import { invalidateMovieDetail, invalidateUserMe } from 'utils/invalidate';
import * as S from './styles';

const CommentForm = ({
  movie,
  closeCommentForm,
}: {
  movie: IMovieSummary;
  closeCommentForm: () => void;
}) => {
  const { register, isLoading, handleSubmit, errors } = useForm(['comment'], {
    comment: movie.comment,
  });

  const onSubmit = handleSubmit(
    (values) => updateUserReview({ ...movie, ...values }),
    async () => {
      await invalidateUserMe();
      await invalidateMovieDetail(movie.id);
      closeCommentForm();
    }
  );
  const error = errors.comment || errors.common;

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
      {error && <ErrorMessage message={error} />}
    </S.CommentForm>
  );
};

export default CommentForm;
