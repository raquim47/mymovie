import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import * as S from './styles';
import { useMutation } from '@tanstack/react-query';
import { IMovieSummary } from 'services/movies/types';
import { updateUserReview } from 'services/movies/reviews';
import { invalidateMovieDetail, invalidateUserMe } from 'utils/invalidate';

const CommentAction = ({
  movie,
  openCommentForm,
}: {
  movie: IMovieSummary;
  openCommentForm: () => void;
}) => {
  const { isPending, mutate } = useMutation({
    mutationFn: updateUserReview,
    onSuccess: async () => {
      await invalidateUserMe();
      await invalidateMovieDetail(movie.id);
    },
  });
  if (movie.comment)
    return (
      <S.MyComment>
        <h5>{movie.comment}</h5>
        <S.ButtonsBlock>
          <button onClick={openCommentForm} disabled={isPending}>
            수정
          </button>
          <button onClick={() => mutate({ ...movie, comment: '' })} disabled={isPending}>
            삭제
          </button>
        </S.ButtonsBlock>
      </S.MyComment>
    );

  return (
    <li>
      <button onClick={openCommentForm}>
        <FontAwesomeIcon icon={faPenToSquare} />
      </button>
      <h4>코멘트 남기기</h4>
    </li>
  );
};
export default CommentAction;
