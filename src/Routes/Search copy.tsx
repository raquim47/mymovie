import { motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { useLocation, useMatch } from 'react-router-dom';
import styled from 'styled-components';
import { GetSearched, IGetMovieResult, IMovie } from '../services/api';
import List from '../components/list/List';
import { makeImagePath } from '../utils/utils';

const Loader = styled.div`
  border: 1px solid red;
  height: 10px;
  width: 10px;
`
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

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get('keyword');
  const [page, setPage] = useState(1);

  // Query
  const { data, isLoading, isError } = useQuery<IGetMovieResult>(
    ['search', keyword],
    () => GetSearched(keyword || '', page)
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
  console.log(data)
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
        rowList.map((rowData, i) => <List
          key={i}
          data={rowData as IMovie[]}
          listType="searched"
          rowSize={rowSize}
          displayMode="portrait"
          keyword={keyword || ''}
        />)
      )}
      <Loader/>
    </Wrapper>
  );
}

export default Search;
