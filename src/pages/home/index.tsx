import Banners from 'components/layout/banners';
import Sliders from 'components/layout/sliders';
import { Outlet } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
      <Banners />
      <Sliders />
      <Outlet />
    </>
  );
};

export default HomePage;
