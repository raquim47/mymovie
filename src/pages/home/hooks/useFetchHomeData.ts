import { useQueries } from 'react-query';
import {
  getMovieDetail,
  getMoviesLatest,
  getMoviesTopRated,
  getMoviesTrending,
  getMoviesUpcoming,
} from 'services/movies';

const useFetchHomeData = () => {
  const baseQueryResults = useQueries([
    { queryKey: ['movies', 'latest'], queryFn: getMoviesLatest },
    { queryKey: ['movies', 'upcoming'], queryFn: getMoviesUpcoming },
    { queryKey: ['movies', 'trending'], queryFn: getMoviesTrending },
    { queryKey: ['movies', 'topRated'], queryFn: getMoviesTopRated },
  ]);

  const [latestData, upcomingData, trendingData, topRatedData] =
    baseQueryResults.map((query) => query.data);

  const firstLastestMovieId = latestData?.results[0]?.id;
  const firstUpcomingMovieId = upcomingData?.results[0]?.id;

  const dependentQueryResults = useQueries([
    {
      queryKey: ['bannerLeftData', firstLastestMovieId],
      queryFn: () =>
        typeof firstLastestMovieId === 'number' &&
        getMovieDetail(firstLastestMovieId),
      enabled: !!firstLastestMovieId,
    },
    {
      queryKey: ['bannerRightData', firstUpcomingMovieId],
      queryFn: () =>
        typeof firstUpcomingMovieId === 'number' &&
        getMovieDetail(firstUpcomingMovieId),
      enabled: !!firstUpcomingMovieId,
    },
  ]);

  const allQueries = [...baseQueryResults, ...dependentQueryResults];

  const isLoading = allQueries.some((query) => query.isLoading);
  const error = allQueries.find((query) => query.error)?.error;

  return {
    latestData,
    upcomingData,
    trendingData,
    topRatedData,
    bannerLeftData: dependentQueryResults[0].data,
    bannerRightData: dependentQueryResults[1].data,
    isLoading,
    error,
  };
};

export default useFetchHomeData;
