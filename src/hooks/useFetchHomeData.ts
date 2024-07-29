import { useQueries } from '@tanstack/react-query';
import {
  getMovieDetail,
  getMoviesLatest,
  getMoviesTopRated,
  getMoviesTrending,
  getMoviesUpcoming,
} from 'services/movies';

const useFetchHomeData = () => {
  const baseQueryResults = useQueries({
    queries: [
      { queryKey: ['movies', 'latest'], queryFn: getMoviesLatest },
      { queryKey: ['movies', 'upcoming'], queryFn: getMoviesUpcoming },
      { queryKey: ['movies', 'trending'], queryFn: getMoviesTrending },
      { queryKey: ['movies', 'topRated'], queryFn: getMoviesTopRated },
    ],
  });

  const [latestData, upcomingData, trendingData, topRatedData] = baseQueryResults.map(
    (query) => query.data
  );

  const firstLatestMovieId = latestData?.results[0]?.id;
  const firstUpcomingMovieId = upcomingData?.results[0]?.id;

  const dependentQueryResults = useQueries({
    queries: [
      {
        queryKey: ['bannerLeftData', firstLatestMovieId],
        queryFn: () =>
          typeof firstLatestMovieId === 'number'
            ? getMovieDetail(firstLatestMovieId)
            : undefined,
        enabled: !!firstLatestMovieId,
      },
      {
        queryKey: ['bannerRightData', firstUpcomingMovieId],
        queryFn: () =>
          typeof firstUpcomingMovieId === 'number'
            ? getMovieDetail(firstUpcomingMovieId)
            : undefined,
        enabled: !!firstUpcomingMovieId,
      },
    ],
  });

  const allQueries = [...baseQueryResults, ...dependentQueryResults];
  const isLoading = allQueries.some((query) => query.isLoading);
  const error = allQueries.find((query) => query.error)?.error;
  return {
    latestData: latestData?.results,
    trendingData: trendingData?.results,
    topRatedData: topRatedData?.results,
    bannerLeftData: dependentQueryResults[0].data,
    bannerRightData: dependentQueryResults[1].data,
    isLoading,
    error,
  };
};

export default useFetchHomeData;
