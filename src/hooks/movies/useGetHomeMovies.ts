import { useQueries, useQuery } from '@tanstack/react-query';
import { handleRequestTMDB } from 'utils/tmdb';
import { IMovieList } from 'hooks/movies/types';
import { getMovieDetail } from './useGetMovieDetail';

export const getHomeMovies = async () => {
  const [latest, upcoming, trending, topRated] = await Promise.all([
    handleRequestTMDB<IMovieList>('movie/now_playing'),
    handleRequestTMDB<IMovieList>('movie/upcoming'),
    handleRequestTMDB<IMovieList>('trending/movie/day'),
    handleRequestTMDB<IMovieList>('movie/top_rated'),
  ]);

  return { latest, upcoming, trending, topRated };
};

const useGetHomeMovies = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['homePageData'],
    queryFn: getHomeMovies,
  });

  const firstLatestMovieId = data?.latest?.results[0]?.id;
  const firstUpcomingMovieId = data?.upcoming?.results[0]?.id;

  const dependentQueries = [
    { key: 'bannerLeftData', id: firstLatestMovieId },
    { key: 'bannerRightData', id: firstUpcomingMovieId },
  ].map(({ key, id }) => ({
    queryKey: [key, id],
    queryFn: () =>
      typeof id === 'number' ? getMovieDetail(id) : Promise.resolve(undefined),
    enabled: !!id,
  }));

  const dependentQueryResults = useQueries({ queries: dependentQueries });
  const isLoadingDependent = dependentQueryResults.some((query) => query.isLoading);
  const errorDependent = dependentQueryResults.find((query) => query.error)?.error;

  return {
    latestData: data?.latest?.results,
    upcomingData: data?.upcoming?.results,
    trendingData: data?.trending?.results,
    topRatedData: data?.topRated?.results,
    bannerLeftData: dependentQueryResults[0].data,
    bannerRightData: dependentQueryResults[1].data,
    isLoading: isLoading || isLoadingDependent,
    error: error || errorDependent,
  };
};

export default useGetHomeMovies;
