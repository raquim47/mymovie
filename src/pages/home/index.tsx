import useFetchHomeData from './hooks/useFetchHomeData';
import withSlider from 'hoc/with-slider';
import List from 'components/movie-list';
import { IMovieDetails } from 'services/movies/types';

const HomePage = () => {
  const {
    latestData,
    trendingData,
    topRatedData,
    bannerLeftData,
    bannerRightData,
    isLoading,
    error,
  } = useFetchHomeData();
  const MovieListSlider = withSlider(List);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {(error as Error).message}</p>;

  return (
    <>
      <MovieListSlider
        data={latestData?.results as IMovieDetails[]}
        rowSize={5}
        title="최신 개봉"
      />
      <MovieListSlider
        data={trendingData?.results as IMovieDetails[]}
        rowSize={5}
        title="요즘 인기"
      />
      {topRatedData && (
        <MovieListSlider
          data={topRatedData?.results}
          rowSize={5}
          title="Top 평점"
        />
      )}
    </>
  );
};

export default HomePage;
