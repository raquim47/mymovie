import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { IFavoriteMovie, RootState } from '../../store';
import List from './List';

// 2차원 배열 만들기
const splitArray = (array: any[], rowSize: number) => {
  const result = [];
  for (let i = 0; i < array.length; i += rowSize) {
    result.push(array.slice(i, i + rowSize));
  }
  return result;
};

interface ILibrary {
  movieList: IFavoriteMovie[];
}

function Library({ movieList }: ILibrary) {
  const [listRow, setListRow] = useState(6);
  const windowWidth = useSelector((state: RootState) => state.windowWidth);
  useEffect(() => {
    if (windowWidth >= 1200) {
      setListRow(6);
    } else if (windowWidth >= 768) {
      setListRow(5);
    } else {
      setListRow(4);
    }
  }, [windowWidth]);
  const chunks = useMemo(() => {
    return movieList ? splitArray(movieList, listRow) : [];
  }, [movieList]);
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

      {currentChunkIndex < chunks.length - 1 ? (
        <div
          ref={loadMoreRef}
          style={{
            border: '10px solid blue',
            marginTop: '60px',
            height: '100px',
          }}
        ></div>
      ) : null}
    </>
  );
}

export default Library;