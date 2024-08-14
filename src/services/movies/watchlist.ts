import { updateDoc } from 'firebase/firestore';
import { IMovieSummary } from 'services/movies/types';
import { handleRequest } from 'utils/request-handler';
import { getCurrentUser } from '../users/user';

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

export const fetchUserWatchList = async (page: number, size: number = 20) =>
  handleRequest(async () => {
    const { userData } = await getCurrentUser();
    const watchList = userData.watchList || {};

    const allMovies = Object.values(watchList) as IMovieSummary[];
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    const paginatedMovies = allMovies.slice(startIndex, endIndex);

    return {
      results: paginatedMovies,
      page,
      total_pages: Math.ceil(allMovies.length / size),
    };
  });
