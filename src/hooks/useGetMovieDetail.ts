import { useQuery } from 'react-query';
import { getMovieDetail } from 'services/movies';

export const useGetMovieDetail = (id: number) => {
  return useQuery(['movies', 'movieDetail', id], () => getMovieDetail(id));
};
