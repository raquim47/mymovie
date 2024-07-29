import { useEffect, useRef, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { IMovie, IMovieList } from 'hooks/movies/types';
import { handleRequestTMDB } from 'utils/tmdb';

const getSearchedMovies = (keyword: string, page: number) =>
  handleRequestTMDB<IMovieList>(
    `search/movie?query=${encodeURIComponent(keyword)}&page=${page}`
  );

export const useSearchMovies = (keyword: string) => {
  return useInfiniteQuery<IMovieList>({
    queryKey: ['movies', keyword],
    queryFn: ({ pageParam = 1 }) => getSearchedMovies(keyword, pageParam as number),
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
    },
    initialPageParam: 1,
  });
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
