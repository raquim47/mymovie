import { motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { useLocation, useMatch } from 'react-router-dom';
import styled from 'styled-components';
import { GetSearched, IGetMovieResult, IMovie } from '../api';
import List from '../Components/List';
import { makeImagePath } from '../utils';

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
  const a = useMatch(`/:page`);
  // console.log(a?.params.page)
  const { data, isLoading, isError } = useQuery<IGetMovieResult>(
    ['search', keyword],
    () => GetSearched(keyword || '')
  );

  const [loadedImagesCount, setLoadedImagesCount] = useState(0);
  const isAllImagesLoaded = loadedImagesCount === data?.results.length;
  // 이미지가 전부 로드 됐을 때 렌더링
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

  const rowSize = 6;
  const resultLength = data?.results.length || 0;
  const rowList = [];
  for (let i = 0; i < resultLength; i += rowSize) {
    const row = data?.results.slice(i, i + rowSize);
    rowList.push(row);
  }
  return (
    <Wrapper>
      {(isLoading || !isAllImagesLoaded) && <p>Loading...</p>}
      {isAllImagesLoaded && (
        rowList.map(rowData => <List
          data={rowData as IMovie[]}
          listType="searched"
          rowSize={rowSize}
          displayMode="portrait"
          keyword={keyword || ''}
        />)
        
      )}
    </Wrapper>
  );
}

export default Search;
