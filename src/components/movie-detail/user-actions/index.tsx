import ReactStars from 'react-stars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import ST from './styles';
import { IMovie } from 'services/movies/types';
import WatchListAction from './watch-list-action';
import RatingAction from './rating-action';

const UserActions = ({ movie }: { movie: IMovie }) => {
  return (
    <ST.Actions>
      <h3 className="sr-only">사용자 액션</h3>
      <ul>
        <WatchListAction movie={movie} />
        <RatingAction movie={movie} />
        <li>
          <button className="option-btn">
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
          <span>코멘트 남기기</span>
        </li>
      </ul>
    </ST.Actions>
  );
};

export default UserActions;
