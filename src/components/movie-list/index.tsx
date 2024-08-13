import * as S from './styles';
import { IMovieListProps } from './types';
import { getMovieImagePath } from 'utils/image-path';
import { GENRES, getClasses } from './utils';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

const MovieList = ({ data, listSize, imageType = 'backdrop' }: IMovieListProps) => {
  const { search } = useLocation();
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const handleHoverChange = (index: number) => {
    setHoveredIndex(index);
  };
  return (
    <S.List listSize={listSize}>
      {data.map((movie, index) => (
        <S.ListItem
          className={getClasses(hoveredIndex, index, listSize)}
          key={index}
          onMouseEnter={() => handleHoverChange(index)}
          onMouseLeave={() => handleHoverChange(-1)}
        >
          <S.Link
            to={`movies/${movie.id}${search || ''}`}
          >
            <img src={getMovieImagePath(movie, imageType, 'w500')} alt="" loading="lazy"/>
            <S.ItemInfo>
              <h4>{movie.title}</h4>
              <ul className="genres">
                {movie.genre_ids?.slice(0, 3).map((id) => (
                  <li key={id}>{GENRES[id]}</li>
                ))}
              </ul>
            </S.ItemInfo>
          </S.Link>
        </S.ListItem>
      ))}
    </S.List>
  );
};

export default MovieList;
