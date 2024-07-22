import { IMovie } from 'services/movies/types';
import { getMovieImagePath } from 'utils/movie-image-path';
import ST from './styles';

const MDHeader = ({ movie }: { movie: IMovie }) => {
  return (
    <ST.Header>
      <img className="backdrop" src={getMovieImagePath(movie, 'backdrop', 'w1280')} />
      <ST.Inner>
        <ST.Info>
          <h2>{movie?.title}</h2>
          <h3>{movie?.original_title}</h3>
          <ul>
            <li>{movie?.release_date}</li>
            <li>{movie?.runtime} 분</li>
            <li className="genres">
              {movie?.genres?.map((genre) => (
                <span key={genre.id}>{genre.name}</span>
              ))}
            </li>
          </ul>
        </ST.Info>
        <ST.Poster src={getMovieImagePath(movie, 'poster', 'w500')} />
      </ST.Inner>
    </ST.Header>
  );
};

export default MDHeader;
