import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartFill } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { IMovieSummary } from 'services/movies/types';
import { useMutation } from '@tanstack/react-query';
import { invalidateUserMe } from 'utils/invalidate';
import { updateWatchList } from 'services/movies/watchlist';

const WatchListAction = ({ movie }: { movie: IMovieSummary }) => {
  const { mutate, isPending } = useMutation({
    mutationFn: updateWatchList,
    onSuccess: invalidateUserMe,
  });

  return (
    <li>
      <button
        onClick={() => mutate(movie)}
        className={movie.isWatchList ? 'heart' : ''}
        disabled={isPending}
      >
        <FontAwesomeIcon icon={movie.isWatchList ? faHeartFill : faHeart} />
      </button>
      <h4>찜하기</h4>
    </li>
  );
};

export default WatchListAction;
