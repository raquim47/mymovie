import * as S from './styles';
import { getMovieImagePath } from 'utils/image-path';
import { GENRES, getClasses } from './utils';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { IMovieSummary } from 'services/movies/types';
import ReactStars from 'react-stars';

const MovieList = ({
  data,
  listSize,
  imageType = 'backdrop',
}: {
  data: IMovieSummary[];
  listSize: number;
  imageType?: 'poster' | 'backdrop';
}) => {
  const location = useLocation();
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const handleHoverChange = (index: number) => {
    setHoveredIndex(index);
  };
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get('keyword');
  return (
    <S.List listSize={listSize}>
      {data.map((movie, index) => (
        <S.ListItem
          className={getClasses(hoveredIndex, index, Math.min(listSize, data.length))}
          key={index}
          onMouseEnter={() => handleHoverChange(index)}
          onMouseLeave={() => handleHoverChange(-1)}
        >
          {/* <S.Link to={`movies/${movie.id}${search || ''}`} starMode={!!movie.rating}> */}
          <S.Link
            to={`/movies/${movie.id}`}
            state={{ path: location.pathname, keyword }}
            $starMode={!!movie.rating}
          >
            <img src={getMovieImagePath(movie, imageType, 'w500')} alt="" />
            <S.ItemInfo>
              <h4>{movie.title}</h4>
              <ul className="genres">
                {movie.genre_ids?.slice(0, 3).map((id) => (
                  <li key={id}>{GENRES[id]}</li>
                ))}
                {!movie.genre_ids &&
                  movie.genres
                    ?.slice(0, 3)
                    .map(({ id, name }) => <li key={id}>{name}</li>)}
              </ul>
            </S.ItemInfo>
          </S.Link>
          {movie.rating && (
            <S.StarsBlock>
              <ReactStars className="stars" value={movie.rating} edit={false} />
            </S.StarsBlock>
          )}
        </S.ListItem>
      ))}
    </S.List>
  );
};

export default MovieList;
