import { useQuery } from '@tanstack/react-query';
import { getMovieDetail } from 'services/movies';

export const useGetMovieDetail = (id: number) => {
  return useQuery({
    queryKey: ['movies', id],
    queryFn: () => getMovieDetail(id),
  });
};
