import { useMutation } from '@tanstack/react-query';
import ReactStars from 'react-stars';
import { IMovieSummary } from 'services/movies/types';
import { invalidateMovieDetail, invalidateUserMe } from 'utils/invalidate';
import { RATING_MESSAGE } from './rating-message';
import { updateUserReview } from 'services/movies/reviews';

const RatingAction = ({ movie }: { movie: IMovieSummary }) => {
  const { mutate, isPending } = useMutation({
    mutationFn: updateUserReview,
    onSuccess: async () => {
      await invalidateUserMe();
      await invalidateMovieDetail(movie.id);
    },
  });
  const currentRating = movie.rating || 0;
  const handleChange = (rating: number) => {
    const newRating = rating !== currentRating ? rating : 0;
    mutate({ ...movie, rating: newRating });
  };
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
