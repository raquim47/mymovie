import HomePage from './pages/home';
import NotFound from './pages/not-found';
import { Route, Routes } from 'react-router-dom';
import LoginPage from 'pages/login';
import SignUpPage from 'pages/sign-up';
import MovieDetail from 'components/movie-detail';
import ProfilePage from 'pages/profile';
import SearchPage from 'pages/search';
import PrivateRoute from 'components/route-guards/PrivateRoute';
import GuestRoute from 'components/route-guards/GuestRoute';
import WatchListPage from 'pages/watchlist';
import PATH from 'utils/path';
import ReviewedPage from 'pages/reviewed';

const MainRoute = () => {
  return (
    <Routes>
      <Route path={PATH.HOME} element={<HomePage />}>
        <Route path={PATH.MOVIE_DETAIL} element={<MovieDetail />} />
      </Route>
      <Route path={PATH.SEARCH} element={<SearchPage />}>
        <Route path={PATH.MOVIE_DETAIL} element={<MovieDetail />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path={PATH.REVIEWED} element={<ReviewedPage />}>
          <Route path={PATH.MOVIE_DETAIL} element={<MovieDetail />} />
        </Route>
        <Route path={PATH.WATCHLIST} element={<WatchListPage />}>
          <Route path={PATH.MOVIE_DETAIL} element={<MovieDetail />} />
        </Route>
        <Route path={PATH.PROFILE} element={<ProfilePage />} />
      </Route>
      <Route element={<GuestRoute />}>
        <Route path={PATH.LOGIN} element={<LoginPage />} />
        <Route path={PATH.SIGNUP} element={<SignUpPage />} />
      </Route>
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default MainRoute;
