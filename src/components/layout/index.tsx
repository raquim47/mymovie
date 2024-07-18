import Header from 'components/header';
import { useInitUser } from 'hooks/user';
import { ReactNode } from 'react';
import ST from './styles';

const Layout = ({ children }: { children: ReactNode }) => {
  const { isLoading, error } = useInitUser();

  return (
    <ST.Container>
      {isLoading && <p>Loading...</p>}
      {!isLoading && !error && (
        <>
          <Header />
          <ST.Main>{children}</ST.Main>
        </>
      )}
    </ST.Container>
  );
};

export default Layout;
