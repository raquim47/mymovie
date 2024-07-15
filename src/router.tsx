import HomePage from './pages/home';
import NotFound from './pages/not-found';
import { Route, Routes } from 'react-router-dom';
import LoginPage from 'pages/login';
import SignUpPage from 'pages/sign-up';
import MovieDetail from 'components/movie-detail';
import Layout from 'components/layout';
import RatedPage from 'pages/rated';
import ProfilePage from 'pages/profile';

const MainRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="rated" element={<RatedPage />} />
        <Route path="movies/:movieId" element={<MovieDetail />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default MainRoute;
