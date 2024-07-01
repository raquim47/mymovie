import { genres, getMovieImagePath } from '../../utils/utils';
import { memo } from 'react';
import { hoverItemMotion } from './variants';
import { IMovieItem } from './types';
import { Bg, Info, InitialDetailBox, LI } from './styles';
import useHoverItem from './hooks/useHoverItem';

const MovieItem = memo((props: IMovieItem) => {
  const {
    movieData,
    index,
    hoveredIndex,
    onHoverChange,
    rowSize,
    displayMode,
  } = props;
  
  const { getHoverStyles } = useHoverItem();
  const { isHovered, isPushed, xMove } = getHoverStyles(
    index,
    rowSize,
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
      display={displayMode}
    >
      <Bg src={getMovieImagePath(movieData, 'backdrop', 'w500')} />
      <Info>
        <h4>{movieData.title}</h4>
        <small>평점 : {movieData.vote_average?.toFixed(1)}</small>
        <article>
          {movieData.genre_ids?.slice(0, 3).map((id) => (
            <span key={id}>{genres[String(id)]}</span>
          ))}
        </article>
      </Info>
    </LI>
  );
});

export default MovieItem;

{
  /* <AnimatePresence>
  <InitialDetailBox layoutId={listType + movieData.id} />
</AnimatePresence>; */
}
