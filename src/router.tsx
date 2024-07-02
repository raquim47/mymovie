import HomePage from './pages/home';
import NotFound from './pages/not-found';
import { Navigate, Route, Routes } from 'react-router-dom';

const MainRoute = () => {
  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/home/:listType/:movieId" element={<HomePage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </main>
  );
};

export default MainRoute;
