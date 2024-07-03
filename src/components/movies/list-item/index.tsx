import { memo } from 'react';
import { hoverItemMotion } from './variants';
import { Bg, Info, LI } from './styled';
import { GENRES } from './constants';
import { getHoverStyles } from './utils';
import { IMovieListItemProps } from 'components/movies/types';
import { getMovieImagePath } from '../utils';

const MovieListItem = memo((props: IMovieListItemProps) => {
  const {
    movieData,
    index,
    hoveredIndex,
    onHoverChange,
    listSize,
    displayMode,
  } = props;

  const { isHovered, isPushed, xMove } = getHoverStyles(
    index,
    listSize,
    hoveredIndex
  );

  return (
    <LI
      variants={hoverItemMotion}
      initial="initial"
      animate={isHovered ? 'hovered' : isPushed ? 'pushed' : 'initial'}
      onHoverStart={() => onHoverChange(index)}
      onHoverEnd={() => onHoverChange(-1)}
      custom={{ xMove }}
    >
      <Bg
        src={getMovieImagePath(movieData, 'backdrop', 'w500')}
        alt={movieData.title}
      />
      <Info>
        <h4>{movieData.title}</h4>
        <small>평점 : {movieData.vote_average?.toFixed(1)}</small>
        <article>
          {movieData.genre_ids?.slice(0, 3).map((id) => (
            <span key={id}>{GENRES[String(id)]}</span>
          ))}
        </article>
      </Info>
    </LI>
  );
});

export default MovieListItem;

{
  /* <AnimatePresence>
  <InitialDetailBox layoutId={listType + movieData.id} />
</AnimatePresence>; */
}
