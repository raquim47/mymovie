import MovieList from 'components/movie-list';
import useSetListSize from 'hooks/ui/list-size';
import { useEffect, useRef, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { getSearchedMovies } from 'services/movies';
import { IMovie } from 'services/movies/types';
import ST from './styles';

const useSearchMovies = (keyword: string) => {
  return useInfiniteQuery(
    ['movies', keyword],
    ({ pageParam = 1 }) => getSearchedMovies(keyword, pageParam),
    {
      getNextPageParam: (lastPage) =>
        lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    }
  );
};

const SearchPage = ({ presetKeyword }: { presetKeyword?: string }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keyword = presetKeyword || queryParams.get('keyword') || '';
  const [movies, setMovies] = useState<IMovie[][]>([]);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSearchMovies(keyword);
  const observerElem = useRef<HTMLDivElement>(null);

  const listSize = useSetListSize({
    default: 3,
    576: 4,
    1200: 5,
  });

  useEffect(() => {
    if (data) {
      const allMovies = data.pages.flatMap((page) => page.results);
      const chunkedMovies = [];
      for (let i = 0; i < allMovies.length; i += listSize) {
        chunkedMovies.push(allMovies.slice(i, i + listSize));
      }
      setMovies(chunkedMovies);
    }
  }, [data, listSize]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (observerElem.current) {
      observer.observe(observerElem.current);
    }

    return () => {
      if (observerElem.current) {
        observer.unobserve(observerElem.current);
      }
    };
  }, [observerElem, hasNextPage, fetchNextPage]);

  return (
    <>
      <ST.Keyword>'{keyword}' 으로 검색한 결과입니다.</ST.Keyword>
      <ST.SearchResults>
        {movies.map((list, index) => (
          <ST.RatioBox key={index}>
            <MovieList data={list} listSize={listSize} imageType="poster" />
          </ST.RatioBox>
        ))}
        {isFetchingNextPage && <div>로딩 중...</div>}
        <div ref={observerElem} style={{ height: '1px' }}></div>
      </ST.SearchResults>
    </>
  );
};

export default SearchPage;
