import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import styled from 'styled-components';
import { IGetVideoResult } from '../api';
import { makeImagePath } from '../utils';
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

const Wrapper = styled.div`
  position: relative;
  padding-top: 20px;
  :hover {
    button {
      opacity: 1;
    }
  }
`;

const Content = styled.div`
  position: relative;
  padding-bottom: 9vw;
  overflow: hidden;
`;

const Title = styled.h3`
  font-size: 22px;
  font-weight: 600;
  color: ${(props) => props.theme.white.darker};
  margin-bottom: 20px;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  position: absolute;
  bottom: 1.5vw;
  width: 100%;
`;

const Box = styled(motion.div)<{ $bgPhoto: string }>`
  height: 8vw;
  border-radius: 4px;
  background-image: url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  &:first-of-type {
    transform-origin: center left;
  }
  &:last-of-type {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.4);
  opacity: 0;
  color: ${(props) => props.theme.white.white};
  h4 {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 4px;
  }
  small {
    font-size: 10px;
    font-weight: 400;
  }
  article {
    display: flex;
    gap: 5px;
    span {
      margin-top: 2px;
      font-size: 10px;
    }
  }
`;

const NextBtn = styled(motion.button)`
  position: absolute;
  left: calc(100% + 4px);
  background-color: rgba(0, 0, 0, 0);
  color: white;
  right: auto;
  bottom: 1.5vw;
  height: 8vw;
  border: none;
  opacity: 0;
  cursor: pointer;
  :hover {
    filter: brightness(1.5);
  }
`;

const PrevBtn = styled(NextBtn)`
  left: auto;
  right: calc(100% + 4px);
`;

const rowVariants = {
  hidden: ({ isNext }: { isNext: boolean }) => ({
    x: isNext ? 'calc(100% + 10px)' : 'calc(-100% - 10px)',
  }),
  visible: {
    x: 0,
  },
  exit: ({ isNext }: { isNext: boolean }) => ({
    x: isNext ? 'calc(-100% - 10px)' : 'calc(100% + 10px)',
  }),
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    transition: {
      type: 'tween',
      duration: 0.2,
      delay: 0.3,
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 0.2,
      delay: 0.2,
    },
  },
};

interface ISliderProps {
  data: IGetVideoResult;
  title: string;
  rowIndex: number;
}

function Slider({ data, title, rowIndex }: ISliderProps) {
  const offset = 5;
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving(false);
  const [isNext, setIsNext] = useState(true);

  const changeIndex = (direction = 'next') => {
    if (!data) return;
    if (leaving) return;
    setLeaving(true);
    const totalMovies = data.results.length - 1;
    const maxIndex = Math.floor(totalMovies / offset) - 1;
    direction === 'next' ? setIsNext(true) : setIsNext(false);

    if (isNext) {
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    } else {
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };
  return (
    <Wrapper>
      <Content>
        <Title onClick={() => changeIndex()}>{title}</Title>
        <AnimatePresence
          initial={false}
          onExitComplete={toggleLeaving}
          custom={{ isNext }}
        >
          <Row
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: 'tween', duration: 1 }}
            key={index}
            custom={{ isNext }}
          >
            {data?.results
              .slice(rowIndex)
              .slice(offset * index, offset * index + offset)
              .map((movie) => (
                <Box
                  layoutId={title + movie.id + ''}
                  key={movie.id}
                  variants={boxVariants}
                  whileHover="hover"
                  initial="normal"
                  transition={{ type: 'tween' }}
                  $bgPhoto={
                    movie.backdrop_path
                      ? makeImagePath(movie.backdrop_path, 'w500')
                      : require('../assets/no-image-icon-6.png')
                  }
                >
                  <Info variants={infoVariants}>
                    <h4>{movie.title}</h4>
                    <small>평점 : {movie.vote_average?.toFixed(1)}</small>
                    <article>
                      {movie.genre_ids?.map((id) => (
                        <span key={id}>{genres[String(id)]}</span>
                      ))}
                    </article>
                  </Info>
                </Box>
              ))}
          </Row>
        </AnimatePresence>
      </Content>
      <PrevBtn key="prev" onClick={() => changeIndex('prev')}>
        <svg
          width="8"
          height="40"
          viewBox="0 0 10 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M9.476.09c.452.226.65.805.44 1.295L1.985 20l7.933 18.615c.208.49.011 1.07-.44 1.295-.452.226-.987.012-1.196-.477L0 20 8.281.567c.209-.49.744-.703 1.195-.477Z"
            fill="currentColor"
          ></path>
        </svg>
      </PrevBtn>
      <NextBtn key="next" onClick={() => changeIndex()}>
        <svg
          width="8"
          height="40"
          viewBox="0 0 10 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M.524.09c-.452.226-.65.805-.44 1.295L8.015 20 .083 38.615c-.208.49-.011 1.07.44 1.295.452.226.987.012 1.196-.477L10 20 1.719.567C1.51.077.975-.136.524.09Z"
            fill="currentColor"
          ></path>
        </svg>
      </NextBtn>
    </Wrapper>
  );
}

export default Slider;
