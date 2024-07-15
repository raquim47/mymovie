import Header from 'components/header';
import { useInitAuth } from 'hooks/auth';
import { useAppSelector } from 'hooks/useAppSelector';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import { setModalBackdrop } from 'store/modal-backdrop';
import ModalBackdrop from './ModalBackdrop';
import { Container, Main } from './styled';

const Layout = () => {
  const { isLoading, error } = useInitAuth();
  const location = useLocation();
  const dispatch = useDispatch();
  const backdropPath = useAppSelector((state) => state.modalBackdrop.backdropPath);

  useEffect(() => {
    if (location.pathname.startsWith('/movies/')) {
      if (location.state?.from) {
        dispatch(setModalBackdrop(location.state.from));
      } else {
        // URL을 통해 직접 접근한 경우
        dispatch(setModalBackdrop('/'));
      }
    } else {
      // 그 외의 경우, backdropPath를 null로 설정
      dispatch(setModalBackdrop(null));
    }
  }, [location, dispatch]);

  return (
    <Container>
      {isLoading && <p>Loading...</p>}
      {!isLoading && !error && (
        <>
          <Header />
          <Main>
            <Outlet />
            <ModalBackdrop path={backdropPath} />
          </Main>
        </>
      )}
    </Container>
  );
};

export default Layout;
