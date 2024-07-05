import MainNav from 'components/main-nav';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { ReactNode, useEffect } from 'react';
import { initAuthAction } from 'store/auth-slice/thunk';
import { Container, Main } from './styled';

const Layout = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(initAuthAction());
  }, [dispatch]);

  const authState = useAppSelector((state) => state.auth.status);
  return (
    <Container>
      {authState === 'loading' && <p>Loading...</p>}
      {authState === 'succeeded' && (
        <>
          <MainNav />
          <Main>{children}</Main>
        </>
      )}
    </Container>
  );
};

export default Layout;
