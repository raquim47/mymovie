import Header from 'components/header';
import { Outlet } from 'react-router-dom';
import * as S from './styles';

const MainLayout = () => {
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
