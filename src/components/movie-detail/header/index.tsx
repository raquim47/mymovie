import { IMovie } from 'services/movies/types';
import { getMovieImagePath } from 'utils/image-path';
import * as S from './styles';

const MDHeader = ({ movie }: { movie: IMovie }) => {
  return (
    <S.Header>
      <img className="backdrop" src={getMovieImagePath(movie, 'backdrop', 'w1280')} />
      <S.Inner>
        <S.Info>
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
        </S.Info>
        <S.Poster src={getMovieImagePath(movie, 'poster', 'w500')} />
      </S.Inner>
    </S.Header>
  );
};

export default MDHeader;
