import { updateDoc } from 'firebase/firestore';
import { IMovieSummary } from 'services/movies/types';
import { handleRequest } from 'utils/request-handler';
import { getCurrentUser } from './user';

export const updateWatchList = (movie: IMovieSummary) =>
  handleRequest(async () => {
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
  });
