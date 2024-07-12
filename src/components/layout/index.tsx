import Header from 'components/header';
import { useInitAuth } from 'hooks/auth';
import { ReactNode } from 'react';
import { Container, Main } from './styled';

const Layout = ({ children }: { children: ReactNode }) => {
  const { isLoading, error } = useInitAuth();
  return (
    <Container>
      {isLoading && <p>Loading...</p>}
      {!isLoading && !error && (
        <>
          <Header />
          <Main>{children}</Main>
        </>
      )}
    </Container>
  );
};

export default Layout;
