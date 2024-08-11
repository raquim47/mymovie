import { Navigate, Outlet } from 'react-router-dom';
import useToast from 'hooks/ui/useToast';
import useGetUser from 'hooks/users/useGetUser';
import { ERRORS } from 'utils/errors';
import { useEffect } from 'react';
import PATH from 'utils/path';
import Loader from 'components/ui/Loader';

const GuestRoute = () => {
  const { user, isLoading } = useGetUser();
  const { addToast } = useToast();

  useEffect(() => {
    if (!isLoading && user) {
      addToast(ERRORS.ALREADY_LOGGED_IN);
    }
  }, [isLoading, user]);

  if (isLoading) return <Loader />;

  return user ? <Navigate to={PATH.HOME} /> : <Outlet />;
};

export default GuestRoute;
