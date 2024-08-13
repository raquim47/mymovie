import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import * as S from './styles';
import { useMutation } from '@tanstack/react-query';
import { updateMovieComment } from 'services/movies/comment';

const CommentAction = ({
  comment,
  movieId,
  openCommentForm,
}: {
  comment: string;
  movieId: number;
  openCommentForm: () => void;
}) => {
  const {} = useMutation({
    mutationFn: () => updateMovieComment({ comment: '', movieId }),
  });
  if (comment)
    return (
      <S.MyComment>
        <h5>{comment}</h5>
        <S.ButtonsBlock>
          <button onClick={openCommentForm} disabled={false}>
            수정
          </button>
          <button onClick={() => null} disabled={false}>
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
      <span>코멘트 남기기</span>
    </li>
  );
};
export default CommentAction;
