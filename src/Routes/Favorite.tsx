import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { List } from '../components/components';
import { RootState } from '../store';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const Wrapper = styled.div`
  padding: 0 30px;
`;
// 2차원 배열 만들기
const splitArray = (array: any[], rowSize: number) => {
  const result = [];
  for (let i = 0; i < array.length; i += rowSize) {
    result.push(array.slice(i, i + rowSize));
  }
  return result;
};

function Favorite() {
  const favoriteMovie = useSelector(
    (state: RootState) => state.userData?.favoriteMovie
  );
  const rowSize = 5;
  const chunks = useMemo(() => {
    return favoriteMovie ? splitArray(favoriteMovie, rowSize) : [];
  }, [favoriteMovie]);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(1);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && currentChunkIndex < chunks.length - 1) {
        setTimeout(
          () => setCurrentChunkIndex((prevIndex) => prevIndex + 1),
          500
        );
      }
    },
    [currentChunkIndex, chunks]
  );
  // 무한 스크롤 구현을 위한 IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      threshold: 0.01,
    });
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [handleIntersection]);
  return (
    <Wrapper>
      <div>
        {chunks.slice(0, currentChunkIndex + 1).map((chunk, i) => (
          <List
            key={i}
            data={chunk}
            listType="favoriteList"
            rowSize={rowSize}
            displayMode="portrait"
          />
        ))}
      </div>

      {currentChunkIndex < chunks.length - 1 ? (
        <div
          ref={loadMoreRef}
          style={{ border: '10px solid blue', marginTop: '60px', height: '100px' }}
        ></div>
      ) : null}
    </Wrapper>
  );
}

export default Favorite;
