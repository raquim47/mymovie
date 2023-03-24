import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useInfiniteQuery, useQueryClient } from 'react-query';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { GetSearched, IGetMovieResult, IMovie } from '../services/api';
import List from '../components/list/List';
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import UserItem from '../components/UserItem';
import { IUserData } from '../store';

const Wrapper = styled.div`
  padding: 0 30px;
`;

const SearchedKeyword = styled.h2`
  font-size: 30px;
  margin-bottom: 30px;

  strong {
    font-weight: 600;
    padding-right: 10px;
  }
`;
const SearchedUser = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;



function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get('keyword');
  const rowSize = 6;
  const [searchedUser, setSearchedUser] = useState<IUserData[]>([]);

  // 닉네임으로 유저 찾기
  const searchNickName = async (keyword: string) => {
    const db = getFirestore();
    const querySnapShot = await getDocs(
      query(
        collection(db, 'users'),
        where('nickName', '>=', keyword),
        where('nickName', '<=', keyword + '\uf8ff')
      )
    );
    return querySnapShot;
  };

  useEffect(() => {
    searchNickName(keyword as string).then((querySnapshot) => {
      const searchResult = querySnapshot.docs.map(
        (doc) => doc.data() as IUserData
      );
      setSearchedUser(searchResult);
    });
  }, [keyword]);

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

  const loaderRef = useRef<HTMLDivElement>(null);
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
    <Wrapper>
      <SearchedKeyword>
        <strong>' {keyword} '</strong>로 검색한 결과입니다.
      </SearchedKeyword>
      <SearchedUser>
        {searchedUser.map((userData) => (
          <UserItem key={userData.nickName} {...userData} />
        ))}
      </SearchedUser>
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
    </Wrapper>
  );
}

export default Search;
