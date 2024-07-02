import { IMovie } from '../../services/movieApi';
import useFetchHomeData from './hooks/useFetchHomeData';
import withSlider from '../../hoc/with-slider';
import List from '../movie-list';

const Home = () => {
  const {
    latestData,
    trendingData,
    topRatedData,
    bannerLeftData,
    bannerRightData,
    loading,
    error,
  } = useFetchHomeData();
  const MovieListSlider = withSlider(List);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {(error as Error).message}</p>;

  return (
    <>
      <MovieListSlider
        data={latestData?.results as IMovie[]}
        rowSize={5}
        title="최신 개봉"
      />
      <MovieListSlider
        data={trendingData?.results as IMovie[]}
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

export default Home;
