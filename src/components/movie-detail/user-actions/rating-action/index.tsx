import { useMutation } from '@tanstack/react-query';
import useRequireLogin from 'hooks/useRequireLogin';
import ReactStars from 'react-stars';
import { IMovie } from 'services/movies/types';
import { updateMovieRating } from 'services/movies/rating';
import { invalidateMovieDetail, invalidateUserMe } from 'utils/invalidate';
import { RATING_MESSAGE } from './rating-message';

const RatingAction = ({ movie }: { movie: IMovie }) => {
  const { user, requireLogin } = useRequireLogin();
  const { mutate, isPending } = useMutation({
    mutationFn: updateMovieRating,
    onSuccess: async () => {
      await invalidateUserMe();
      await invalidateMovieDetail(movie.id)
    },
  });
  const currentRating = user?.reviewed[movie.id]?.rating || 0;
  const handleChange = (rating: number) =>
    requireLogin() && mutate({ rating, movie, isCancel: currentRating === rating });
  return (
    <li>
      <button disabled={isPending}>
        <ReactStars
          count={5}
          color1="#E6E6E6"
          color2="#FFCC33"
          half
          size={28}
          edit={true}
          value={currentRating}
          onChange={handleChange}
        />
      </button>
      <h4>{RATING_MESSAGE[currentRating]}</h4>
    </li>
  );
};

export default RatingAction;
