import MainNav from 'components/main-nav';
import { useInitAuth } from 'hooks/useInitAuth';
import { ReactNode } from 'react';
import { Container, Main } from './styled';

const Layout = ({ children }: { children: ReactNode }) => {
  const { isLoading, error } = useInitAuth();
  return (
    <Container>
      {isLoading && <p>Loading...</p>}
      {!isLoading && !error && (
        <>
          <MainNav />
          <Main>{children}</Main>
        </>
      )}
    </Container>
  );
};

export default Layout;
