import { Navigate, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Components/Header';
import Nav from './Components/Nav';
import Favorite from './Routes/Favorite';
import Home from './Routes/Home';
import NotFound from './Routes/NotFound';
import Rate from './Routes/Rate';
import Search from './Routes/SearchCopy';

function App() {
  return (
    <>
      <Nav />
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Navigate to="/home"/>} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/:slideName/:movieId" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
