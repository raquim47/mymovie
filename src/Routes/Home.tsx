import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Loader from '../components/etc/Loader';
import Banner from '../components/list/Banner';
import List from '../components/list/List';
import {
  getMovieDetail,
  getMoviesLatest,
  getMoviesTopRated,
  getMoviesTrending,
  getMoviesUpcoming,
  IGetMovieResult,
  IMovie,
} from '../services/movieApi';
import { RootState } from '../store';

const SliderGrid = styled.section`
  display: grid;
  gap: 1vw 0;
  margin-top: 5px;
  padding-bottom: 40px;
`;

export const SectionTitle = styled.h3`
  font-size: ${(props) => props.theme.fontSizePx.l};
  font-weight: 500;
  color: ${(props) => props.theme.white.darker};
  @media only screen and (max-width: 960px) {
    font-size: ${(props) => props.theme.fontSizeVw.l};
  }
  @media only screen and (max-width: 768px) {
    font-size: ${(props) => props.theme.fontSizeVw['3xl']};
  }
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  margin-top: 60px;
`;

function Home() {
  const [slideRow, setSlideRow] = useState(5);
  const windowWidth = useSelector((state: RootState) => state.windowWidth);
  useEffect(() => {
    if (windowWidth >= 1200) {
      setSlideRow(5);
    } else if (windowWidth >= 1024) {
      setSlideRow(4);
    } else {
      setSlideRow(3);
    }
  }, [windowWidth]);
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

  if (loading)
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );
  if (error) return <p>Error: {(error as Error).message}</p>;
  return (
    <>
      <Banner<IMovie>
        bannerLeftData={bannerLeftData}
        bannerRightData={bannerRightData}
      />
      <SliderGrid>
        <div>
          <SectionTitle>최신 개봉</SectionTitle>
          <List
            data={latestData?.results as IMovie[]}
            startIndex={1}
            rowSize={slideRow}
            listType='latest'
            isSlideEnabled={true}
          />
        </div>
        <div>
          <SectionTitle>요즘 인기</SectionTitle>
          <List
            data={trendingData?.results as IMovie[]}
            rowSize={slideRow}
            listType='trending'
            isSlideEnabled={true}
          />
        </div>
        <div>
          <SectionTitle>Top 평점</SectionTitle>
          <List
            data={topRatedData?.results as IMovie[]}
            rowSize={slideRow}
            listType='topRated'
            isSlideEnabled={true}
          />
        </div>
      </SliderGrid>
    </>
  );
}
export default Home;
