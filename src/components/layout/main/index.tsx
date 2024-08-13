import Header from 'components/header';
import { ReactNode } from 'react';
import * as S from './styles';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <S.Container>
      <Header />
      <S.Main>{children}</S.Main>
    </S.Container>
  );
};

export default Layout;
