import { useQuery } from '@tanstack/react-query';
import { getMovieDetail } from 'services/movies';

export const useGetMovieDetail = (id: number) => {
  return useQuery({
    queryKey: ['movies', 'movieDetail', id],
    queryFn: () => getMovieDetail(id),
  });
};
