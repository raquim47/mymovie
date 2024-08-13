import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartFill } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { IMovieSummary } from 'services/movies/types';
import useRequireLogin from 'hooks/useRequireLogin';
import { useMutation } from '@tanstack/react-query';
import { invalidateUserMe } from 'utils/invalidate';
import { updateWatchList } from 'services/users/watchlist';

const WatchListAction = ({ movie }: { movie: IMovieSummary }) => {
  const { user, requireLogin } = useRequireLogin();
  const { mutate, isPending } = useMutation({
    mutationFn: updateWatchList,
    onSuccess: invalidateUserMe,
  });

  const isOnWatchList = user?.watchList && user?.watchList[movie.id];

  const handleClick = (movie: IMovieSummary) => requireLogin() && mutate(movie);
  
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
