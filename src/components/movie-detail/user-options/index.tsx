import ReactStars from 'react-stars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import ST from './styles';

const UserOptions = () => {
  return (
    <ST.Options>
      <h3 className="sr-only">사용자 옵션</h3>
      <ul>
        <li>
          <button className="option-btn">
            <ReactStars
              count={5}
              color1="#E6E6E6"
              color2="#FFCC33"
              half
              size={28}
              edit={true}
            />
          </button>
          평가하기
        </li>
        <li>
          <button className="option-btn">
            <FontAwesomeIcon icon={faHeart} />
          </button>
          찜하기
        </li>
        <li>
          <button className="option-btn">
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
          코멘트 남기기
        </li>
      </ul>
    </ST.Options>
  );
};

export default UserOptions;
