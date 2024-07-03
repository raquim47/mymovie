import useFetchHomeData from './hooks/useFetchHomeData';
import withSlider from 'hoc/with-slider';
import List from 'components/movie-list';
import useSetListSize from 'hooks/useSetListSize';

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

  const listSize = useSetListSize({
    768: 3,
    1200: 4,
    default: 5,
  });

  const MovieListSlider = withSlider(List);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {(error as Error).message}</p>;

  return (
    <>
      <MovieListSlider
        data={latestData?.results ?? []}
        listSize={listSize}
        title="최신 개봉"
      />
      <MovieListSlider
        data={trendingData?.results ?? []}
        listSize={listSize}
        title="요즘 인기"
      />
      <MovieListSlider
        data={topRatedData?.results ?? []}
        listSize={listSize}
        title="Top 평점"
      />
    </>
  );
};

export default HomePage;
