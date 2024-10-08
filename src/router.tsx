import HomePage from './pages/home';
import NotFound from './pages/not-found';
import { Route, Routes } from 'react-router-dom';
import LoginPage from 'pages/login';
import SignUpPage from 'pages/sign-up';
import MovieDetail from 'components/movie-detail';
import ProfilePage from 'pages/profile';
import SearchPage from 'pages/search';
import PrivateRoute from 'components/route-guards/PrivateRoute';
import PublicRoute from 'components/route-guards/PublicRoute';
import WatchListPage from 'pages/watchlist';
import PATH from 'utils/path';
import ReviewedPage from 'pages/reviewed';
import MainLayout from 'components/layout/main';

const MainRoute = () => {
  return (
    <Routes>
      <Route path={PATH.HOME} element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path={PATH.SEARCH} element={<SearchPage />} />
        <Route path={PATH.PROFILE} element={<ProfilePage />} />
        <Route path={PATH.MOVIE_DETAIL} element={<MovieDetail />} />
        <Route element={<PrivateRoute />}>
          <Route path={PATH.WATCHLIST} element={<WatchListPage />} />
          <Route path={PATH.REVIEWED} element={<ReviewedPage />} />
        </Route>
        <Route element={<PublicRoute />}>
          <Route path={PATH.LOGIN} element={<LoginPage />} />
          <Route path={PATH.SIGNUP} element={<SignUpPage />} />
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default MainRoute;
