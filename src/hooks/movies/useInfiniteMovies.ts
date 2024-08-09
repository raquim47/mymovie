import { useEffect, useRef } from 'react';
import { InfiniteData, QueryKey, useInfiniteQuery } from '@tanstack/react-query';
import { IMovieList } from 'hooks/movies/types';
import { handleRequestTMDB } from 'utils/tmdb';

export const getSearchedMovies = (page: number, keyword: string) =>
  handleRequestTMDB<IMovieList>(
    `search/movie?query=${encodeURIComponent(keyword)}&page=${page}`
  );

const chunkMovies = (data: InfiniteData<IMovieList>, listSize: number) => {
  const allMovies = data.pages.flatMap((page) => page.results) || [];
  const chunkedMovies = [];
  for (let i = 0; i < allMovies.length; i += listSize) {
    chunkedMovies.push(allMovies.slice(i, i + listSize));
  }
  return chunkedMovies;
};

const useIntersectionObserver = (
  callback: IntersectionObserverCallback,
  option?: IntersectionObserverInit
) => {
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(callback, option);
    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [callback, option]);

  return observerRef;
};

const useInfiniteMovies = (
  queryKey: QueryKey,
  queryFn: (page: number) => Promise<IMovieList>,
  listSize: number
) => {
  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 1 }) => queryFn(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage: IMovieList) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
  });
  const movies = (data && chunkMovies(data, listSize)) || [];
  const observerRef = useIntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    { threshold: 0.8 }
  );

  return { movies, isFetching, hasNextPage, observerRef };
};

export default useInfiniteMovies;
