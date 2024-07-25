import { useAppSelector } from 'hooks/useAppSelector';
import { IMovie } from 'services/movies/types';
import { updateMovieRating } from 'services/user';
import useUsersMutation from './useUsersMutation';

const useSetMovieRating = (movieId: number) => {
  const { mutate, isPending } = useUsersMutation(updateMovieRating);
  const user = useAppSelector((state) => state.user.userData);
  const prevRating = (user?.ratedMovies && user.ratedMovies[movieId]?.rating) || 0;

  const handleChange = (newRating: number, movie: IMovie) => {
    const isCancel = prevRating === newRating;
    mutate({ rating: newRating, movie, isCancel });
  };

  return { prevRating, handleChange, isPending };
};

export default useSetMovieRating;
