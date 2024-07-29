import { IMovieSummary } from 'services/movies/types';
import { updateWatchList } from 'services/user';
import useRequireLogin from './useRequireLogin';
import useUsersMutation from './useUsersMutation';

const useSetWatchList = (movieId: number) => {
  const { user, requireLogin } = useRequireLogin();
  const { mutate, isPending } = useUsersMutation(updateWatchList);

  const isOnWatchList = user?.watchList && user?.watchList[movieId];

  const handleClick = (movie: IMovieSummary) => {
    if (!requireLogin()) return;

    mutate(movie);
  };
  return { handleClick, isPending, isOnWatchList };
};

export default useSetWatchList;
