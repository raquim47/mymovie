import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IMovie } from '../../services/api';
import { makeImagePath } from '../../utils/utils';
import Detail from '../Detail';

interface IGenres {
  [key: string]: string;
}

const genres: IGenres = {
  28: '액션',
  12: '모험',
  16: '애니메이션',
  35: '코미디',
  80: '범죄',
  99: '다큐',
  18: '드라마',
  10751: '가족',
  14: '판타지',
  36: '역사',
  27: '공포',
  10402: '음악',
  9648: '미스터리',
  10749: '로맨스',
  878: 'SF',
  10770: 'TV',
  53: '스릴러',
  10752: '전쟁',
  37: '서부',
};

const Wrapper = styled(motion.div)<{ display: string }>`
  position: relative;
  padding-bottom: ${(props) =>
    props.display === 'landscape' ? '50%' : '150%'};
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  
  &:last-of-type {
    transform-origin: center right;
  }
  &:first-of-type {
    transform-origin: center left;
  }

  img {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ListInfo = styled(motion.div)`
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.4);
  opacity: 0;
  color: ${(props) => props.theme.white.white};

  h4 {
    font-size: 1.2vw;
    font-weight: 500;
    margin-bottom: 0.4vw;
  }
  small {
    font-size: 0.7vw;
    font-weight: 400;
  }
  article {
    display: flex;
    gap: 5px;
    span {
      margin-top: 0.2vw;
      font-size: 0.7vw;
    }
  }
`;

const InitialDetailBox = styled(motion.div)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const infoVariants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 0.1,
      delay: 0.3,
    },
  },
};

const WrapperVariants = {
  initial: {
    scale: 1,
  },
  hovered: {
    scale: 1.2,
    transition: {
      type: 'tween',
      duration: 0.1,
      delay: 0.33,
    },
  },
  pushed: ({
    xDirection,
    hoveredIndex,
    rowSize,
  }: {
    [key: string]: number;
  }) => ({
    x: `${
      xDirection *
      (hoveredIndex === 0 || hoveredIndex === rowSize - 1 ? 20 : 10)
    }%`,
    transition: {
      type: 'tween',
      duration: 0.1,
      delay: 0.3,
    },
  }),
};

interface IListItem {
  movieData: IMovie;
  listType: string;
  index: number;
  hoveredIndex: number;
  onHoverChange: (index: number) => void;
  rowSize?: number;
  displayMode: 'portrait' | 'landscape';
  keyword?:string;
}

const ListItem = React.memo((props: IListItem) => {
  const {
    movieData,
    listType,
    index,
    hoveredIndex,
    onHoverChange,
    rowSize,
    displayMode,
    keyword
  } = props;

  const navigate = useNavigate();

  const onBoxClicked = () => {
    if (keyword) {
      console.log('hi');
      navigate(`${listType}/${movieData.id}?keyword=${keyword}`);
    } else {
      navigate(`${listType}/${movieData.id}`);
    }
  };

  const xDirection = hoveredIndex !== -1 ? (hoveredIndex < index ? 1 : -1) : 0;
  const isPushed = hoveredIndex !== -1 && hoveredIndex !== index;
  const isHovered = hoveredIndex === index;
  const detailMatch = useMatch(`/:page/${listType}/${movieData.id}`);
  const displayImg =
    displayMode === 'landscape'
      ? movieData.backdrop_path
      : movieData.poster_path;
  return (
    <>
      <Wrapper
        variants={WrapperVariants}
        initial="initial"
        animate={isHovered ? 'hovered' : isPushed ? 'pushed' : 'initial'}
        onClick={onBoxClicked}
        onHoverStart={() => onHoverChange(index)}
        onHoverEnd={() => onHoverChange(-1)}
        custom={{ xDirection, hoveredIndex, rowSize }}
        display={displayMode}
      >
        <img
          src={
            displayImg
              ? makeImagePath(displayImg, 'w500')
              : require('../../assets/no-image-icon-6.png')
          }
        />
        <ListInfo variants={infoVariants} whileHover="hover">
          <h4>{movieData.title}</h4>
          <small>평점 : {movieData.vote_average?.toFixed(1)}</small>
          <article>
            {movieData.genre_ids?.map((id) => (
              <span key={id}>{genres[String(id)]}</span>
            ))}
          </article>
        </ListInfo>
        <InitialDetailBox layoutId={listType + movieData.id} />
      </Wrapper>

      <AnimatePresence>
        {detailMatch ? <Detail movieId={movieData.id} keyword={keyword}/> : null}
      </AnimatePresence>
    </>
  );
});

export default ListItem;