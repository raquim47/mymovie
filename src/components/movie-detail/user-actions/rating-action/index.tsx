import useSetMovieRating from 'hooks/users/useSetMovieRating';
import ReactStars from 'react-stars';
import { IMovie } from 'hooks/movies/types';
import { RATING_MESSAGE } from './rating-message';

const RatingAction = ({ movie }: { movie: IMovie }) => {
  const { rating, handleChange, isPending, key } = useSetMovieRating(movie.id);
  return (
    <li>
      <button disabled={isPending}>
        <ReactStars
          key={key}
          count={5}
          color1="#E6E6E6"
          color2="#FFCC33"
          half
          size={28}
          edit={true}
          value={rating}
          onChange={(newRating) => handleChange(newRating, movie)}
        />
      </button>
      <span>{RATING_MESSAGE[rating]}</span>
    </li>
  );
};

export default RatingAction;
