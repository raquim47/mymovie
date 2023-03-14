import { Navigate, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Components/Header';
import Nav from './Components/Nav';
import Favorite from './Routes/Favorite';
import Movie from './Routes/Movie';
import NotFound from './Routes/NotFound';
import Rate from './Routes/Rate';
import Search from './Routes/Search';

function App() {
  return (
    <>
      <Nav />
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Movie />} />
        <Route path="/:slideName/:movieId" element={<Movie />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
