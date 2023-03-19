import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Nav from './Components/Nav';
import Home from './Routes/Home';
import NotFound from './Routes/NotFound';
import Rate from './Routes/Rate';
import Search from './Routes/Search';

function App() {
  return (
    <>
      <Nav />
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Navigate to="/home"/>} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/:listType/:movieId" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search/:listType/:movieId" element={<Search />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
