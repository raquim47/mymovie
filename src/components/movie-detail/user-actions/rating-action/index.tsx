import { useAppSelector } from 'hooks/useAppSelector';
import { useSetMovieRating } from 'hooks/user';
import ReactStars from 'react-stars';
import { IMovie } from 'services/movies/types';

const RatingAction = ({ movie }: { movie: IMovie }) => {
  const user = useAppSelector((state) => state.user.userData);
  const { mutate } = useSetMovieRating();
  const prevRating =
    (user?.ratedMovies && user.ratedMovies[movie.id].rating) || undefined;
  return (
    <>
      <button>
        <ReactStars
          count={5}
          color1="#E6E6E6"
          color2="#FFCC33"
          half
          size={28}
          edit={true}
          value={prevRating}
          onChange={(rating) => mutate({ rating, movie })}
        />
      </button>
      <span>평가하기</span>
    </>
  );
};

export default RatingAction;
