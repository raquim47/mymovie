import { useState } from 'react';
import { IMovie } from 'services/movies/types';
import { updateMovieRating } from 'services/user';
import useRequireLogin from './useRequireLogin';
import useUsersMutation from './useUsersMutation';

const useSetMovieRating = (movieId: number) => {
  const { user, requireLogin } = useRequireLogin();
  const { mutate, isPending } = useUsersMutation(updateMovieRating);
  // user에서 찾는 대신 movie에서 찾기
  const rating = (user?.ratedMovies && user.ratedMovies[movieId]?.rating) || 0;
  const [key, setKey] = useState(0);

  const handleChange = (newRating: number, movie: IMovie) => {
    setKey((prev) => prev + 1);
    if (!requireLogin()) return;

    mutate({ rating: newRating, movie, isCancel: rating === newRating });
  };

  return { rating, handleChange, key, isPending };
};

export default useSetMovieRating;
