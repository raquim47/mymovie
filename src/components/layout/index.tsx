import Header from 'components/header';
import useSetModalBackdrop from 'hooks/ui/modal-backdrop';
import { useAppSelector } from 'hooks/useAppSelector';
import { useInitUser } from 'hooks/user';
import { Outlet } from 'react-router-dom';
import ModalBackdrop from './ModalBackdrop';
import ST from './styles';

const Layout = () => {
  const { isLoading, error } = useInitUser();
  const backdropPath = useAppSelector((state) => state.modalBackdrop.backdropPath);
  useSetModalBackdrop();

  return (
    <ST.Container>
      {isLoading && <p>Loading...</p>}
      {!isLoading && !error && (
        <>
          <Header />
          <ST.Main>
            <Outlet />
            <ModalBackdrop path={backdropPath} />
          </ST.Main>
        </>
      )}
    </ST.Container>
  );
};

export default Layout;
