import { useQuery } from 'react-query';
import {
  getMovieDetail,
  getMoviesLatest,
  getMoviesTopRated,
  getMoviesTrending,
  getMoviesUpcoming,
  IGetMovieResult,
  IMovie,
} from '@/services/movieApi';

const useFetchHomeData = () => {
  const {
    data: latestData,
    isLoading: latestLoading,
    error: latestError,
  } = useQuery<IGetMovieResult>(['movies', 'latest'], getMoviesLatest);

  const { data: upcomingData } = useQuery<IGetMovieResult>(
    ['movies', 'upcoming'],
    getMoviesUpcoming
  );

  const {
    data: trendingData,
    isLoading: trendingLoading,
    error: trendingError,
  } = useQuery<IGetMovieResult>(['movies', 'trending'], getMoviesTrending);

  const {
    data: topRatedData,
    isLoading: topRatedLoading,
    error: topRatedError,
  } = useQuery<IGetMovieResult>(['movies', 'topRated'], getMoviesTopRated);

  const {
    data: bannerLeftData,
    isLoading: bannerLeftLoading,
    error: bannerLeftError,
  } = useQuery<IMovie>(
    ['bannerLeftData', latestData?.results[1].id],
    () => getMovieDetail(latestData?.results[1].id),
    { enabled: !!latestData?.results[1].id }
  );

  const {
    data: bannerRightData,
    isLoading: bannerRightLoading,
    error: bannerRightError,
  } = useQuery<IMovie>(
    ['bannerRightData', upcomingData?.results[2].id],
    () => getMovieDetail(upcomingData?.results[2].id),
    { enabled: !!upcomingData?.results[2].id }
  );

  const loading =
    latestLoading ||
    trendingLoading ||
    topRatedLoading ||
    bannerLeftLoading ||
    bannerRightLoading;

  const error =
    latestError ||
    trendingError ||
    topRatedError ||
    bannerLeftError ||
    bannerRightError;

  return {
    latestData,
    trendingData,
    topRatedData,
    bannerLeftData,
    bannerRightData,
    loading,
    error,
  };
};

export default useFetchHomeData;
