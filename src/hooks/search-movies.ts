import { useEffect, useRef, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { getSearchedMovies } from 'services/movies';
import { IMovie } from 'services/movies/types';

export const useSearchMovies = (keyword: string) => {
  return useInfiniteQuery(
    ['movies', keyword],
    ({ pageParam = 1 }) => getSearchedMovies(keyword, pageParam),
    {
      getNextPageParam: (lastPage) =>
        lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    }
  );
};

export const useManagedSearchMovie = (keyword: string, listSize: number) => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSearchMovies(keyword);
  const [movies, setMovies] = useState<IMovie[][]>([]);
  const observerRef = useRef<HTMLDivElement>(null);

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

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasNextPage, fetchNextPage]);

  return { movies, isLoading, isFetchingNextPage, observerRef };
};
