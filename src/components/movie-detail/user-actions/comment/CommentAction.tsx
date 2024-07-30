import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import ST from './styles';
import useGetMyMovieReview from 'hooks/users/useGetMyMovieReview';

const CommentAction = ({
  onComment,
  removeComment,
  isPending,
}: {
  onComment: () => void;
  removeComment: () => void;
  isPending: boolean;
}) => {
  const { comment } = useGetMyMovieReview();
  if (comment)
    return (
      <ST.MyComment>
        <p>{comment}</p>
        <div className="buttons">
          <span>나의 코멘트</span>
          <button onClick={onComment} disabled={isPending}>
            수정
          </button>
          <button onClick={removeComment} disabled={isPending}>
            삭제
          </button>
        </div>
      </ST.MyComment>
    );

  return (
    <li>
      <button onClick={onComment}>
        <FontAwesomeIcon icon={faPenToSquare} />
      </button>
      <span>코멘트 남기기</span>
    </li>
  );
};
export default CommentAction;
