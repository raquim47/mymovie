import { useQuery } from 'react-query';
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
import Slider from '../Components/Slider';

const Wrapper = styled.main`
  padding: 30px 30px 50px;
  border: 1px solid red;
`;

const Title = styled.h2`
  font-size: 30px;
  font-weight: 600;
  color: ${(props) => props.theme.white.white};
  margin-bottom: 20px;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
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
  } = useMovieDetailQuery(latestData?.results[0]);
  const {
    data: bannerRightData,
    isLoading: bannerRightLoading,
    error: bannerRightError,
  } = useMovieDetailQuery(upcomingData?.results[0]);

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
      <Title>영화</Title>
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
    </Wrapper>
  );
}
export default Movie;
