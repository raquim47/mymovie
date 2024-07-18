import Header from 'components/header';
import Loader from 'components/ui/Loader';
import { useInitUser } from 'hooks/user';
import { ReactNode } from 'react';
import ST from './styles';

const Layout = ({ children }: { children: ReactNode }) => {
  const { isLoading, error } = useInitUser();

  return (
    <ST.Container>
      {isLoading && <Loader />}
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
