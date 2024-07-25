import { IMovie } from 'services/movies/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartFill } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import useSetWatchList from 'hooks/users/useSetWatchList';

const WatchListAction = ({ movie }: { movie: IMovie }) => {
  const { handleClick, isPending, isOnWatchList } = useSetWatchList(movie.id);
  return (
    <li>
      <button
        onClick={() => handleClick(movie)}
        className={isOnWatchList ? 'heart' : ''}
        disabled={isPending}
      >
        <FontAwesomeIcon icon={isOnWatchList ? faHeartFill : faHeart} />
      </button>
      <span>찜하기</span>
    </li>
  );
};

export default WatchListAction;
