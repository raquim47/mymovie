import { Navigate, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Nav from './Components/Nav';
import Detail from './Routes/Detail';
import Favorite from './Routes/Favorite';
import Movie from './Routes/Movie';
import NotFound from './Routes/NotFound';
import Rate from './Routes/Rate';
import Search from './Routes/Search';
import Tv from './Routes/Tv';

const Wrapper = styled.div`
  padding-top: 80px;
  padding-left: 240px;
`

function App() {
  return (
    <Wrapper>
      <Nav />
      <Routes>
        <Route path="/" element={<Navigate to="/movie" />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/movie/:videoId" element={<Movie />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/tv/:videoId" element={<Tv />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Wrapper>
  );
}

export default App;
