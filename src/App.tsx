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
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { clearUser, IUser, setUser } from './store';
import { useDispatch } from 'react-redux';

const Wrapper = styled.div`
  padding: 100px 0px 0px 240px;
`

function App() {
  const [init, setInit] = useState(false);
  const db = getFirestore();
  const dispatch = useDispatch();

  useEffect(() => {
    authService.onAuthStateChanged(async (user) => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);
        const userData = userDoc.data() as IUser;
        dispatch(setUser(userData));
      } else {
        dispatch(clearUser());
      }
      setInit(true);
    });
  }, [authService, db, dispatch]);

  return (
    <>
      {/* <Header /> */}
      <Nav />
      {init ? (
        <Wrapper>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/home/:listType/:movieId" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/search/:listType/:movieId" element={<Search />} />
            <Route path="/rate" element={<Rate />} />
            <Route path="/auth" element={<Auth />} />
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
