import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../store';
import { ISortMovies, ISortType, sortMovies } from '../../utils/utils';
import Loader from '../etc/Loader';
import List from './List';
import SortOption from './SortOption';

// 2차원 배열 만들기
const splitArray = (array: any[], rowSize: number) => {
  const result = [];
  for (let i = 0; i < array.length; i += rowSize) {
    result.push(array.slice(i, i + rowSize));
  }
  return result;
};

interface ILibrary {
  movieList: { [key: number]: ISortMovies };
  sortTypeArr: ISortType[];
}

function Library({ movieList = {}, sortTypeArr }: ILibrary) {
  // 반응형 row 설정
  const [listRow, setListRow] = useState(6);
  const windowWidth = useSelector((state: RootState) => state.windowWidth);
  useEffect(() => {
    if (windowWidth >= 1200) {
      setListRow(6);
    } else if (windowWidth >= 768) {
      setListRow(5);
    } else if (windowWidth >= 600) {
      setListRow(4);
    } else {
      setListRow(3);
    }
  }, [windowWidth]);

  // sortType에 따라 movieList 배열로 정렬
  const [sortType, setSortType] = useState<ISortType>(sortTypeArr[0]);
  const [sortedMovies, setSortedMovies] = useState<ISortMovies[]>([]);
  useEffect(() => {
    setSortedMovies(sortMovies(movieList, sortType));
  }, [movieList, sortType]);

  // 행별 랜더링을 위한 chucks 분리
  const chunks = useMemo(() => {
    return splitArray(sortedMovies, listRow);
  }, [sortedMovies]);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(2);
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
    <>
      <SortOption sortTypeArr={sortTypeArr} setSortType={setSortType} />
      <div>
        {chunks.slice(0, currentChunkIndex + 1).map((chunk, i) => (
          <List
            key={i}
            data={chunk}
            listType='library'
            rowSize={listRow}
            displayMode='portrait'
          />
        ))}
      </div>

      {currentChunkIndex < chunks.length - 1 && (
        <div ref={loadMoreRef}>
          <Loader />
        </div>
      )}
    </>
  );
}

export default Library;
