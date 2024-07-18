import ST from './styles';
import { IMovieListProps } from './types';
import { getMovieImagePath } from 'utils/movie-image-path';
import { GENRES } from './genres-constant';
import useHoverListItem from 'hooks/ui/hover-list-item';
import { useLocation } from 'react-router-dom';

const MovieList = ({ data, listSize, imageType = 'backdrop' }: IMovieListProps) => {
  const { handleHoverChange, getClasses } = useHoverListItem();
  const { search } = useLocation();
  return (
    <ST.List listSize={listSize}>
      {data.map((movie, index) => (
        <ST.ListItem
          className={getClasses(index, listSize)}
          key={index}
          onMouseEnter={() => handleHoverChange(index)}
          onMouseLeave={() => handleHoverChange(-1)}
        >
          <ST.Link
            to={`movies/${movie.id}${search || ''}`}
            bg={getMovieImagePath(movie, imageType, 'w500')}
          >
            <ST.ItemInfo>
              <h4>{movie.title}</h4>
              <small>평점 : {movie.vote_average?.toFixed(1)}</small>
              <ul className="genres">
                {movie.genre_ids?.slice(0, 3).map((id) => (
                  <li key={id}>{GENRES[id]}</li>
                ))}
              </ul>
            </ST.ItemInfo>
          </ST.Link>
        </ST.ListItem>
      ))}
    </ST.List>
  );
};

export default MovieList;