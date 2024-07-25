import useSetMovieRating from 'hooks/users/useSetMovieRating';
import ReactStars from 'react-stars';
import { IMovie } from 'services/movies/types';
import { RATING_MESSAGE } from './rating-message';

const RatingAction = ({ movie }: { movie: IMovie }) => {
  const { prevRating, handleChange, isPending } = useSetMovieRating(movie.id);

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
          value={prevRating}
          onChange={(rating) => handleChange(rating, movie)}
        />
      </button>
      <span>{RATING_MESSAGE[prevRating]}</span>
    </li>
  );
};

export default RatingAction;
