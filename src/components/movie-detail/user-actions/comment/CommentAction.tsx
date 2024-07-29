import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

const CommentAction = ({ onComment }: { onComment: () => void }) => {
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
