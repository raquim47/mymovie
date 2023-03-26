import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Nav, PrivateRoute, Header } from './components/components';
import {
  Home,
  Auth,
  NotFound,
  Rate,
  Search,
  Profile,
  Favorite,
} from './routes/routes';
import { RootState } from './store';
import { useInitialize } from './services/fbaseFunc';

const Wrapper = styled.div`
  padding: 100px 0px 0px 240px;
`;

function App() {
  const { initFirebase, isLoggedIn } = useSelector(
    (state: RootState) => state.init
  );
  useInitialize(isLoggedIn);
  return (
    <>
      {/* <Header /> */}
      <Nav />
      {initFirebase ? (
        <Wrapper>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/home/:listType/:movieId" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/search/:listType/:movieId" element={<Search />} />
            <Route path="/rate" element={<PrivateRoute><Rate /></PrivateRoute>}/>
            <Route path="/favorite" element={<PrivateRoute><Favorite /></PrivateRoute>}/>
            <Route path="/favorite/favorite/:movieId" element={<PrivateRoute><Favorite /></PrivateRoute>}/>
            <Route path="/auth" element={<PrivateRoute><Auth /></PrivateRoute>}/>
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>}/>
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Wrapper>
      ) : (
        <p>loading...</p>
      )}
    </>
  );
}

export default App;
