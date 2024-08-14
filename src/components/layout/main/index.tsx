import Header from 'components/header';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import * as S from './styles';

const MainLayout = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    if (!pathname.startsWith('/movies')) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
  return (
    <S.Container>
      <Header />
      <S.Main>
        <Outlet />
      </S.Main>
    </S.Container>
  );
};

export default MainLayout;
