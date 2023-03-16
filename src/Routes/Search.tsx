import { motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { GetSearched, IGetMovieResult } from '../api';
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
  padding: 110px 30px 50px 270px;

  h2 {
    font-size: 30px;
    margin-bottom: 30px;
  }

  strong {
    font-weight: 600;
    padding-right: 10px;
  }
`;

const Row = styled.ul<{ offset: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.offset}, 1fr);
  grid-gap: 30px 20px;
`;

const Box = styled(motion.li)<{ offset: number }>`
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  padding-bottom: 150%;
  cursor: pointer;
  &:nth-child(${(props) => props.offset}n + 1) {
    transform-origin: center left;
  }
  &:nth-child(${(props) => props.offset}n) {
    transform-origin: center right;
  }

  img {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Info = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  color: ${(props) => props.theme.white.white};

  h4 {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 4px;
  }
  small {
    font-size: 14px;
    font-weight: 400;
  }
  article {
    display: flex;
    gap: 5px;
    span {
      margin-top: 2px;
      font-size: 12px;
      font-weight: 400;
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

const boxVariants = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: {
      type: 'tween',
      duration: 0.2,
      delay: 0.3,
    },
  },
};

const infoVariants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 0.2,
      delay: 0.2,
    },
  },
};
function Search() {
  const offset = 5;
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get('keyword');

  const { data, isLoading, isError } = useQuery<IGetMovieResult>(
    ['search', keyword],
    () => GetSearched(keyword || '')
  );

  const [loadedImagesCount, setLoadedImagesCount] = useState(0);

  useEffect(() => {
    if (data) {
      setLoadedImagesCount(0);
      const images = data.results.map((movie) => {
        const img = new Image();
        img.src = movie.poster_path
          ? makeImagePath(movie.poster_path, 'w300')
          : require('../assets/no-image-icon-6.png');
        img.onload = () => {
          setLoadedImagesCount((prevCount) => prevCount + 1);
        };
        return img;
      });

      return () => {
        images.forEach((img) => (img.onload = null));
      };
    }
  }, [data]);

  const isAllImagesLoaded = loadedImagesCount === data?.results.length;

  console.log(isAllImagesLoaded);
  return (
    <Wrapper>
      {(isLoading || !isAllImagesLoaded) && <p>Loading...</p>}
      {isAllImagesLoaded && (
        <Row offset={offset}>
          {data?.results.map((movie) => (
            <Box
              offset={offset}
              key={movie.id}
              variants={boxVariants}
              initial="normal"
              whileHover="hover"
              transition={{ type: 'tween' }}
            >
              <img
                src={
                  movie.poster_path
                    ? makeImagePath(movie.poster_path, 'w300')
                    : require('../assets/no-image-icon-6.png')
                }
                alt={movie.title}
              />
              <Info variants={infoVariants}>
                <h4>{movie.title}</h4>
                <small>평점 : {movie.vote_average?.toFixed(1)}</small>
                <article>
                  {movie.genre_ids?.map((id) => (
                    <span key={id}>{genres[String(id)]}</span>
                  ))}
                </article>
                {/* <InitialDetailBox layoutId={ movie.id} /> */}
              </Info>
            </Box>
          ))}
        </Row>
      )}
    </Wrapper>
  );
}

export default Search;
