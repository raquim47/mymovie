import useHoverItem from './hooks/useHoverItem';
import MovieItem from './MovieItem';
import { UL } from './styles';
import { IMovieListProps } from './types';

const MovieList = ({ data, rowSize, title }: IMovieListProps) => {
  const { hoveredIndex, handleHoverChange } = useHoverItem();
  return (
    <UL rowSize={rowSize}>
      {data.map((movie, index) => (
        <MovieItem
          key={movie.id}
          movieData={movie}
          index={index}
          rowSize={rowSize}
          hoveredIndex={hoveredIndex}
          onHoverChange={handleHoverChange}
          listType={title}
          displayMode="landscape"
          keyword={title}
        />
      ))}
    </UL>
  );
};

export default MovieList;
