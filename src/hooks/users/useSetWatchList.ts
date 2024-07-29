import { updateDoc } from 'firebase/firestore';
import { getCurrentUser } from 'utils/firebase';
import { IMovieSummary } from 'hooks/movies/types';
import useRequireLogin from './useRequireLogin';
import useUsersMutation from './useUsersMutation';

const updateWatchList = async (movie: IMovieSummary) => {
  const { userRef, userData } = await getCurrentUser();
  const watchList = userData.watchList || {};

  if (watchList[movie.id]) {
    delete watchList[movie.id];
  } else {
    watchList[movie.id] = {
      ...movie,
      timestamp: Date.now(),
    };
  }
  await updateDoc(userRef, { watchList });
};

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
