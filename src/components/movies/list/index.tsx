import { UL } from './styled';
import MovieListItem from '../list-item';
import { IMovieListProps } from '../types';
import { useState } from 'react';

const MovieList = ({
  data,
  listSize,
}: IMovieListProps) => {
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const handleHoverChange = (index: number = -1) => {
    setHoveredIndex(index);
  };
  
  return (
    <UL listSize={listSize}>
      {data.map((movie, index) => (
        <MovieListItem
          key={movie.id}
          movieData={movie}
          index={index}
          listSize={listSize}
          hoveredIndex={hoveredIndex}
          onHoverChange={handleHoverChange}
          listType={'title'}
          displayMode="landscape"
          keyword={'title'}
        />
      ))}
    </UL>
  );
};

export default MovieList;
