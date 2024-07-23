import { useAppSelector } from 'hooks/useAppSelector';
import { useSetMovieRating } from 'hooks/user';
import ReactStars from 'react-stars';
import { IMovie } from 'services/movies/types';
import { RATING_MESSAGE } from './rating-message';

const RatingAction = ({ movie }: { movie: IMovie }) => {
  const user = useAppSelector((state) => state.user.userData);
  const { mutate, isLoading } = useSetMovieRating();
  const prevRating = (user?.ratedMovies && user.ratedMovies[movie.id]?.rating) || 0;
  const handleRatingChange = (newRating: number) => {
    const isCancel = prevRating === newRating;
    mutate({ rating: newRating, movie, isCancel });
  };
  return (
    <li>
      <button disabled={isLoading}>
        <ReactStars
          count={5}
          color1="#E6E6E6"
          color2="#FFCC33"
          half
          size={28}
          edit={true}
          value={prevRating}
          onChange={handleRatingChange}
        />
      </button>
      <span>{RATING_MESSAGE[prevRating]}</span>
    </li>
  );
};

export default RatingAction;
