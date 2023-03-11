import { Navigate, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Components/Header';
import Nav from './Components/Nav';
import Favorite from './Routes/Favorite';
import Movie from './Routes/Movie';
import NotFound from './Routes/NotFound';
import Rate from './Routes/Rate';
import Search from './Routes/Search';
import Tv from './Routes/Tv';

function App() {
  return (
    <>
      <Nav />
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Navigate to="/movie" />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/movie/:slideName/:detailId" element={<Movie />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/tv/:videoId" element={<Tv />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
