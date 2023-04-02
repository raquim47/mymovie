import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  Home,
  Auth,
  NotFound,
  Rate,
  Search,
  Profile,
  Favorite,
} from './routes/routes';
import { RootState, setWidth } from './store';
import { useInitialize } from './services/fbaseFunc';
import PrivateRoute from './components/etc/PrivateRoute';
import { useEffect } from 'react';
import Header from './components/header/Header';
import Loader from './components/etc/Loader';

const Wrapper = styled.div`
  padding: 50px 30px 0px 270px;
  @media only screen and (max-width: 960px) {
    padding: 25px 20px 0px;
  }
`;
const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  margin-top: 60px;
`;
function App() {
  const dispatch = useDispatch();
  const { initFirebase, isLoggedIn } = useSelector(
    (state: RootState) => state.init
  );
  // 초기화, userData 업데이트
  useInitialize(isLoggedIn);
  // windowWidth
  useEffect(() => {
    const handleResize = () => {
      dispatch(setWidth(window.innerWidth));
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <>
      <Header />
      {initFirebase ? (
        <Wrapper>
          <Routes>
            <Route path='/' element={<Navigate to='/home' />} />
            <Route path='/home' element={<Home />} />
            <Route path='/home/:listType/:movieId' element={<Home />} />
            <Route path='/search' element={<Search />} />
            <Route path='/search/:listType/:movieId' element={<Search />} />
            <Route
              path='/rate'
              element={
                <PrivateRoute>
                  <Rate />
                </PrivateRoute>
              }
            />
            <Route
              path='/rate/:listType/:movieId'
              element={
                <PrivateRoute>
                  <Rate />
                </PrivateRoute>
              }
            />
            <Route
              path='/favorite'
              element={
                <PrivateRoute>
                  <Favorite />
                </PrivateRoute>
              }
            />
            <Route
              path='/favorite/:listType/:movieId'
              element={
                <PrivateRoute>
                  <Favorite />
                </PrivateRoute>
              }
            />
            <Route
              path='/auth'
              element={
                <PrivateRoute>
                  <Auth />
                </PrivateRoute>
              }
            />
            <Route
              path='/profile'
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route path='/*' element={<NotFound />} />
          </Routes>
        </Wrapper>
      ) : (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      )}
    </>
  );
}

export default App;
