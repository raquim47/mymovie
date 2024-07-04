import MainNav from 'components/main-nav';
import { ReactNode } from 'react';
import { Container, Main } from './styled';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Container>
      <MainNav />
      <Main>{children}</Main>
    </Container>
  );
};

export default Layout;
