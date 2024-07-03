import useHoverItem from './hooks/useHoverItem';
import MovieItem from './MovieItem';
import { UL } from './styled';
import { IMovieListProps } from './types';

const MovieList = ({ data, listSize, title }: IMovieListProps) => {
  const { hoveredIndex, handleHoverChange } = useHoverItem();
  return (
    <UL listSize={listSize}>
      {data.map((movie, index) => (
        <MovieItem
          key={movie.id}
          movieData={movie}
          index={index}
          listSize={listSize}
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
