import { AnimatePresence } from 'framer-motion';
import { useQuery } from 'react-query';
import { useMatch } from 'react-router-dom';
import styled from 'styled-components';
import {
  getMovieDetail,
  getMoviesLatest,
  getMoviesTopRated,
  getMoviesTrending,
  getMoviesUpcoming,
  IGetVideoResult,
  IVideo,
} from '../api';
import Banner from '../Components/Banner';
import MovieDetail from '../Components/Detail';
import Slider from '../Components/Slider';

const Wrapper = styled.main`
  padding: 30px 30px 50px;
  border: 1px solid red;
`;

function useMovieDetailQuery(movie?: IVideo) {
  return useQuery<IVideo>(
    ['movieDetail', movie?.id],
    () => getMovieDetail(movie?.id!),
    {
      enabled: !!movie?.id,
    }
  );
}
function Movie() {
  const videoIdMatch = useMatch('/movie/:videoId');
  const videoId = videoIdMatch?.params.videoId;
  console.log(videoIdMatch, videoId);
  // useQuery for Latest Movie
  const {
    data: latestData,
    isLoading: latestLoading,
    error: latestError,
  } = useQuery<IGetVideoResult>(['movies', 'latest'], getMoviesLatest);
  // useQuery for Upcoming Movie
  const {
    data: upcomingData,
    isLoading: upcomingLoading,
    error: upcomingError,
  } = useQuery<IGetVideoResult>(['movies', 'upcoming'], getMoviesUpcoming);
  // useQuery for Trending Movie
  const {
    data: trendingData,
    isLoading: trendingLoading,
    error: trendingError,
  } = useQuery<IGetVideoResult>(['movies', 'trending'], getMoviesTrending);
  // useQuery for TopRated
  const {
    data: topRatedData,
    isLoading: topRatedLoading,
    error: topRatedError,
  } = useQuery<IGetVideoResult>(['movies', 'topRated'], getMoviesTopRated);

  // useQuery for Banner
  const {
    data: bannerLeftData,
    isLoading: bannerLeftLoading,
    error: bannerLeftError,
  } = useQuery<IVideo>(
    ['movieDetail', latestData?.results[0].id],
    () => getMovieDetail(latestData?.results[0].id),
    { enabled: !!latestData }
  );

  const {
    data: bannerRightData,
    isLoading: bannerRightLoading,
    error: bannerRightError,
  } = useQuery<IVideo>(
    ['movieDetail', upcomingData?.results[0].id],
    () => getMovieDetail(upcomingData?.results[0].id),
    { enabled: !!upcomingData?.results[0].id }
  );

  const loading =
    latestLoading ||
    upcomingLoading ||
    trendingLoading ||
    topRatedLoading ||
    bannerLeftLoading ||
    bannerRightLoading;
  const error =
    latestError ||
    upcomingError ||
    trendingError ||
    topRatedError ||
    bannerLeftError ||
    bannerRightError;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {(error as Error).message}</p>;
  return (
    <Wrapper>
      <Banner<IVideo>
        bannerLeftData={bannerLeftData}
        bannerRightData={bannerRightData}
      />
      <Slider
        data={latestData as IGetVideoResult}
        rowIndex={1}
        title="최신 개봉"
      />
      <Slider
        data={trendingData as IGetVideoResult}
        rowIndex={0}
        title="요즘 인기"
      />
      <Slider
        data={topRatedData as IGetVideoResult}
        rowIndex={0}
        title="Top 평점"
      />

      <AnimatePresence>
        {videoIdMatch ? (
          <MovieDetail
            movieId={Number(videoIdMatch?.params.videoId)}
            from="home"
            key={Number(videoIdMatch?.params.videoId)}
          />
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}
export default Movie;
