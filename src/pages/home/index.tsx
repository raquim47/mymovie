import Loader from 'components/ui/Loader';
import useGetHomeMovies from 'hooks/movies/useGetHomeMovies';
import { Outlet } from 'react-router-dom';
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
  } = useGetHomeMovies();

  if (isLoading) return <Loader />;
  if (error) return <p>Error: {(error as Error).message}</p>;
  return (
    <>
      <BannerLayout leftData={bannerLeftData} rightData={bannerRightData} />
      <SliderLayout
        latestData={latestData}
        trendingData={trendingData}
        topRatedData={topRatedData}
      />
      <Outlet />
    </>
  );
};

export default HomePage;
