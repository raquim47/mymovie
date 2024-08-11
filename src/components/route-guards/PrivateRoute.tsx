import { Navigate, Outlet } from 'react-router-dom';
import { ERRORS } from 'utils/errors';
import useToast from 'hooks/ui/useToast';
import PATH from 'utils/path';
import useGetUser from 'hooks/users/useGetUser';
import { useEffect } from 'react';
import Loader from 'components/ui/Loader';

const PrivateRoute = () => {
  const { user, isLoading } = useGetUser();
  const { addToast } = useToast();

  useEffect(() => {
    if (!isLoading && !user) {
      addToast(ERRORS.REQUIRED_LOGIN);
    }
  }, [isLoading, user]);

  if (isLoading) return <Loader />;

  return user ? <Outlet /> : <Navigate to={PATH.LOGIN} />;
};

export default PrivateRoute;
