import { useDispatch, useSelector } from 'react-redux';
import { RootState, setWidth } from './store';
import { useInitialize } from './services/fbaseFunc';
import { useEffect } from 'react';
import MainRoute from './routes';
import Header from './components/header/Header';
import Loader from './components/etc/Loader';

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
      <MainRoute />
    </>
  );
}

export default App;
