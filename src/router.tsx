import HomePage from './pages/home';
import NotFound from './pages/not-found';
import { Route, Routes } from 'react-router-dom';
import LoginPage from 'pages/login';

const MainRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:listType/:movieId" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default MainRoute;
