import Header from 'components/header';
import { ReactNode } from 'react';
import ST from './styles';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <ST.Container>
      <Header />
      <ST.Main>{children}</ST.Main>
    </ST.Container>
  );
};

export default Layout;
