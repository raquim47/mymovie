import Auth from './Auth';
import Favorite from './Favorite';
import Home from './Home';
import NotFound from './NotFound';
import Profile from './Profile';
import Rate from './Rate';
import Search from './Search';
import { Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoute from '../components/etc/PrivateRoute';

const MainRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/home/:listType/:movieId" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/search/:listType/:movieId" element={<Search />} />
      <Route path="/rate" element={<PrivateRoute component={Rate} />} />
      <Route path="/rate/:listType/:movieId" element={<PrivateRoute component={Rate} />} />
      <Route path="/favorite" element={<PrivateRoute component={Favorite} />} />
      <Route path="/favorite/:listType/:movieId" element={<PrivateRoute component={Favorite} />} />
      <Route path="/auth" element={<PrivateRoute component={Auth} />} />
      <Route path="/profile" element={<PrivateRoute component={Profile} />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default MainRoute;
