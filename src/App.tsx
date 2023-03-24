import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Header from './components/Header';
import Nav from './components/nav/Nav';
import Home from './routes/Home';
import Auth from './routes/Auth';
import NotFound from './routes/NotFound';
import Rate from './routes/Rate';
import Search from './routes/Search';
import { RootState, } from './store';
import { useInitialize } from './utils/utils';
import Profile from './routes/Profile';
import PrivateRoute from './components/PrivateRoute';


const Wrapper = styled.div`
  padding: 100px 0px 0px 240px;
`

function App() {
  useInitialize();
  const {initFirebase} = useSelector((state:RootState) => state.init);
  
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
            <Route path="/rate" element={<PrivateRoute><Rate /></PrivateRoute>} />
            <Route path="/auth" element={<PrivateRoute><Auth /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
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
