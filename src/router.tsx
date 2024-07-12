import HomePage from './pages/home';
import NotFound from './pages/not-found';
import { Route, Routes } from 'react-router-dom';
import LoginPage from 'pages/login';
import SignUpPage from 'pages/sign-up';
import MovieDetail from 'components/movie-detail';

const MainRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}>
        <Route path="movies/:movieId" element={<MovieDetail />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default MainRoute;
