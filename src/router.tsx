import HomePage from './pages/home';
import NotFound from './pages/not-found';
import { Navigate, Route, Routes } from 'react-router-dom';

const MainRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/home/:listType/:movieId" element={<HomePage />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default MainRoute;
