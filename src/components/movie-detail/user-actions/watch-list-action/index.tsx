import { useAppSelector } from 'hooks/useAppSelector';
import { useSetWatchList } from 'hooks/user';
import { IMovie } from 'services/movies/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartFill } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

const WatchListAction = ({ movie }: { movie: IMovie }) => {
  const { mutate: setWatchList } = useSetWatchList();
  const user = useAppSelector((state) => state.user.userData);
  const isOnWatchList = user?.watchList && user?.watchList[movie.id];
  return (
    <li>
      <button onClick={() => setWatchList(movie)} className={isOnWatchList ? 'heart' : ''}>
        <FontAwesomeIcon icon={isOnWatchList ? faHeartFill : faHeart} />
      </button>
      <span>찜하기</span>
    </li>
  );
};

export default WatchListAction;
