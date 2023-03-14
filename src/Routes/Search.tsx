import { motion } from 'framer-motion';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { GetSearched, IGetMovieResult } from '../api';
import SearchForm from '../Components/SearchForm';
import Slider from '../Components/Slider';
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
`;

const Row = styled.ul<{ offset: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.offset}, 1fr);
  grid-auto-rows: 300px;
  grid-gap: 40px 20px;
`;

const Box = styled(motion.li)<{ $bgPhoto: string, offset: number }>`
  border-radius: 4px;
  background-image: url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  &:nth-child(${props => props.offset}n + 1) {
    transform-origin: center left;
  }
  &:nth-child(${props => props.offset}n) {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  position: relative;
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
    font-size: 18px;
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
    scale: 1.1,
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

  if(isLoading) return <p>로딩중</p>
  if(isError) return <p>에러</p>
  
  return (
    <Wrapper>
      <h2>{keyword}로 검색한 결과입니다</h2>
      <Row offset={offset}>
        {data?.results.map((movie) => (
          <Box
            offset={offset}
            key={movie.id}
            variants={boxVariants}
            initial="normal"
            whileHover="hover"
            $bgPhoto={
              movie.poster_path
                ? makeImagePath(movie.poster_path, 'w500')
                : require('../assets/no-image-icon-6.png')
            }
            transition={{ type: 'tween' }}
          >
            <Info variants={infoVariants}>
              <h4>{movie.title}</h4>
              <small>평점 : {movie.vote_average?.toFixed(1)}</small>
              <article>
                {movie.genre_ids?.map((id) => (
                  <span key={id}>{genres[String(id)]}</span>
                ))}
              </article>
              <InitialDetailBox layoutId={'search' + movie.id} />
            </Info>
          </Box>
        ))}
      </Row>
    </Wrapper>
  );
}
export default Search;
