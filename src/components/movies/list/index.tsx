import { UL } from './styled';
import useHoverItem from '../hooks/useHoverItem';
import MovieListItem from '../list-item';
import { IMovieListProps } from '../types';

const MovieList = ({
  data,
  listSize,
}: IMovieListProps) => {
  const { hoveredIndex, handleHoverChange } = useHoverItem();
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
