import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import Nav from './components/nav/Nav';
import Home from './routes/Home';
import Auth from './routes/Auth';
import NotFound from './routes/NotFound';
import Rate from './routes/Rate';
import Search from './routes/Search';
import { authService } from './services/fbase';

const Wrapper = styled.div`
  padding: 100px 0px 0px 240px;
`

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!authService.currentUser);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {/* <Header /> */}
      <Nav isLoggedIn={isLoggedIn}/>
      {init ? (
        <Wrapper>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/home/:listType/:movieId" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/search/:listType/:movieId" element={<Search />} />
            <Route path="/rate" element={<Rate isLoggedIn={isLoggedIn} />} />
            <Route path="/auth" element={<Auth isLoggedIn={isLoggedIn} />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Wrapper>
      ) : (
        <p>loading...oading...oading...oading...oading...oading...oading...oading...oading...oading...oading...oading...oading...oading...oading...oading...oading...oading...oading...oading...</p>
      )}
    </>
  );
}

export default App;
