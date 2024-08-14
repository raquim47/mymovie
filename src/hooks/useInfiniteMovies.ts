import { useEffect, useRef } from 'react';
import { InfiniteData, QueryKey, useInfiniteQuery } from '@tanstack/react-query';
import { IMovieList } from 'services/movies/types';

const chunkMovies = <T>(data: InfiniteData<IMovieList<T>>, listSize: number) => {
  const allMovies = data.pages.flatMap((page) => page.results) || [];
  const chunkedMovies = [];
  for (let i = 0; i < allMovies.length; i += listSize) {
    chunkedMovies.push(allMovies.slice(i, i + listSize));
  }
  return chunkedMovies;
};

const useInfiniteMovies = <T>(
  queryKey: QueryKey,
  queryFn: (page: number) => Promise<IMovieList<T>>,
  listSize: number
) => {
  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 1 }) => queryFn(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage: IMovieList<T>) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
  });
  const movies = data ? chunkMovies(data, listSize) : [];
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && fetchNextPage(),
      { threshold: 0.8 }
    );
    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  return { movies, isFetching, observerRef, hasNextPage };
};

export default useInfiniteMovies;
