import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useInfiniteQuery, useQueryClient } from 'react-query';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { GetSearched, IGetMovieResult, IMovie } from '../services/api';
import List from '../components/List';

const SearchedKeyword = styled.h2`
    font-size: 30px;
    margin-bottom: 30px;

  strong {
    font-weight: 600;
    padding-right: 10px;
  }
`;

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get('keyword');
  const rowSize = 6;

  // Infinite Query
  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery<IGetMovieResult, Error>(
      ['search', keyword],
      ({ pageParam = 1 }) => {
        return GetSearched(keyword || '', pageParam);
      },
      {
        getNextPageParam: (lastPage) => {
          const { page, total_pages } = lastPage;
          if (page < total_pages) {
            return page + 1;
          }
          return undefined;
        },
        refetchOnWindowFocus: false,
        staleTime: Infinity,
      }
    );
  // 모든 페이지의 영화 데이터를 합치기
  const resultList = useMemo(
    () =>
      data?.pages.reduce<IMovie[]>((acc, page) => {
        const { results } = page;
        return [...acc, ...results];
      }, []) || [],
    [data]
  );
  // resultList를 rowSize에 맞춰 여러 행으로 나누기     
  const listLength = resultList?.length || 0;
  const rowList = [];
  for (let i = 0; i < listLength; i += rowSize) {
    const row = resultList?.slice(i, i + rowSize);
    rowList.push(row);
  }

  const loaderRef = useRef<HTMLDivElement>(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (window.scrollY === 0) {
        return;
      }
      if (entry.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      threshold: 0.1,
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [handleIntersection]);

  // 검색어가 변경될 때마다 이전 결과를 캐시에서 제거
  const queryClient = useQueryClient();
  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {
      queryClient.removeQueries('search');
    };
  }, [keyword, queryClient]);

  return (
    <div>
      <SearchedKeyword>
        <strong>' {keyword} '</strong>로 검색한 결과입니다.
      </SearchedKeyword>
      
      {isLoading && <p>Loading...</p>}
      {rowList.map((rowData, i) => (
        <List
          key={i}
          data={rowData as IMovie[]}
          listType="searched"
          rowSize={rowSize}
          displayMode="portrait"
          keyword={keyword || ''}
        />
      ))}
      <div
        ref={loaderRef}
        style={{ border: '10px solid blue', marginTop: '60px' }}
      ></div>
    </div>
  );
}

export default Search;
