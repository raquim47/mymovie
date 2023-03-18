import { useQuery } from 'react-query';
import styled from 'styled-components';
import {
  getMovieDetail,
  getMoviesLatest,
  getMoviesTopRated,
  getMoviesTrending,
  getMoviesUpcoming,
  IGetMovieResult,
  IMovie,
} from '../api';
import Banner from '../Components/Banner';
import List from '../Components/List';

const Wrapper = styled.main`
  padding: 110px 30px 50px 270px;
`;

const SliderGrid = styled.section`
  display: grid;
`;

const SliderItem = styled.div`
  margin-top: 1vw;
  h3 {
    margin-bottom: 0.4vw;
    font-size: 1.5vw;
    font-weight: 600;
    color: ${(props) => props.theme.white.darker};
  }
`;

function Home() {
  // useQuery for Latest Movie
  const {
    data: latestData,
    isLoading: latestLoading,
    error: latestError,
  } = useQuery<IGetMovieResult>(['movies', 'latest'], getMoviesLatest);
  // useQuery for Upcoming Movie
  const {
    data: upcomingData,
    isLoading: upcomingLoading,
    error: upcomingError,
  } = useQuery<IGetMovieResult>(['movies', 'upcoming'], getMoviesUpcoming);
  // useQuery for Trending Movie
  const {
    data: trendingData,
    isLoading: trendingLoading,
    error: trendingError,
  } = useQuery<IGetMovieResult>(['movies', 'trending'], getMoviesTrending);
  // useQuery for TopRated
  const {
    data: topRatedData,
    isLoading: topRatedLoading,
    error: topRatedError,
  } = useQuery<IGetMovieResult>(['movies', 'topRated'], getMoviesTopRated);

  // useQuery for Banner
  const {
    data: bannerLeftData,
    isLoading: bannerLeftLoading,
    error: bannerLeftError,
  } = useQuery<IMovie>(
    ['bannerLeftData', latestData?.results[0].id],
    () => getMovieDetail(latestData?.results[0].id),
    { enabled: !!latestData?.results[0].id }
  );

  const {
    data: bannerRightData,
    isLoading: bannerRightLoading,
    error: bannerRightError,
  } = useQuery<IMovie>(
    ['bannerRightData', upcomingData?.results[0].id],
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
      <Banner<IMovie>
        bannerLeftData={bannerLeftData}
        bannerRightData={bannerRightData}
      />
      <SliderGrid>
        <SliderItem>
          <h3>최신 개봉</h3>
          <List
            data={latestData as IGetMovieResult}
            startIndex={1}
            rowSize={5}
            listType="latest"
            isSlideEnabled={true}
            // displayMode="portrait"
          />
        </SliderItem>
        <SliderItem>
          <h3>요즘 인기</h3>
          <List
            data={trendingData as IGetMovieResult}
            rowSize={5}
            listType="trending"
            isSlideEnabled={true}
          />
        </SliderItem>
        <SliderItem>
          <h3>Top 평점</h3>
          <List
            data={topRatedData as IGetMovieResult}
            rowSize={5}
            listType="topRated"
            isSlideEnabled={true}
          />
        </SliderItem>
      </SliderGrid>
    </Wrapper>
  );
}
export default Home;
