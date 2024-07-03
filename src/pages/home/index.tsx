import useFetchHomeData from './hooks/useFetchHomeData';
import BannerLayout from './BannerLayout';
import SliderLayout from './SliderLayout';

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

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {(error as Error).message}</p>;

  return (
    <>
      <BannerLayout leftData={bannerLeftData} rightData={bannerRightData} />
      <SliderLayout
        latestData={latestData}
        trendingData={trendingData}
        topRatedData={topRatedData}
      />
    </>
  );
};

export default HomePage;
